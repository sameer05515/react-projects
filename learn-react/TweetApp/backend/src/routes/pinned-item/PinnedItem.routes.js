// PinnedItem.routes.js

const express = require('express');
const {
  upsertPinnedItem,
  getAllPinnedItemsByType,
  getAllPinnedItems,
  getAllPinnedItemsFlat,
} = require('./PinnedItem.service');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: PinnedItem
 *     description: API for PinnedItem operations
 */

/**
 * @swagger
 * /pinned-items:
 *   post:
 *     summary: Create or update a pinned item
 *     tags: [PinnedItem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The created or updated pinned item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
  try {
    const pinnedItem = await upsertPinnedItem(req.body);
    res.status(201).json(pinnedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /pinned-items:
 *   get:
 *     summary: Get all pinned items
 *     tags: [PinnedItem]
 *     responses:
 *       200:
 *         description: List of all pinned items
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
    const pinnedItems = await getAllPinnedItems(req.params.itemType);
    if (!pinnedItems) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(pinnedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /pinned-items/export/flat:
 *   get:
 *     summary: Export all pinned items as a flat list (JSON)
 *     tags: [PinnedItem]
 *     responses:
 *       200:
 *         description: Pinned items export as flat array
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to get pinned items
 */
router.get('/export/flat', async (req, res) => {
  try {
    const pinnedItems = await getAllPinnedItemsFlat();
    res.setHeader('Content-Disposition', 'attachment; filename="pinned-items-export-flat.json"');
    res.setHeader('Content-Type', 'application/json');
    res.json(pinnedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /pinned-items/{itemType}:
 *   get:
 *     summary: Get all pinned items by type
 *     tags: [PinnedItem]
 *     parameters:
 *       - in: path
 *         name: itemType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of the pinned item to retrieve.
 *     responses:
 *       200:
 *         description: List of pinned items by type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Server error
 */
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