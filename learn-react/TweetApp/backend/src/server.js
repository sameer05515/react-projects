const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const REACT_PORT = process.env.REACT_PORT || 3002;

mongoose.connect("mongodb://127.0.0.1:27017/mongodb_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tweetSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
      nestedComments: [
        {
          text: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

const Tweet = mongoose.model("Tweet", tweetSchema);

// app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${REACT_PORT}`,
  })
);

// Middleware
app.use(bodyParser.json());

app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tweets" });
  }
});

app.post("/tweets", async (req, res) => {
  try {
    const newTweet = new Tweet(req.body);
    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ error: "Error creating tweet" });
  }
});

app.put("/tweets/:id", async (req, res) => {
  try {
    const tweetId = req.params.id;
    const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, req.body, {
      new: true,
    });
    res.json(updatedTweet);
  } catch (error) {
    res.status(400).json({ error: "Error updating tweet" });
  }
});

app.post("/tweets/:tweetId/comments", async (req, res) => {
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

app.put("/tweets/:tweetId/comments/:commentId", async (req, res) => {
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

app.post("/tweets/:tweetId/comments/:commentId/nested", async (req, res) => {
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

app.put(
  "/tweets/:tweetId/comments/:commentId/nested/:nestedCommentId",
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

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
