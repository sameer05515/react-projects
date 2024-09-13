const express = require("express");
const router = express.Router();

const consolidatedReportingService = require("./ConsolidatedReporting.service");

// Get all questions
router.get("/", async (req, res) => {
    const { moduleName } = req.query;
    try {
        let responseData=[];
        if('questions'===moduleName){
            const questions = await consolidatedReportingService.getAllQuestionsForReportingModule();
            responseData=questions || [];
        }else if('topics'===moduleName){
            const questions = await consolidatedReportingService.getAllTopicsForReportingModule();
            responseData=questions || [];
        }else if('tasks'===moduleName){
            const questions = await consolidatedReportingService.getAllTasksForReportingModule();
            responseData=questions || [];
        }
        
        res.status(201).json(responseData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;