const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemByUniqueId,
  updateItemByUniqueId,
  deleteItemById
} = require('./ComparableObject.service');

/**
 * @swagger
 * tags:
 *   name: ComparableObject
 *   description: Endpoints for managing Comparable Objects
 */

/**
 * @swagger
 * /c-objects:
 *   post:
 *     summary: Create a new ComparableObject
 *     tags: [ComparableObject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created ComparableObject
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res) => {
  try {
    const createdItem = await createItem(req.body);
    res.status(201).json(createdItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /c-objects:
 *   get:
 *     summary: Get all ComparableObjects
 *     tags: [ComparableObject]
 *     responses:
 *       200:
 *         description: Array of ComparableObjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties: true
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req, res) => {
  try {
    const allItems = await getAllItems();
    res.status(200).json(allItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /c-objects/{uniqueId}:
 *   get:
 *     summary: Get ComparableObject by uniqueId
 *     tags: [ComparableObject]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: The uniqueId of the ComparableObject
 *     responses:
 *       200:
 *         description: ComparableObject found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /c-objects/{uniqueId}:
 *   put:
 *     summary: Update ComparableObject by uniqueId
 *     tags: [ComparableObject]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: The uniqueId of the ComparableObject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Updated ComparableObject
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /c-objects/{id}:
 *   delete:
 *     summary: Delete ComparableObject by MongoDB _id
 *     tags: [ComparableObject]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The MongoDB _id of the ComparableObject
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal Server Error
 */
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
