const express = require("express");
const router = express.Router();

const chatGPTConversation = require("./ChatGPTConversation.service");


// Get all categories
router.get("/files", async (req, res) => {
    try {
        const categories = await chatGPTConversation.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;