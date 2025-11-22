const express = require("express");
const router = express.Router();

const interviewMgmtV2Service = require("./InterviewMgmt.v2.service");

/**
 * @swagger
 * tags:
 *   name: InterviewMgmtV2
 *   description: Interview Management V2 endpoints (categories, questions, answers)
 */

/** ===================== Category ===================================== */

/**
 * @swagger
 * /intvw-mgmt/v2/categories:
 *   post:
 *     summary: Create a new interview category
 *     tags: [InterviewMgmtV2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post("/categories", async (req, res) => {
  try {
    const category = await interviewMgmtV2Service.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/categories:
 *   get:
 *     summary: Get all interview categories
 *     tags: [InterviewMgmtV2]
 *     responses:
 *       200:
 *         description: Array of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get("/categories", async (req, res) => {
  try {
    const categories = await interviewMgmtV2Service.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/categories/{uniqueId}:
 *   get:
 *     summary: Get a category by uniqueId
 *     tags: [InterviewMgmtV2]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the category
 *     responses:
 *       200:
 *         description: The category object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/categories/:uniqueId", async (req, res) => {
  try {
    const responseDTO = await interviewMgmtV2Service.getCategoryByUniqueId(
      req.params.uniqueId
    );
    res.json(responseDTO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/categories/{uniqueId}:
 *   put:
 *     summary: Update a category by uniqueId
 *     tags: [InterviewMgmtV2]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: The updated category object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Category not found
 *       400:
 *         description: Invalid update data
 */
router.put("/categories/:uniqueId", async (req, res) => {
  try {
    const updatedCategory =
      await interviewMgmtV2Service.updateCategoryByUniqueId(
        req.params.uniqueId,
        req.body
      );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/** ===================== Question ===================================== */

/**
 * @swagger
 * /intvw-mgmt/v2/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [InterviewMgmtV2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post("/questions", async (req, res) => {
  try {
    const question = await interviewMgmtV2Service.createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/export/questions/flat:
 *   get:
 *     summary: Export all interview questions as a flat list (JSON)
 *     tags: [InterviewMgmtV2]
 *     responses:
 *       200:
 *         description: Interview questions export as flat array
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to get questions
 */
router.get("/export/questions/flat", async (req, res) => {
  try {
    const questions = await interviewMgmtV2Service.getAllQuestionsFlat();
    res.setHeader("Content-Disposition", 'attachment; filename="interview-questions-export-flat.json"');
    res.setHeader("Content-Type", "application/json");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/questions:
 *   get:
 *     summary: Get all questions
 *     tags: [InterviewMgmtV2]
 *     responses:
 *       200:
 *         description: Array of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Error fetching questions
 */
router.get("/questions", async (req, res) => {
  try {
    const questions = await interviewMgmtV2Service.getAllQuestions();
    res.status(201).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/questions/{uniqueId}:
 *   get:
 *     summary: Get a question by uniqueId
 *     tags: [InterviewMgmtV2]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the question
 *     responses:
 *       200:
 *         description: Question object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/questions/:uniqueId", async (req, res) => {
  try {
    const question = await interviewMgmtV2Service.getQuestionByUniqueId(
      req.params.uniqueId
    );
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/categories/{categoryId}/questions/{quesId}:
 *   get:
 *     summary: Get a question by categoryId and quesId
 *     tags: [InterviewMgmtV2]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category
 *       - in: path
 *         name: quesId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the question within the category
 *     responses:
 *       200:
 *         description: Question object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get("/categories/:categoryId/questions/:quesId", async (req, res) => {
  try {
    const question =
      await interviewMgmtV2Service.getQuestionByCategoryIdAndQuesId(
        req.params.categoryId,
        req.params.quesId
      );
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/questions/{uniqueId}:
 *   put:
 *     summary: Update a question by uniqueId
 *     tags: [InterviewMgmtV2]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Updated question object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Question not found
 *       400:
 *         description: Invalid update data
 */
router.put("/questions/:uniqueId", async (req, res) => {
  try {
    const updatedQuestion =
      await interviewMgmtV2Service.updateQuestionByUniqueId(
        req.params.uniqueId,
        req.body
      );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/questions/{uniqueId}:
 *   patch:
 *     summary: Update the "lastRevised" field of a question
 *     tags: [InterviewMgmtV2]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the question
 *     responses:
 *       200:
 *         description: Successfully updated revision date
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: success
 *       501:
 *         description: Not Implemented/Server error
 */
router.patch("/questions/:uniqueId", async (req, res) => {
  try {
    await interviewMgmtV2Service.updateLastRevisedOfQuestionByUniqueId(
      req.params.uniqueId
    );
    res.json('success');
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/questions/search:
 *   post:
 *     summary: Search topics/questions
 *     tags: [InterviewMgmtV2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchString:
 *                 type: string
 *               searchOptions:
 *                 type: object
 *                 description: Additional search options (optional)
 *     responses:
 *       200:
 *         description: Topics found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: searchString is required; bad input
 *       500:
 *         description: Internal server error
 */
router.post("/questions/search", async (req, res) => {
  const { searchString, searchOptions } = req.body;

  if (!searchString) {
    return res.status(400).json({ error: "searchString is required" });
  }

  try {
    const topics = await interviewMgmtV2Service.searchTopics(
      searchString,
      searchOptions
    );
    res.json(topics);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for topics" });
  }
});

/** ===================== Answer ===================================== */

/**
 * @swagger
 * /intvw-mgmt/v2/answers:
 *   post:
 *     summary: Create a new answer
 *     tags: [InterviewMgmtV2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Created answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post("/answers", async (req, res) => {
  try {
    const answer = await interviewMgmtV2Service.createAnswer(req.body);
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ requestedanswer: req.body, error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v2/answers/{uniqueId}:
 *   put:
 *     summary: Update an answer by uniqueId
 *     tags: [InterviewMgmtV2]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the answer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Updated answer object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Answer not found
 *       400:
 *         description: Invalid update data
 */
router.put("/answers/:uniqueId", async (req, res) => {
  try {
    const updatedAnswer = await interviewMgmtV2Service.updateAnswerByUniqueId(
      req.params.uniqueId,
      req.body
    );

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.json(updatedAnswer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
