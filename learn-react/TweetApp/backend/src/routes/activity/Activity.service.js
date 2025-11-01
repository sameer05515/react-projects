// service.js
const Activity = require('./Activity.model');

const createActivity = async (data) => {
  const activity = new Activity(data);
  return await activity.save();
};

const getAllActivities = async () => {
  return await Activity.find();
};

const getActivityById = async (id) => {
  return await Activity.findById(id);
};

const updateActivityById = async (id, data) => {
  return await Activity.findByIdAndUpdate(id, data, { new: true });
};

const deleteActivityById = async (id) => {
  return await Activity.findByIdAndRemove(id);
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivityById,
  deleteActivityById,
};
