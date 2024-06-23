const express = require('express');
const router = express.Router();
const Link = require('./Link.model'); // Import your Link model
const { linkResponseDTO } = require('./Link.dtos');


router.post('', async (req, res) => {
  try {
    const link = await Link.create(req.body);
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('', async (req, res) => {
  try {
    // Find links with falsy parentId values
    let selectFields = {
      uniqueId: 1,
      name: 1,
      parentId: 1
    };
    const links = await getLinks(null, selectFields);
    // console.log(links);
    res.json(links);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getLinks(parentId, selectFields) {
  try {
    // Criteria to find links
    const criteria = parentId ? { parentId } : { parentId: { $in: [null, undefined, ''] } };

    // Find links based on criteria
    let links = await Link.find(criteria).select(selectFields);

    // Fetch children for each link recursively
    const linksWithChildren = await Promise.all(links.map(async link => {
      const children = await getLinks(link.uniqueId, selectFields);
      return { ...link.toObject(), children };
    }));

    // Return the original links with their children added
    return linksWithChildren;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
}



router.get('/:uniqueId', async (req, res) => {
  try {
    const link = await Link.findOne({ uniqueId: req.params.uniqueId });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    const children = await Link.find({ parentId: req.params.uniqueId });

    let ancestors = [];
    try {
      ancestors = await getAllAncestors(link.parentId);
      // res.json(ancestors);
    } catch (error) {
      // res.status(500).json({ error: error.message });
      console.log(error)
      ancestors = [];
    }

    // Create a response object using the DTO
    const responseDTO = linkResponseDTO({
      ...link.toObject(), // Convert Mongoose document to plain JavaScript object
      children: children.map(child => ({
        name: child.name,
        uniqueId: child.uniqueId
      })),
      ancestors: [...ancestors]
    });

    res.json(responseDTO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recursive function to get all ancestors of a link
async function getAllAncestors(parentId, ancestors = []) {
  // console.log(`start: parentId: ${parentId} :   function getAllAncestors : ${JSON.stringify(ancestors)}`);
  if(!parentId) {
    return ancestors;
  }
  const link = await Link.findOne({ uniqueId: parentId });
  // console.log(`link: ${JSON.stringify(link)}`);
  // if (!link || !link.parentId) {
  //   return ancestors;
  // }
  ancestors.unshift(link.name); // Add the name of the current link to ancestors array
  // console.log(`final: function getAllAncestors : ${JSON.stringify(ancestors)}`);
  return getAllAncestors(link.parentId, ancestors); // Recursively call to get ancestors of the parent link
}


router.put('/:uniqueId', async (req, res) => {
  try {
    const link = await Link.findOneAndUpdate({ uniqueId: req.params.uniqueId }, req.body, { new: true });
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:uniqueId', async (req, res) => {
  try {
    const link = await Link.findOneAndRemove({ uniqueId: req.params.uniqueId });
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
