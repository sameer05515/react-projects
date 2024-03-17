const express = require('express');
const router = express.Router();
const YourModel = require('../models/ComparableObjectModel'); // Adjust the path based on your project structure

// Create
router.post('/', async (req, res) => {
  try {
    const createdItem = await YourModel.create(req.body);
    res.status(201).json(createdItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const allItems = await YourModel.find();
    res.status(200).json(allItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read one
router.get('/:uniqueId', async (req, res) => {
  try {
    const item = await YourModel.findOne({uniqueId: req.params.uniqueId});
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
    const updatedItem = await YourModel.findOneAndUpdate({uniqueId: req.params.uniqueId}, req.body, { new: true });
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
    const deletedItem = await YourModel.findByIdAndDelete(req.params.id);
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
