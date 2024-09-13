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

const { SuccessCongratulations } = require('./common/server-responses/customResponseTypes');
const routerResponseHandler = require('./common/middlewares/routerResponseHandler');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

// Get all tweets
router.get("/", async (req, res, next) => {
  try {
    const tweets = await getAllTweets();
    next(new SuccessCongratulations(tweets,"Tweets fetched successfully", StatusCodes.OK));
  } catch (error) {
    next(error); // Pass error to centralized error handler
  }
});

// Get tweet by id
router.get("/:id", async (req, res, next) => {
  const tweetId = req.params.id;
  try {
    const tweet = await getTweetById(tweetId);
    next(new SuccessCongratulations(tweet,`Tweet with id: ${tweetId} fetched successfully`, StatusCodes.OK));
  } catch (error) {
    next(error);
  }
});

// Create a new tweet
router.post("/", async (req, res, next) => {
  try {
    const newTweet = await createTweet(req.body);
    next(new SuccessCongratulations(newTweet,"Tweet created successfully", StatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
});

// Update a tweet by ID
router.put("/:id", async (req, res, next) => {
  const tweetId = req.params.id;
  try {
    const updatedTweet = await updateTweetById(tweetId, req.body);
    next(new SuccessCongratulations(updatedTweet,"Tweet updated successfully", StatusCodes.OK));
  } catch (error) {
    next(error);
  }
});

// Add a comment to a tweet
router.post("/:tweetId/comments", async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = await addCommentToTweet(tweetId, req.body);
    next(new SuccessCongratulations(tweet,"Comment added to tweet", StatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
});

// Update a comment in a tweet
router.put("/:tweetId/comments/:commentId", async (req, res, next) => {
  const { tweetId, commentId } = req.params;
  try {
    const tweet = await updateCommentInTweet(tweetId, commentId, req.body);
    next(new SuccessCongratulations(tweet,"Comment updated successfully", StatusCodes.OK));
  } catch (error) {
    next(error);
  }
});

// Add a nested comment to a tweet
router.post("/:tweetId/comments/:commentId/nested", async (req, res, next) => {
  const { tweetId, commentId } = req.params;
  try {
    const tweet = await addNestedCommentToTweet(tweetId, commentId, req.body);
    next(new SuccessCongratulations(tweet,"Nested comment added successfully", StatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
});

// Update a nested comment in a tweet
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
