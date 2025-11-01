// MyResume.service.js

const MyResumeModel = require('./MyResume.model');

const getResumeByUniqueId = async (uniqueId) => {
  return await MyResumeModel.findOne({ uniqueName: uniqueId });
};

module.exports = {
  getResumeByUniqueId,
};
