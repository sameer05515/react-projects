// Tag.service.js

const Tag = require('./Tag.model');

const createTag = async (tagData) => {
  return await Tag.create(tagData);
};

const getAllTags = async () => {
  return await Tag.find();
};

const getTagById = async (tagId) => {
  return await Tag.findOne({ tagId });
};

const updateTagById = async (tagId, tagData) => {
  return await Tag.findOneAndUpdate({ tagId }, tagData, { new: true });
};

const deleteTagById = async (tagId) => {
  return await Tag.findOneAndRemove({ tagId });
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
};
