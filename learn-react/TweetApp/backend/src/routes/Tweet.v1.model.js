const mongoose = require("mongoose");

const nestedCommentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  nestedComments: [nestedCommentSchema],
});

const tweetSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
