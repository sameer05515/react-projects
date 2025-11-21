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

/**
 * @swagger
 * /cgpt/f:
 *   get:
 *     summary: Get all cgpt-files (without conversation or message info)
 *     tags:
 *       - ChatGPTConversation
 *     responses:
 *       200:
 *         description: Array of cgpt file categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: {}
 *       500:
 *         description: Server error
 */
router.get("/f", async (req, res) => {
    handleRequest(res, chatGPTConversation.getAllCategories);
});

/**
 * @swagger
 * /cgpt/f/{uniqueId}:
 *   get:
 *     summary: Get a cgpt-file for a given uniqueId
 *     tags:
 *       - ChatGPTConversation
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: The uniqueId of the cgpt-file category
 *     responses:
 *       200:
 *         description: The cgpt-file object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/f/:uniqueId", async (req, res) => {
    const { uniqueId } = req.params;
    handleRequest(res, chatGPTConversation.getCategoryForUniqueId, uniqueId);
});

/**
 * @swagger
 * /cgpt/f/{uniqueId}/c/{convUID}:
 *   get:
 *     summary: Get a cgpt-file for a given uniqueId and conversation UID
 *     tags:
 *       - ChatGPTConversation
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: The uniqueId of the cgpt-file category
 *       - in: path
 *         name: convUID
 *         schema:
 *           type: string
 *         required: true
 *         description: The conversation UID
 *     responses:
 *       200:
 *         description: The cgpt-file object for uniqueId and conversation UID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/f/:uniqueId/c/:convUID", async (req, res) => {
    const { uniqueId, convUID } = req.params;
    handleRequest(res, chatGPTConversation.getCGPTFileForUIDAndConvUID, uniqueId, convUID);
});

/**
 * @swagger
 * /cgpt/f/{uniqueId}/c/{convUID}/m/{msgUID}:
 *   get:
 *     summary: Get a cgpt-file for a given uniqueId, conversation UID, and message UID
 *     tags:
 *       - ChatGPTConversation
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: The uniqueId of the cgpt-file category
 *       - in: path
 *         name: convUID
 *         schema:
 *           type: string
 *         required: true
 *         description: The conversation UID
 *       - in: path
 *         name: msgUID
 *         schema:
 *           type: string
 *         required: true
 *         description: The message UID
 *     responses:
 *       200:
 *         description: The cgpt-file object for uniqueId, conversation UID, and message UID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/f/:uniqueId/c/:convUID/m/:msgUID", async (req, res) => {
    const { uniqueId, convUID, msgUID } = req.params;
    handleRequest(res, chatGPTConversation.getCGPTFileForUIDAndConvUIDAndMsgUID, uniqueId, convUID, msgUID);
});

/**
 * @swagger
 * /cgpt/c/{convUID}:
 *   get:
 *     summary: Get a conversation for a given conversation UID
 *     tags:
 *       - ChatGPTConversation
 *     parameters:
 *       - in: path
 *         name: convUID
 *         schema:
 *           type: string
 *         required: true
 *         description: The conversation UID
 *     responses:
 *       200:
 *         description: The conversation object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/c/:convUID", async (req, res) => {
    const { convUID } = req.params;
    handleRequest(res, chatGPTConversation.getConversationsForConvUID, convUID);
});

/**
 * @swagger
 * /cgpt/m/{msgUID}:
 *   get:
 *     summary: Get a message for a given message UID
 *     tags:
 *       - ChatGPTConversation
 *     parameters:
 *       - in: path
 *         name: msgUID
 *         schema:
 *           type: string
 *         required: true
 *         description: The message UID
 *     responses:
 *       200:
 *         description: The message object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/m/:msgUID", async (req, res) => {
    const { msgUID } = req.params;
    handleRequest(res, chatGPTConversation.getMessagesForMsgUID, msgUID);
});

module.exports = router;
