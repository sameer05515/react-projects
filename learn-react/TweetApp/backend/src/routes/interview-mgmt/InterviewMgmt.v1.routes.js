// InterviewMgmt.routes.js

const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryByUniqueId,
  updateCategoryByUniqueId,
  deleteCategoryByUniqueId,
  getQuestionsByCategoryId,
  saveQuestionForCategoryId,
  updateQuestionForCategoryId,
  getQuestionByCategoryIdAndQuesId,
} = require('./InterviewMgmt.v1.service.js');
const { linkResponseDTO } = require('./InterviewMgmt.v1.dto.js');

/**
 * @swagger
 * tags:
 *   name: InterviewMgmtV1
 *   description: Interview Management V1 endpoints
 */

/**
 * @swagger
 * /intvw-mgmt/v1/categories:
 *   post:
 *     summary: Create a new interview category
 *     tags: [InterviewMgmtV1]
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
router.post('', async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v1/categories:
 *   get:
 *     summary: Get a list of interview categories
 *     tags: [InterviewMgmtV1]
 *     parameters:
 *       - name: pageNo
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - name: pageSize
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page size for pagination
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get('', async (req, res) => {
  try {
    const { pageNo, pageSize } = req.query;
    const categories = await getCategories(pageNo, pageSize);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v1/categories/{uniqueId}:
 *   get:
 *     summary: Get a specific interview category by its unique ID
 *     tags: [InterviewMgmtV1]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the category
 *     responses:
 *       200:
 *         description: Category object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get('/:uniqueId', async (req, res) => {
  try {
    const responseDTO = await getCategoryByUniqueId(req.params.uniqueId);
    res.json(linkResponseDTO(responseDTO));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v1/categories/{uniqueId}:
 *   put:
 *     summary: Update an interview category by unique ID
 *     tags: [InterviewMgmtV1]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Updated category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.put('/:uniqueId', async (req, res) => {
  try {
    const category = await updateCategoryByUniqueId(req.params.uniqueId, req.body);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v1/categories/{uniqueId}:
 *   delete:
 *     summary: Delete an interview category by unique ID
 *     tags: [InterviewMgmtV1]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the category
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/:uniqueId', async (req, res) => {
  try {
    const category = await deleteCategoryByUniqueId(req.params.uniqueId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v1/categories/{categoryId}/questions:
 *   get:
 *     summary: Get all questions for a specific category
 *     tags: [InterviewMgmtV1]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category's unique ID
 *     responses:
 *       200:
 *         description: List of questions for the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get('/:categoryId/questions', async (req, res) => {
  try {
    const questions = await getQuestionsByCategoryId(req.params.categoryId);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v1/categories/{categoryId}/questions:
 *   post:
 *     summary: Add a new question to a category
 *     tags: [InterviewMgmtV1]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category's unique ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Question created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.post('/:categoryId/questions', async (req, res) => {
  try {
    const newQuestion = await saveQuestionForCategoryId(req.params.categoryId, req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v1/categories/{categoryId}/questions/{quesId}:
 *   put:
 *     summary: Update a question in a category
 *     tags: [InterviewMgmtV1]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category's unique ID
 *       - in: path
 *         name: quesId
 *         schema:
 *           type: string
 *         required: true
 *         description: Question's unique ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Updated question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.put('/:categoryId/questions/:quesId', async (req, res) => {
  try {
    const updatedQuestion = await updateQuestionForCategoryId(
      req.params.categoryId,
      req.params.quesId,
      req.body
    );
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /intvw-mgmt/v1/categories/{categoryId}/questions/{quesId}:
 *   get:
 *     summary: Get a specific question by question ID within a category
 *     tags: [InterviewMgmtV1]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category's unique ID
 *       - in: path
 *         name: quesId
 *         schema:
 *           type: string
 *         required: true
 *         description: Question's unique ID
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
router.get('/:categoryId/questions/:quesId', async (req, res) => {
  try {
    const question = await getQuestionByCategoryIdAndQuesId(
      req.params.categoryId,
      req.params.quesId
    );
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
