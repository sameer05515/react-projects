const Tweet = require("./Tweet.v2.model");
const {
  ValidationError,
  DatabaseError,
  NotFoundError,
} = require('./common/server-responses/customResponseTypes');

// Utility function to fetch a tweet by ID and throw an error if not found
const findTweetById = async (tweetId) => {
  if (!tweetId) throw new ValidationError("Tweet ID is required.");
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) throw new NotFoundError(`Tweet not found for ID: ${tweetId}`);
  return tweet;
};

// Utility function to fetch a comment by ID from a tweet
const findCommentById = (tweet, commentId) => {
  const comment = tweet.comments.id(commentId);
  if (!comment) throw new NotFoundError(`Comment not found for ID: ${commentId}`);
  return comment;
};

// Utility function to fetch a nested comment by ID from a comment
const findNestedCommentById = (comment, nestedCommentId) => {
  const nestedComment = comment.nestedComments.id(nestedCommentId);
  if (!nestedComment) throw new NotFoundError(`Nested Comment not found for ID: ${nestedCommentId}`);
  return nestedComment;
};

// Get all tweets
const getAllTweets = async () => {
  return await Tweet.find();
};

// Get tweet by ID
const getTweetById = async (tweetId) => {
  return await findTweetById(tweetId);
};

// Create a new tweet
const createTweet = async (tweetData) => {
  if (!tweetData.content || !tweetData.author) {
    throw new ValidationError("Tweet content and author are required.");
  }
  return await Tweet.create(tweetData);
};

// Update tweet by ID
const updateTweetById = async (id, tweetData) => {
  const tweet = await findTweetById(id);
  if (!tweetData.content && !tweetData.author) {
    throw new ValidationError("At least one field (content or author) must be provided for update.");
  }
  return await Tweet.findByIdAndUpdate(id, tweetData, { new: true });
};

// Add a comment to a tweet
const addCommentToTweet = async (tweetId, commentData) => {
  if (!commentData.text) throw new ValidationError("Comment text is required.");

  const tweet = await findTweetById(tweetId);
  tweet.comments.push(commentData);
  return await tweet.save();
};

// Update a comment in a tweet
const updateCommentInTweet = async (tweetId, commentId, updatedCommentData) => {
  if (!updatedCommentData.text) throw new ValidationError("Updated comment text is required.");

  const tweet = await findTweetById(tweetId);
  const comment = findCommentById(tweet, commentId);

  comment.set(updatedCommentData);
  return await tweet.save();
};

// Add a nested comment to a comment within a tweet
const addNestedCommentToTweet = async (tweetId, commentId, nestedCommentData) => {
  if (!nestedCommentData.text) throw new ValidationError("Nested comment text is required.");

  const tweet = await findTweetById(tweetId);
  const comment = findCommentById(tweet, commentId);

  comment.nestedComments.push(nestedCommentData);
  return await tweet.save();
};

// Update a nested comment in a tweet
const updateNestedCommentInTweet = async (tweetId, commentId, nestedCommentId, updatedNestedCommentData) => {
  if (!updatedNestedCommentData.text) throw new ValidationError("Updated nested comment text is required.");

  const tweet = await findTweetById(tweetId);
  const comment = findCommentById(tweet, commentId);
  const nestedComment = findNestedCommentById(comment, nestedCommentId);

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
