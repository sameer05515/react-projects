// PinnedItem.routes.js
const express = require('express');
const {
    upsertPinnedItem,
    getAllPinnedItemsByType,
    getAllPinnedItems,
  } = require('./PinnedItem.service');
  const router = express.Router();

  // Create a new topic
router.post('/', async (req, res) => {
    try {
      const pinnedItem = await upsertPinnedItem(req.body);
      res.status(201).json(pinnedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

    // Get a specific topic by uniqueId
router.get('/', async (req, res) => {
  try {
    const pinnedItems = await getAllPinnedItems(req.params.itemType);
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(pinnedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  // Get a specific topic by uniqueId
router.get('/:itemType', async (req, res) => {
    try {
      const pinnedItems = await getAllPinnedItemsByType(req.params.itemType);
      if (!pinnedItems) {
        return res.status(404).json({ message: 'Topic not found' });
      }
      res.json(pinnedItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;