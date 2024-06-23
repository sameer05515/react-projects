// Tweet.routes.js
const express = require("express");
const router = express.Router();
const {
  getAllTweets,
  createTweet,
  updateTweetById,
  addCommentToTweet,
  updateCommentInTweet,
  addNestedCommentToTweet,
  updateNestedCommentInTweet,
} = require("./Tweet.service");

// Get all tweets
router.get("/", async (req, res) => {
  try {
    const tweets = await getAllTweets();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tweets" });
  }
});

// Create a new tweet
router.post("/", async (req, res) => {
  try {
    const newTweet = await createTweet(req.body);
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ error: "Error creating tweet" });
  }
});

// Update a tweet by ID
router.put("/:id", async (req, res) => {
  const tweetId = req.params.id;
  try {
    const updatedTweet = await updateTweetById(tweetId, req.body);
    res.json(updatedTweet);
  } catch (error) {
    res.status(400).json({ error: "Error updating tweet" });
  }
});

// Add a comment to a tweet
router.post("/:tweetId/comments", async (req, res) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = await addCommentToTweet(tweetId, req.body);
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error creating comment" });
  }
});

// Update a comment in a tweet
router.put("/:tweetId/comments/:commentId", async (req, res) => {
  const { tweetId, commentId } = req.params;
  try {
    const tweet = await updateCommentInTweet(tweetId, commentId, req.body);
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error updating comment" });
  }
});

// Add a nested comment to a tweet
router.post("/:tweetId/comments/:commentId/nested", async (req, res) => {
  const { tweetId, commentId } = req.params;
  try {
    const tweet = await addNestedCommentToTweet(tweetId, commentId, req.body);
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error adding nested comment" });
  }
});

// Update a nested comment in a tweet
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
