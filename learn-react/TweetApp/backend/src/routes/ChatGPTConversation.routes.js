const express = require("express");
const router = express.Router();

const chatGPTConversation = require("./ChatGPTConversation.service");


// Get all cgpt-files, without conversation or message info
router.get("/f", async (req, res) => {
    try {
        const categories = await chatGPTConversation.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a cgpt-file for given uniqueId
router.get("/f/:uniqueId", async (req, res) => {
    const uniqueId= req.params.uniqueId;
    try {
        const category = await chatGPTConversation.getCategoryForUniqueId(uniqueId);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a cgpt-file for given uniqueId and convUID
router.get("/f/:uniqueId/c/:convUID", async (req, res) => {
    const {uniqueId, convUID}= req.params;
    try {
        const category = await chatGPTConversation.getCGPTFileForUIDAndConvUID(uniqueId, convUID);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a cgpt-file for given uniqueId , convUID and msgUID
router.get("/f/:uniqueId/c/:convUID/m/:msgUID", async (req, res) => {
    const {uniqueId, convUID, msgUID}= req.params;
    try {
        const category = await chatGPTConversation.getCGPTFileForUIDAndConvUIDAndMsgUID(uniqueId, convUID, msgUID);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;