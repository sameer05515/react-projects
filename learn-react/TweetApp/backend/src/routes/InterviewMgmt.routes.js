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
} = require('./InterviewMgmt.service.js');
const { linkResponseDTO } = require('./InterviewMgmt.dto.js');

router.post('', async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('', async (req, res) => {
  try {
    const { pageNo, pageSize } = req.query;
    const categories = await getCategories(pageNo, pageSize);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:uniqueId', async (req, res) => {
  try {
    const responseDTO = await getCategoryByUniqueId(req.params.uniqueId);
    res.json(linkResponseDTO(responseDTO));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

router.get('/:categoryId/questions', async (req, res) => {
  try {
    const questions = await getQuestionsByCategoryId(req.params.categoryId);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:categoryId/questions', async (req, res) => {
  try {
    const newQuestion = await saveQuestionForCategoryId(req.params.categoryId, req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
