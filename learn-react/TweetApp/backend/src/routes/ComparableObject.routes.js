const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemByUniqueId,
  updateItemByUniqueId,
  deleteItemById
} = require('./ComparableObject.service');

// Create
router.post('/', async (req, res) => {
  try {
    const createdItem = await createItem(req.body);
    res.status(201).json(createdItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const allItems = await getAllItems();
    res.status(200).json(allItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read one
router.get('/:uniqueId', async (req, res) => {
  try {
    const item = await getItemByUniqueId(req.params.uniqueId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update
router.put('/:uniqueId', async (req, res) => {
  try {
    const updatedItem = await updateItemByUniqueId(req.params.uniqueId, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await deleteItemById(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
