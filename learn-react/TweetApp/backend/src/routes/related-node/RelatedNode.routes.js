const express = require('express');
const router = express.Router();
const {
    saveRelatedNode,
    updateRelatedNode,
    fetchAllRelatedNodes,
    fetchRelatedNodeByUniqueId,
    updateRelationInConnectedNodes
} = require('./RelatedNode.service');

/**
 * @swagger
 * tags:
 *   - name: RelatedNode
 *     description: API for RelatedNode operations
 */

/**
 * @swagger
 * /related-nodes:
 *   post:
 *     summary: Create a new RelatedNode
 *     tags: [RelatedNode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The created RelatedNode.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request.
 */
router.post('/', async (req, res) => {
    try {
        const relatedNode = await saveRelatedNode(req.body);
        res.status(201).json(relatedNode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /related-nodes/upsert-relation:
 *   put:
 *     summary: Update relation in connected nodes
 *     description: Update an existing Node's relation and the other related node associated by withId
 *     tags: [RelatedNode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: RelatedNode relation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid input or update failed
 */
router.put('/upsert-relation', async (req, res) => {
    try {
        console.log('[RelatedNode.routes.js]: relationData: ', JSON.stringify(req.body));
        const relatedNode = await updateRelationInConnectedNodes(req.body);
        res.status(200).json(relatedNode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /related-nodes/{uniqueId}:
 *   put:
 *     summary: Update a RelatedNode by uniqueId
 *     tags: [RelatedNode]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the RelatedNode
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: RelatedNode updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.put('/:uniqueId', async (req, res) => {
    try {
        const relatedNode = await updateRelatedNode(req.params.uniqueId, req.body);
        res.status(200).json(relatedNode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /related-nodes:
 *   get:
 *     summary: Get all RelatedNodes
 *     tags: [RelatedNode]
 *     responses:
 *       200:
 *         description: List of all RelatedNodes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const relatedNodes = await fetchAllRelatedNodes();
        res.status(200).json(relatedNodes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /related-nodes/{uniqueId}:
 *   get:
 *     summary: Get a RelatedNode by uniqueId
 *     tags: [RelatedNode]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the RelatedNode
 *     responses:
 *       200:
 *         description: RelatedNode found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: RelatedNode not found
 */
router.get('/:uniqueId', async (req, res) => {
    try {
        const relatedNode = await fetchRelatedNodeByUniqueId(req.params.uniqueId);
        res.status(200).json(relatedNode);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
