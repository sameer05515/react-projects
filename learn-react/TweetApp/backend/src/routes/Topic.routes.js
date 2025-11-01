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

/**
 * @swagger
 * tags:
 *   - name: Topic
 *     description: API for Topic operations
 */

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The created topic.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', async (req, res) => {
  try {
    const topic = await createTopic(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /topics/{uniqueId}:
 *   put:
 *     summary: Update a topic by uniqueId
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The uniqueId of the topic to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: The updated topic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Topic not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */
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

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topic]
 *     responses:
 *       200:
 *         description: A list of topics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to get topics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/', async (req, res) => {
  try {
    // console.log(`[Topic.routes]: [/topics]: req.body : Going to fetch all topics`);
    const topics = await getAllTopics();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /topics/{uniqueId}:
 *   get:
 *     summary: Get a specific topic by uniqueId
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The uniqueId of the topic to get.
 *     responses:
 *       200:
 *         description: The requested topic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Topic not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to get topic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /topics/search:
 *   post:
 *     summary: Search topics by searchString
 *     tags: [Topic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchString:
 *                 type: string
 *               searchOptions:
 *                 type: object
 *                 additionalProperties: true
 *     responses:
 *       200:
 *         description: Found topics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /topics/section:
 *   post:
 *     summary: Create a new topic section
 *     tags: [Topic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The created topic section.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/section', async (req, res) => {
  try {
    // console.log(`[Topic.routes]: [/section]: req.body : ${JSON.stringify(req.body)}`);
    const topic = await createTopicSection(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /topics/{uniqueId}/sections:
 *   get:
 *     summary: Get all sections for a topic by uniqueId
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The uniqueId of the topic to fetch sections for.
 *     responses:
 *       200:
 *         description: Sections for the topic
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:uniqueId/sections', async (req, res) => {
  try {
    // console.log(`[Topic.routes]: [/section]: req.body : ${JSON.stringify(req.body)}`);
    const topic = await getAllTopicSectionsById(req.params.uniqueId);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /topics/{uniqueId}/sections/{sectionUniqueId}:
 *   get:
 *     summary: Get a specific section for a topic
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: sectionUniqueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Requested section for the topic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:uniqueId/sections/:sectionUniqueId', async (req, res) => {
  try {
    // console.log(`[Topic.routes]: [/section]: req.body : ${JSON.stringify(req.body)}`);
    const topic = await getTopicSectionsById(req.params.uniqueId, req.params.sectionUniqueId);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /topics/{uniqueId}/sections/{sectionUniqueId}:
 *   put:
 *     summary: Update a section for a topic
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: sectionUniqueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: The updated topic section
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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
