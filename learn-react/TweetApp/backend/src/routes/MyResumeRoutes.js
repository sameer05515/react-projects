const express = require('express');
const router = express.Router();
const MyResumeModel = require('../models/MyResumeModel');

// Endpoint to get MyResumeModel data by uniqueId
router.get('/:uniqueId', async (req, res) => {
    try {
      const uniqueId = req.params.uniqueId;
  
      // Find the MyResumeModel data by uniqueId
      const resumeData = await MyResumeModel.findOne({ uniqueName: uniqueId });
  
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