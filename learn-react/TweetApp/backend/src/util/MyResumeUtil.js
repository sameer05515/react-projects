// MyResumeUtil.js

const MyResumeModel = require('../models/MyResumeModel');

const upsertMyResumeData = async (resumeData) => {
  try {
    const { uniqueName } = resumeData;

    const result = await MyResumeModel.updateOne({ uniqueName }, resumeData, { upsert: true });

    if (result.ok) {
      // Find and return the upserted data
      const upsertedData = await MyResumeModel.findOne({ uniqueName });
      return upsertedData;
    } else {
      // Provide more details about the update operation
      console.error('Upsert failed. MongoDB result:', result);
      throw new Error('Upsert failed');
    }
  } catch (error) {
    console.error('Error during upsert:', error);
    throw error;
  }
};

module.exports = {
  upsertMyResumeData,
};
