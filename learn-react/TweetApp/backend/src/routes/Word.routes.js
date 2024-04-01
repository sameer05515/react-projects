// Word.routes.js

const express = require('express');
const router = express.Router();
const { getPaginatedWords } = require('./Word.service');

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
