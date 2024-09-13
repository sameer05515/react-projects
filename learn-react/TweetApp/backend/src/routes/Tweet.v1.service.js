// Tweet.service.js

const Tweet = require("./Tweet.v1.model");

const getAllTweets = async () => {
  return await Tweet.find();
};

const getTweetById=async (tweetId)=>{
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new Error("Tweet not found");
  }
  return tweet;
}

const createTweet = async (tweetData) => {
  return await Tweet.create(tweetData);
};

const updateTweetById = async (id, tweetData) => {
  return await Tweet.findByIdAndUpdate(id, tweetData, { new: true });
};

const addCommentToTweet = async (tweetId, commentData) => {
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new Error("Tweet not found");
  }
  tweet.comments.push(commentData);
  return await tweet.save();
};

const updateCommentInTweet = async (tweetId, commentId, updatedCommentData) => {
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new Error("Tweet not found");
  }
  const comment = tweet.comments.id(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  comment.set(updatedCommentData);
  return await tweet.save();
};

const addNestedCommentToTweet = async (tweetId, commentId, nestedCommentData) => {
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new Error("Tweet not found");
  }
  const comment = tweet.comments.id(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  comment.nestedComments.push(nestedCommentData);
  return await tweet.save();
};

const updateNestedCommentInTweet = async (tweetId, commentId, nestedCommentId, updatedNestedCommentData) => {
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new Error("Tweet not found");
  }
  const comment = tweet.comments.id(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }
  const nestedComment = comment.nestedComments.id(nestedCommentId);
  if (!nestedComment) {
    throw new Error("Nested comment not found");
  }
  nestedComment.set(updatedNestedCommentData);
  return await tweet.save();
};

module.exports = {
  getAllTweets,
  getTweetById,
  createTweet,
  updateTweetById,
  addCommentToTweet,
  updateCommentInTweet,
  addNestedCommentToTweet,
  updateNestedCommentInTweet,
};
