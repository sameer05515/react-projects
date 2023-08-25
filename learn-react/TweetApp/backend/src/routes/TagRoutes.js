const express = require('express');
const router = express.Router();
const Tag = require('../models/TagModel'); // Import your Tag model

/**
 * @swagger
 * :
 *   post:
 *     summary: Create a new tag
 *     tags:
 *       - Tags
 *     requestBody:
 *       description: Tag data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: New tag created
 *       400:
 *         description: Error in request body
 */

router.post('', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * :
 *   get:
 *     summary: Get all tags
 *     tags:
 *       - Tags
 *     responses:
 *       200:
 *         description: List of tags
 *       500:
 *         description: Server error
 */

router.get('', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /{tagId}:
 *   get:
 *     summary: Get a specific tag by ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         description: ID of the tag to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag found
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */

router.get('/:tagId', async (req, res) => {
  try {
    const tag = await Tag.findOne({ tagId: req.params.tagId });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /{tagId}:
 *   put:
 *     summary: Update a tag by ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         description: ID of the tag to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated tag data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: Tag updated
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */

router.put('/:tagId', async (req, res) => {
  try {
    const tag = await Tag.findOneAndUpdate({ tagId: req.params.tagId }, req.body, { new: true });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /{tagId}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         description: ID of the tag to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */

router.delete('/:tagId', async (req, res) => {
  try {
    const tag = await Tag.findOneAndRemove({ tagId: req.params.tagId });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
