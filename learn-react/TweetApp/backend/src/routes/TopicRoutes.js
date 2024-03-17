const express = require('express');
const Topic = require('../models/TopicModel'); // Import your Topic model
const router = express.Router();

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a topic by topicId
router.put('/:topicId', async (req, res) => {
  try {
    const updatedTopic = await Topic.findOneAndUpdate({ topicId: req.params.topicId }, {...req.body, updatedDate:new Date()}, { new: true });
    if (!updatedTopic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(updatedTopic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific topic by topicId
router.get('/:topicId', async (req, res) => {
  try {
    const topic = await Topic.findOne({ topicId: req.params.topicId });
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
