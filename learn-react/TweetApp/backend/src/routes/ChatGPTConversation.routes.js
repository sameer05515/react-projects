const express = require("express");
const router = express.Router();

const chatGPTConversation = require("./ChatGPTConversation.service");

// Helper function to handle requests
const handleRequest = async (res, serviceFn, ...params) => {
    try {
        const result = await serviceFn(...params);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all cgpt-files, without conversation or message info
router.get("/f", async (req, res) => {
    handleRequest(res, chatGPTConversation.getAllCategories);
});

// Get a cgpt-file for a given uniqueId
router.get("/f/:uniqueId", async (req, res) => {
    const { uniqueId } = req.params;
    handleRequest(res, chatGPTConversation.getCategoryForUniqueId, uniqueId);
});

// Get a cgpt-file for a given uniqueId and convUID
router.get("/f/:uniqueId/c/:convUID", async (req, res) => {
    const { uniqueId, convUID } = req.params;
    handleRequest(res, chatGPTConversation.getCGPTFileForUIDAndConvUID, uniqueId, convUID);
});

// Get a cgpt-file for a given uniqueId, convUID, and msgUID
router.get("/f/:uniqueId/c/:convUID/m/:msgUID", async (req, res) => {
    const { uniqueId, convUID, msgUID } = req.params;
    handleRequest(res, chatGPTConversation.getCGPTFileForUIDAndConvUIDAndMsgUID, uniqueId, convUID, msgUID);
});

// Get a conversation for a given convUID
router.get("/c/:convUID", async (req, res) => {
    const { convUID } = req.params;
    handleRequest(res, chatGPTConversation.getConversationsForConvUID, convUID);
});

// Get a message for a given msgUID
router.get("/m/:msgUID", async (req, res) => {
    const { msgUID } = req.params;
    handleRequest(res, chatGPTConversation.getMessagesForMsgUID, msgUID);
});

module.exports = router;
