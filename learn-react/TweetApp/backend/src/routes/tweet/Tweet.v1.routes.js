// Tweet.routes.js
const express = require("express");
const router = express.Router();
const {
  getAllTweets,
  getTweetById,
  createTweet,
  updateTweetById,
  addCommentToTweet,
  updateCommentInTweet,
  addNestedCommentToTweet,
  updateNestedCommentInTweet,
} = require("./Tweet.v1.service");

/**
 * @swagger
 * tags:
 *   - name: Tweet
 *     description: API for Tweet operations
 */

/**
 * @swagger
 * /tweets:
 *   get:
 *     summary: Get all tweets
 *     tags: [Tweet]
 *     responses:
 *       200:
 *         description: A list of tweets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error fetching tweets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/", async (req, res) => {
  try {
    const tweets = await getAllTweets();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tweets" });
  }
});

/**
 * @swagger
 * /tweets/{id}:
 *   get:
 *     summary: Get a tweet by ID
 *     tags: [Tweet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tweet ID
 *     responses:
 *       200:
 *         description: The requested tweet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error fetching tweet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/:id", async (req, res) => {
  const tweetId = req.params.id;
  try {
    const tweet = await getTweetById(tweetId);
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ error: `Error fetching tweet for id: ${tweetId}` });
  }
});

/**
 * @swagger
 * /tweets:
 *   post:
 *     summary: Create a new tweet
 *     tags: [Tweet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The created tweet.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error creating tweet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", async (req, res) => {
  try {
    const newTweet = await createTweet(req.body);
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ error: "Error creating tweet" });
  }
});

/**
 * @swagger
 * /tweets/{id}:
 *   put:
 *     summary: Update a tweet by ID
 *     tags: [Tweet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tweet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: The updated tweet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error updating tweet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/:id", async (req, res) => {
  const tweetId = req.params.id;
  try {
    const updatedTweet = await updateTweetById(tweetId, req.body);
    res.json(updatedTweet);
  } catch (error) {
    res.status(400).json({ error: "Error updating tweet" });
  }
});

/**
 * @swagger
 * /tweets/{tweetId}/comments:
 *   post:
 *     summary: Add a comment to a tweet
 *     tags: [Tweet]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         schema:
 *           type: string
 *         required: true
 *         description: The tweet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The tweet with the new comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error creating comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/:tweetId/comments", async (req, res) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = await addCommentToTweet(tweetId, req.body);
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error creating comment" });
  }
});

/**
 * @swagger
 * /tweets/{tweetId}/comments/{commentId}:
 *   put:
 *     summary: Update a comment in a tweet
 *     tags: [Tweet]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         schema:
 *           type: string
 *         required: true
 *         description: The tweet ID
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: The tweet with the updated comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error updating comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/:tweetId/comments/:commentId", async (req, res) => {
  const { tweetId, commentId } = req.params;
  try {
    const tweet = await updateCommentInTweet(tweetId, commentId, req.body);
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error updating comment" });
  }
});

/**
 * @swagger
 * /tweets/{tweetId}/comments/{commentId}/nested:
 *   post:
 *     summary: Add a nested comment to a tweet
 *     tags: [Tweet]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         schema:
 *           type: string
 *         required: true
 *         description: The tweet ID
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: The tweet with the new nested comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error adding nested comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/:tweetId/comments/:commentId/nested", async (req, res) => {
  const { tweetId, commentId } = req.params;
  try {
    const tweet = await addNestedCommentToTweet(tweetId, commentId, req.body);
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error adding nested comment" });
  }
});

/**
 * @swagger
 * /tweets/{tweetId}/comments/{commentId}/nested/{nestedCommentId}:
 *   put:
 *     summary: Update a nested comment in a tweet
 *     tags: [Tweet]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         schema:
 *           type: string
 *         required: true
 *         description: The tweet ID
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *       - in: path
 *         name: nestedCommentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The nested comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: The tweet with the updated nested comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error updating nested comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/:tweetId/comments/:commentId/nested/:nestedCommentId", async (req, res) => {
  const { tweetId, commentId, nestedCommentId } = req.params;
  try {
    const tweet = await updateNestedCommentInTweet(tweetId, commentId, nestedCommentId, req.body);
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error updating nested comment" });
  }
});

module.exports = router;
