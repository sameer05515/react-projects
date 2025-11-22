// Topic.routes.js

const express = require('express');
const {
  createTopic,
  createTopicsBulk,
  updateTopicByUniqueId,
  publishTopicByUniqueId,
  getAllTopics,
  getPublishedTopics,
  getAllTopicsFlat,
  getAllTopicsForExport,
  getAllTopicsFlatForExport,
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
 * /topics/bulk:
 *   post:
 *     summary: Create multiple topics in one request
 *     tags: [Topic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topics:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name: { type: string }
 *                     parentId: { type: string }
 *                     description: { type: string }
 *                     tags: { type: array, items: { type: string } }
 *                     occurenceDate: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Created topics and any per-item errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created: { type: array }
 *                 errors: { type: array, items: { type: object } }
 *       400:
 *         description: Bad request
 */
router.post('/bulk', async (req, res) => {
  try {
    const { topics } = req.body || {};
    const result = await createTopicsBulk(topics);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
 * /topics/{uniqueId}/publish:
 *   put:
 *     summary: Publish a topic (only if parent and all ancestors are published)
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The uniqueId of the topic to publish.
 *     responses:
 *       200:
 *         description: The published topic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Cannot publish - parent or an ancestor is not published
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Topic not found
 */
router.put('/:uniqueId/publish', async (req, res) => {
  try {
    const topic = await publishTopicByUniqueId(req.params.uniqueId);
    res.json(topic);
  } catch (error) {
    if (error.message.includes("Topic not found")) {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes("Cannot publish") || error.message.includes("ancestor")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
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
 * /topics/export:
 *   get:
 *     summary: Export all topics as JSON
 *     tags: [Topic]
 *     responses:
 *       200:
 *         description: Topics export (JSON)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to get topics
 */
router.get('/export', async (req, res) => {
  try {
    const topics = await getAllTopicsForExport();
    res.setHeader('Content-Disposition', 'attachment; filename="topics-export.json"');
    res.setHeader('Content-Type', 'application/json');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /topics/export/flat:
 *   get:
 *     summary: Export all topics as a flat list (JSON)
 *     tags: [Topic]
 *     responses:
 *       200:
 *         description: Topics export as flat array
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uniqueId: { type: string }
 *                   name: { type: string }
 *                   parentId: { type: string }
 *                   tags: { type: array }
 *                   ancestors: { type: array }
 *       500:
 *         description: Failed to get topics
 */
router.get('/export/flat', async (req, res) => {
  try {
    const topics = await getAllTopicsFlatForExport();
    res.setHeader('Content-Disposition', 'attachment; filename="topics-export-flat.json"');
    res.setHeader('Content-Type', 'application/json');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /topics/published:
 *   get:
 *     summary: Get all published topics (tree)
 *     tags: [Topic]
 *     responses:
 *       200:
 *         description: Tree of published topics only
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to get topics
 */
router.get('/published', async (req, res) => {
  try {
    const topics = await getPublishedTopics();
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
