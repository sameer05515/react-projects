const express = require('express');
const router = express.Router();
const {
  createLink,
  getLinks,
  getLinkByUniqueId,
  getLinkChildren,
  getAllAncestors,
  updateLinkByUniqueId,
  deleteLinkByUniqueId
} = require('./Link.service');
const { linkResponseDTO } = require('./Link.dtos'); // Adjust the path to your DTO as needed

router.post('', async (req, res) => {
  try {
    const link = await createLink(req.body);
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('', async (req, res) => {
  try {
    const selectFields = {
      uniqueId: 1,
      name: 1,
      parentId: 1
    };
    const links = await getLinks(null, selectFields);
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:uniqueId', async (req, res) => {
  try {
    const link = await getLinkByUniqueId(req.params.uniqueId);
    const children = await getLinkChildren(req.params.uniqueId);
    let ancestors = [];
    try {
      ancestors = await getAllAncestors(link.parentId);
    } catch (error) {
      console.error(error);
      ancestors = [];
    }
    const responseDTO = linkResponseDTO({
      ...link.toObject(),
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

router.put('/:uniqueId', async (req, res) => {
  try {
    const link = await updateLinkByUniqueId(req.params.uniqueId, req.body);
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:uniqueId', async (req, res) => {
  try {
    const link = await deleteLinkByUniqueId(req.params.uniqueId);
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
