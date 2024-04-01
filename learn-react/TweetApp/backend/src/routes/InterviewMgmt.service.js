// InterviewMgmt.service.js

const Category = require('./InterviewMgmt.model.js'); // Adjust the path based on your project structure
const uuid = require('uuid');

const createCategory = async (data) => {
  return await Category.create(data);
};

const getCategories = async (pageNo, pageSize) => {
  let query = { parentId: { $in: [null, undefined, ''] } };
  let selectFields = {
    uniqueId: 1,
    categoryId: 1,
    categoryName: 1,
    title: 1,
    rating: 1,
    questions: {
      uniqueId: 1,
      ques: 1,
      title: 1,
      hidden: 1,
    },
  };
  return await Category.find(query).select(selectFields);
};

const getCategoryByUniqueId = async (uniqueId) => {
  let selectFields = {
    uniqueId: 1,
    categoryId: 1,
    categoryName: 1,
    title: 1,
    rating: 1,
    questions: {
      uniqueId: 1,
      ques: 1,
      title: 1,
      hidden: 1,
    },
  };
  const category = await Category.findOne({ uniqueId }).select(selectFields);
  const children = await Category.find({ parentId: uniqueId });

  let ancestors = [];
  try {
    ancestors = await getAllAncestors(category.parentId);
  } catch (error) {
    console.error(error);
  }

  return {
    ...category.toObject(),
    children: children.map(child => ({
      title: child.title,
      uniqueId: child.uniqueId,
    })),
    ancestors: [...ancestors],
  };
};

const updateCategoryByUniqueId = async (uniqueId, data) => {
  return await Category.findOneAndUpdate({ uniqueId }, data, { new: true });
};

const deleteCategoryByUniqueId = async (uniqueId) => {
  return await Category.findOneAndRemove({ uniqueId });
};

const getQuestionsByCategoryId = async (categoryId) => {
  const category = await Category.findOne({ categoryId });
  if (!category) throw new Error('Category not found');
  return category.questions.map(question => ({
    uniqueId: question.uniqueId,
    quesId: question.quesId,
    ques: question.ques,
    title: question.title,
    rating: question.rating,
    hidden: question.hidden,
  }));
};

const saveQuestionForCategoryId = async (categoryId, questionData) => {
  const category = await Category.findOne({ categoryId });
  if (!category) throw new Error('Category not found');
  const newQuestion = {
    uniqueId: uuid.v4(),
    ...questionData,
    answers: [], // Assuming answers are initially empty
  };
  category.questions.push(newQuestion);
  await category.save();
  return newQuestion;
};

const updateQuestionForCategoryId = async (categoryId, quesId, questionData) => {
  const category = await Category.findOne({ categoryId });
  if (!category) throw new Error('Category not found');
  const questionIndex = category.questions.findIndex(question => question.quesId === quesId);
  if (questionIndex === -1) throw new Error('Question not found');
  Object.assign(category.questions[questionIndex], questionData);
  await category.save();
  return category.questions[questionIndex];
};

const getQuestionByCategoryIdAndQuesId = async (categoryId, quesId) => {
  const category = await Category.findOne({ uniqueId: categoryId });
  if (!category) throw new Error('Category not found');
  const question = category.questions.find(question => question.uniqueId === quesId);
  if (!question) throw new Error('Question not found');
  return question;
};

const getAllAncestors = async (parentId, ancestors = []) => {
  if (!parentId) return ancestors;
  const category = await Category.findOne({ uniqueId: parentId });
  if (category) {
    ancestors.unshift(category.name);
    return getAllAncestors(category.parentId, ancestors);
  }
  return ancestors;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryByUniqueId,
  updateCategoryByUniqueId,
  deleteCategoryByUniqueId,
  getQuestionsByCategoryId,
  saveQuestionForCategoryId,
  updateQuestionForCategoryId,
  getQuestionByCategoryIdAndQuesId,
};
