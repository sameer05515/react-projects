/**
 * @swagger
 * /tweets:
 *   get:
 *     summary: Get a list of tweets
 *     responses:
 *       200:
 *         description: A list of tweets
 *   post:
 *     summary: Create a new tweet
 *     responses:
 *       201:
 *         description: Tweet created
 */

/**
 * @swagger
 * /tweets/{id}:
 *   put:
 *     summary: Update a tweet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the tweet to update
 *     responses:
 *       200:
 *         description: Tweet updated
 *   delete:
 *     summary: Delete a tweet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the tweet to delete
 *     responses:
 *       204:
 *         description: Tweet deleted
 */

/**
 * @swagger
 * /tweets/{tweetId}/comments:
 *   post:
 *     summary: Create a new comment for a tweet
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         description: The ID of the tweet to comment on
 *     responses:
 *       201:
 *         description: Comment created
 */

/**
 * @swagger
 * /tweets/{tweetId}/comments/{commentId}:
 *   put:
 *     summary: Update a comment for a tweet by ID
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         description: The ID of the tweet
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to update
 *     responses:
 *       200:
 *         description: Comment updated
 */

/**
 * @swagger
 * /tweets/{tweetId}/comments/{commentId}/nested:
 *   post:
 *     summary: Create a new nested comment for a tweet's comment
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         description: The ID of the tweet
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to add a nested comment
 *     responses:
 *       201:
 *         description: Nested comment created
 */

/**
 * @swagger
 * /tweets/{tweetId}/comments/{commentId}/nested/{nestedCommentId}:
 *   put:
 *     summary: Update a nested comment for a tweet's comment by ID
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         description: The ID of the tweet
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment
 *       - in: path
 *         name: nestedCommentId
 *         required: true
 *         description: The ID of the nested comment to update
 *     responses:
 *       200:
 *         description: Nested comment updated
 */


const express = require("express");
const router = express.Router();

const Tweet = require("../models/TweetModel");

router.get("/", (req, res) => {
  Tweet.find()
    .then((tweets) => {
      res.json(tweets);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching tweets" });
    });
});

router.post("/", async (req, res) => {
  try {
    const newTweet = new Tweet(req.body);
    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ error: "Error creating tweet" });
  }
});


router.put("/:id", (req, res) => {
    const tweetId = req.params.id;
    Tweet.findByIdAndUpdate(tweetId, req.body, { new: true })
      .then(updatedTweet => {
        res.json(updatedTweet);
      })
      .catch(error => {
        res.status(400).json({ error: "Error updating tweet" });
      });
  });

router.post("/:tweetId/comments", async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    tweet.comments.push(req.body);
    await tweet.save();
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error creating comment" });
  }
});

router.put("/:tweetId/comments/:commentId", async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const commentId = req.params.commentId;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    const comment = tweet.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.set(req.body);
    await tweet.save();
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error updating comment" });
  }
});

router.post("/:tweetId/comments/:commentId/nested", async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const commentId = req.params.commentId;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    const comment = tweet.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const newNestedComment = {
      text: req.body.text,
      createdAt: new Date(),
    };

    comment.nestedComments.push(newNestedComment);
    await tweet.save();

    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Error adding nested comment" });
  }
});

router.put(
  "/:tweetId/comments/:commentId/nested/:nestedCommentId",
  async (req, res) => {
    try {
      const tweetId = req.params.tweetId;
      const commentId = req.params.commentId;
      const nestedCommentId = req.params.nestedCommentId;

      const tweet = await Tweet.findById(tweetId);

      if (!tweet) {
        return res.status(404).json({ error: "Tweet not found" });
      }

      const comment = tweet.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      const nestedComment = comment.nestedComments.id(nestedCommentId);

      if (!nestedComment) {
        return res.status(404).json({ error: "Nested comment not found" });
      }

      nestedComment.text = req.body.text; // Update the nested comment text
      await tweet.save();

      res.json(tweet);
    } catch (error) {
      res.status(400).json({ error: "Error updating nested comment" });
    }
  }
);

module.exports = router;
