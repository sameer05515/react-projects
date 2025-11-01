// Tag.routes.js

const express = require('express');
const router = express.Router();
const {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
  getTagsCountByDate,
} = require('./Tag.service');

/**
 * @swagger
 * tags:
 *   - name: Tag
 *     description: API for Tag operations
 */

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The created tag.
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
router.post('', async (req, res) => {
  try {
    const tag = await createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: List of all tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties: true
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
router.get('', async (req, res) => {
  try {
    const tags = await getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /tags/aggregation-results:
 *   get:
 *     summary: Get aggregation results for tags
 *     tags: [Tag]
 *     parameters:
 *       - in: query
 *         name: queryType
 *         schema:
 *           type: string
 *         required: true
 *         description: The aggregation type. Supported: getTagsCountByDate
 *     responses:
 *       200:
 *         description: Aggregation results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Invalid queryType
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
router.get('/aggregation-results', async (req, res)=>{
  try{

    const queryType = req.query.queryType;
    
    if(queryType && queryType==='getTagsCountByDate'){
      const result= await getTagsCountByDate();
      res.json(result);
    }else{
      return res.status(404).json({ message: `Invalid queryType: '${queryType}'` });
    }
    
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
})

/**
 * @swagger
 * /tags/{uniqueId}:
 *   get:
 *     summary: Get a tag by uniqueId
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the tag.
 *     responses:
 *       200:
 *         description: Tag found and returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: Tag not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
router.get('/:uniqueId', async (req, res) => {
  try {
    const tag = await getTagById(req.params.uniqueId);
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
 * /tags/{uniqueId}:
 *   put:
 *     summary: Update a tag by uniqueId
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the tag to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Tag updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: Tag not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
router.put('/:uniqueId', async (req, res) => {
  try {
    const tag = await updateTagById(req.params.uniqueId, req.body);
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
 * /tags/{uniqueId}:
 *   delete:
 *     summary: Delete a tag by uniqueId
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the tag to delete.
 *     responses:
 *       200:
 *         description: Tag deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Tag not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
router.delete('/:uniqueId', async (req, res) => {
  try {
    const tag = await deleteTagById(req.params.uniqueId);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
