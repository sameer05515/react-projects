// Tag.routes.js

const express = require('express');
const router = express.Router();
const {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
  getTagsCountByDate,
} = require('./Tag.service');

// Create a new tag
router.post('', async (req, res) => {
  try {
    const tag = await createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tags
router.get('', async (req, res) => {
  try {
    const tags = await getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/aggregation-results', async (req, res)=>{
  try{

    const queryType = req.query.queryType;
    
    if(queryType && queryType==='getTagsCountByDate'){
      const result= await getTagsCountByDate();
      res.json(result);
    }else{
      return res.status(404).json({ message: `Invalid queryType: '${queryType}'` });
    }
    
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Get a tag by ID
router.get('/:uniqueId', async (req, res) => {
  try {
    const tag = await getTagById(req.params.uniqueId);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a tag by ID
router.put('/:uniqueId', async (req, res) => {
  try {
    const tag = await updateTagById(req.params.uniqueId, req.body);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a tag by ID
router.delete('/:uniqueId', async (req, res) => {
  try {
    const tag = await deleteTagById(req.params.uniqueId);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
