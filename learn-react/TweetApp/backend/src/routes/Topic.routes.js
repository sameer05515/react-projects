// Topic.routes.js

const express = require('express');
const {
  createTopic,
  updateTopicByUniqueId,
  getAllTopics,
  getTopicByUniqueId,
  searchTopics,
  createTopicSection,
  getAllTopicSectionsById,
  getTopicSectionsById,
  updateTopicSectionsById,
} = require('./Topic.service');
const router = express.Router();

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const topic = await createTopic(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a topic by uniqueId
router.put('/:uniqueId', async (req, res) => {
  try {
    // console.log(`req.body : ${JSON.stringify(req.body)}`)
    const updatedTopic = await updateTopicByUniqueId(req.params.uniqueId, req.body);

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
    // console.log(`[Topic.routes]: [/topics]: req.body : Going to fetch all topics`);
    const topics = await getAllTopics();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific topic by uniqueId
router.get('/:uniqueId', async (req, res) => {
  try {
    const topic = await getTopicByUniqueId(req.params.uniqueId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search topics by searchString
router.post('/search', async (req, res) => {
  const { searchString, searchOptions } = req.body;

  if (!searchString) {
    return res.status(400).json({ error: 'searchString is required' });
  }

  try {
    const topics = await searchTopics(searchString, searchOptions);
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for topics' });
  }
});

// Create a new topic
router.post('/section', async (req, res) => {
  try {
    // console.log(`[Topic.routes]: [/section]: req.body : ${JSON.stringify(req.body)}`);
    const topic = await createTopicSection(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new topic
router.get('/:uniqueId/sections', async (req, res) => {
  try {
    // console.log(`[Topic.routes]: [/section]: req.body : ${JSON.stringify(req.body)}`);
    const topic = await getAllTopicSectionsById(req.params.uniqueId);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new topic
router.get('/:uniqueId/sections/:sectionUniqueId', async (req, res) => {
  try {
    // console.log(`[Topic.routes]: [/section]: req.body : ${JSON.stringify(req.body)}`);
    const topic = await getTopicSectionsById(req.params.uniqueId, req.params.sectionUniqueId);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:uniqueId/sections/:sectionUniqueId', async (req, res) => {
  try {
    // console.log(`[Topic.routes]: [/section]: req.body : ${JSON.stringify(req.body)}`);
    const topic = await updateTopicSectionsById(req.params.uniqueId, req.params.sectionUniqueId, req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
