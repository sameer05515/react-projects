const express = require("express");
const router = express.Router();

const interviewMgmtV2Service = require("./InterviewMgmt.v2.service");

// Get all questions
router.get("/questions", async (req, res) => {
    try {
        const questions = await interviewMgmtV2Service.getAllQuestionsForReportingModule();
        res.status(201).json(questions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;