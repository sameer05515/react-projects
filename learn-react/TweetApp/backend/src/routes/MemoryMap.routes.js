const express = require('express');
const router = express.Router();
const {
    saveMemoryMap,
    updateMemoryMap,
    updateMemoryMapForGivenSkeleton,
    fetchAllMemoryMaps,
    fetchMemoryMapByUniqueId
} = require('./MemoryMap.service');

/**
 * @swagger
 * tags:
 *   - name: MemoryMap
 *     description: API for MemoryMap operations
 */

/**
 * @swagger
 * /memory-maps:
 *   post:
 *     summary: Create a new MemoryMap
 *     tags: [MemoryMap]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The created MemoryMap.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
    try {
        const memoryMap = await saveMemoryMap(req.body);
        res.status(201).json(memoryMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /memory-maps/{uniqueId}:
 *   put:
 *     summary: Update an existing MemoryMap by uniqueId
 *     tags: [MemoryMap]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the MemoryMap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Updated MemoryMap
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.put('/:uniqueId', async (req, res) => {
    try {
        const memoryMap = await updateMemoryMap(req.params.uniqueId, req.body);
        res.status(200).json(memoryMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /memory-maps/{uniqueId}/append-skeleton:
 *   put:
 *     summary: Append a skeleton to an existing MemoryMap by uniqueId
 *     tags: [MemoryMap]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the MemoryMap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Updated MemoryMap with appended skeleton
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.put('/:uniqueId/append-skeleton', async (req, res) => {
    try {
        const memoryMap = await updateMemoryMapForGivenSkeleton(req.params.uniqueId, req.body);
        res.status(200).json(memoryMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /memory-maps:
 *   get:
 *     summary: Get all MemoryMaps
 *     tags: [MemoryMap]
 *     responses:
 *       200:
 *         description: Array of MemoryMaps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
    try {
        const memoryMaps = await fetchAllMemoryMaps();
        res.status(200).json(memoryMaps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /memory-maps/{uniqueId}:
 *   get:
 *     summary: Get a MemoryMap by uniqueId
 *     tags: [MemoryMap]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the MemoryMap
 *     responses:
 *       200:
 *         description: The MemoryMap with the given uniqueId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: MemoryMap not found
 */
router.get('/:uniqueId', async (req, res) => {
    try {
        const memoryMap = await fetchMemoryMapByUniqueId(req.params.uniqueId);
        res.status(200).json(memoryMap);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
