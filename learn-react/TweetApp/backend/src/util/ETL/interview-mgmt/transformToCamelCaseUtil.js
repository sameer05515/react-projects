const { v4: uuidv4 } = require("uuid");

/**
 * Transforms a single category document from snake_case fields to camelCase (new schema).
 * Used by the interview-mgmt ETL script.
 * @param {Object} category - Category with cat_id, cat_name, questions (each with ques_id, linked_cat_id, answers with ans_id)
 * @param {Function} [uuidFn=uuidv4] - Optional UUID generator for deterministic tests
 * @returns {Object} New document with catId, catName, questions[].quesId, linkedCatId, answers[].ansId
 */
function transformCategoryToCamelCase(category, uuidFn = uuidv4) {
  if (!category) return null;
  return {
    uniqueId: category.uniqueId || uuidFn(),
    catId: category.cat_id,
    catName: category.cat_name,
    rating: category.rating,
    sourceDB: "interview_mgmt",
    questions: (category.questions || []).map((question) => ({
      uniqueId: question.uniqueId || uuidFn(),
      quesId: question.ques_id,
      linkedCatId: question.linked_cat_id,
      ques: question.ques,
      rating: question.rating,
      hidden: question.hidden,
      answers: (question.answers || []).map((answer) => ({
        uniqueId: answer.uniqueId || uuidFn(),
        ansId: answer.ans_id,
        answer: answer.answer,
        rating: answer.rating,
      })),
    })),
  };
}

/**
 * Transforms an array of category documents to camelCase schema.
 */
function transformCategoriesToCamelCase(categories, uuidFn = uuidv4) {
  if (!Array.isArray(categories)) return [];
  return categories.map((cat) => transformCategoryToCamelCase(cat, uuidFn));
}

module.exports = {
  transformCategoryToCamelCase,
  transformCategoriesToCamelCase,
};
