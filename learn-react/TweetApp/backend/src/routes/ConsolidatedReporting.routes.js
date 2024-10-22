const express = require("express");
const router = express.Router();

const interviewMgmtV2Service = require("./InterviewMgmt.v2.service");

// Get all questions
router.get("/", async (req, res) => {
    const { moduleName } = req.query;
    try {
        let responseData=[];
        if('questions'===moduleName){
            const questions = await interviewMgmtV2Service.getAllQuestionsForReportingModule();
            responseData=questions || [];
        }
        
        res.status(201).json(responseData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;