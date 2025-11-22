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
} = require("./Tweet.v2.service");

const { SuccessCongratulations } = require('../common/server-responses/customResponseTypes');
const routerResponseHandler = require('../common/middlewares/routerResponseHandler');
const { StatusCodes } = require('http-status-codes');

/**
 * @swagger
 * tags:
 *   - name: TweetV2
 *     description: API for Tweet version 2 operations
 */

/**
 * @swagger
 * /tweets-v2:
 *   get:
 *     summary: Get all tweets
 *     tags: [TweetV2]
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
router.get("/", async (req, res, next) => {
  try {
    const tweets = await getAllTweets();
    next(new SuccessCongratulations(tweets,"Tweets fetched successfully", StatusCodes.OK));
  } catch (error) {
    next(error); // Pass error to centralized error handler
  }
});

/**
 * @swagger
 * /tweets-v2/export/flat:
 *   get:
 *     summary: Export all tweets as a flat list (JSON)
 *     tags: [TweetV2]
 *     responses:
 *       200:
 *         description: Tweets export as flat array
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to get tweets
 */
router.get("/export/flat", async (req, res, next) => {
  try {
    const tweets = await getAllTweets();
    res.setHeader("Content-Disposition", 'attachment; filename="tweets-export-flat.json"');
    res.setHeader("Content-Type", "application/json");
    res.json(tweets);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tweets-v2/{id}:
 *   get:
 *     summary: Get a tweet by ID
 *     tags: [TweetV2]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID
 *     responses:
 *       200:
 *         description: The Tweet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Tweet not found
 */
router.get("/:id", async (req, res, next) => {
  const tweetId = req.params.id;
  try {
    const tweet = await getTweetById(tweetId);
    next(new SuccessCongratulations(tweet,`Tweet with id: ${tweetId} fetched successfully`, StatusCodes.OK));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tweets-v2:
 *   post:
 *     summary: Create a new tweet
 *     tags: [TweetV2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Tweet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post("/", async (req, res, next) => {
  try {
    const newTweet = await createTweet(req.body);
    next(new SuccessCongratulations(newTweet,"Tweet created successfully", StatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tweets-v2/{id}:
 *   put:
 *     summary: Update a tweet by ID
 *     tags: [TweetV2]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Tweet updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tweet not found
 */
router.put("/:id", async (req, res, next) => {
  const tweetId = req.params.id;
  try {
    const updatedTweet = await updateTweetById(tweetId, req.body);
    next(new SuccessCongratulations(updatedTweet,"Tweet updated successfully", StatusCodes.OK));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tweets-v2/{tweetId}/comments:
 *   post:
 *     summary: Add a comment to a tweet
 *     tags: [TweetV2]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Comment added to tweet
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tweet not found
 */
router.post("/:tweetId/comments", async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = await addCommentToTweet(tweetId, req.body);
    next(new SuccessCongratulations(tweet,"Comment added to tweet", StatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tweets-v2/{tweetId}/comments/{commentId}:
 *   put:
 *     summary: Update a comment in a tweet
 *     tags: [TweetV2]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tweet or Comment not found
 */
router.put("/:tweetId/comments/:commentId", async (req, res, next) => {
  const { tweetId, commentId } = req.params;
  try {
    const tweet = await updateCommentInTweet(tweetId, commentId, req.body);
    next(new SuccessCongratulations(tweet,"Comment updated successfully", StatusCodes.OK));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tweets-v2/{tweetId}/comments/{commentId}/nested:
 *   post:
 *     summary: Add a nested comment to a tweet
 *     tags: [TweetV2]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Nested comment added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tweet or Comment not found
 */
router.post("/:tweetId/comments/:commentId/nested", async (req, res, next) => {
  const { tweetId, commentId } = req.params;
  try {
    const tweet = await addNestedCommentToTweet(tweetId, commentId, req.body);
    next(new SuccessCongratulations(tweet,"Nested comment added successfully", StatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tweets-v2/{tweetId}/comments/{commentId}/nested/{nestedCommentId}:
 *   put:
 *     summary: Update a nested comment in a tweet
 *     tags: [TweetV2]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *       - in: path
 *         name: nestedCommentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Nested Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Nested comment updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tweet, Comment, or Nested Comment not found
 */
router.put("/:tweetId/comments/:commentId/nested/:nestedCommentId", async (req, res, next) => {
  const { tweetId, commentId, nestedCommentId } = req.params;
  try {
    const tweet = await updateNestedCommentInTweet(tweetId, commentId, nestedCommentId, req.body);
    next(new SuccessCongratulations(tweet,"Nested comment updated successfully", StatusCodes.OK));
  } catch (error) {
    next(error);
  }
});

// Apply centralized error handler to all routes
router.use(routerResponseHandler);

module.exports = router;
