const express = require("express");
const router = express.Router();

const consolidatedReportingService = require("./ConsolidatedReporting.service");

/**
 * @swagger
 * /consolidated-reporting:
 *   get:
 *     summary: Retrieve consolidated reporting data based on the requested module
 *     tags:
 *       - ConsolidatedReporting
 *     description: >
 *       Returns an array of items depending on the moduleName query parameter.<br>
 *       <b>moduleName</b> can be 'questions', 'topics', or 'tasks'.
 *     parameters:
 *       - in: query
 *         name: moduleName
 *         schema:
 *           type: string
 *           enum: [questions, topics, tasks]
 *         required: true
 *         description: Module to get the consolidated report for.
 *     responses:
 *       200:
 *         description: Array of consolidated reporting items for the requested module.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties: true
 *       400:
 *         description: Bad request or error retrieving data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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
        
        res.status(200).json(responseData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;