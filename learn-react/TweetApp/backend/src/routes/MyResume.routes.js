// MyResume.routes.js

const express = require('express');
const router = express.Router();
const { getResumeByUniqueId } = require('./MyResume.service');

// Endpoint to get MyResumeModel data by uniqueId
router.get('/:uniqueId', async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const resumeData = await getResumeByUniqueId(uniqueId);

    if (!resumeData) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resumeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
