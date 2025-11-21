// Word.routes.js

const express = require('express');
const router = express.Router();
const { getPaginatedWords } = require('./Word.service');

/**
 * @swagger
 * tags:
 *   - name: Word
 *     description: API for Word operations
 */

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Get paginated list of words
 *     tags: [Word]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number for paginated results
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of words
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     additionalProperties: true
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalCount:
 *                   type: integer
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// Express route for paginated data
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const words = await getPaginatedWords(page, pageSize);
        res.json(words);
    } catch (error) {
        console.error('Error fetching paginated data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
