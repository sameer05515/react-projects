// Tag.routes.js

const express = require('express');
const router = express.Router();
const {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
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

// Get a tag by ID
router.get('/:tagId', async (req, res) => {
  try {
    const tag = await getTagById(req.params.tagId);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a tag by ID
router.put('/:tagId', async (req, res) => {
  try {
    const tag = await updateTagById(req.params.tagId, req.body);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a tag by ID
router.delete('/:tagId', async (req, res) => {
  try {
    const tag = await deleteTagById(req.params.tagId);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
