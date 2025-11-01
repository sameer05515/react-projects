// service.js
const YourModel = require('./ComparableObject.model');

const createItem = async (data) => {
  return await YourModel.create(data);
};

const getAllItems = async () => {
  return await YourModel.find();
};

const getItemByUniqueId = async (uniqueId) => {
  return await YourModel.findOne({ uniqueId });
};

const updateItemByUniqueId = async (uniqueId, data) => {
  return await YourModel.findOneAndUpdate({ uniqueId }, data, { new: true });
};

const deleteItemById = async (id) => {
  return await YourModel.findByIdAndDelete(id);
};

module.exports = {
  createItem,
  getAllItems,
  getItemByUniqueId,
  updateItemByUniqueId,
  deleteItemById,
};
