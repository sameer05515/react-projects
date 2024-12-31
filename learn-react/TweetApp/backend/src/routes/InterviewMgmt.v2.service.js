// Interview.service.js

const { Category, Question, Answer } = require("./InterviewMgmt.v2.model");

const createCategory = async (categoryData) => {
  try {
    const category = new Category({
      name: categoryData.name,
      heading: categoryData.heading,
      smartContent: categoryData.smartContent || null,
      rating: categoryData.rating,
      parentId: categoryData.parentId,
      tags: categoryData.tags || [],
      createdDate: new Date(),
      updatedDate: new Date(),
    });
    await category.save();
    return category;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateCategoryByUniqueId = async (uniqueId, categoryData) => {
  try {
    let category = await Category.findOne({ uniqueId });
    if (!category) {
      throw new Error("Task not found");
    }
    // console.log(`categoryData : ${JSON.stringify(categoryData)}`)
    const { name, heading, smartContent, rating, parentId, tags, children } =
      categoryData;
    category.parentId = parentId || category.parentId;
    category.name = name || category.name;
    category.heading = heading || category.heading;
    category.tags = tags && tags.length >= 0 ? tags : category.tags;
    category.rating = rating >= 0 ? rating : category.occurenceDate;
    category.smartContent = smartContent || category.smartContent;
    category.updatedDate = new Date();
    category = await category.save();
    const childrenIds = children || [];
    // console.log(`childrenIds: ${childrenIds}`)
    await Category.updateMany(
      { uniqueId: { $in: childrenIds } },
      { parentId: category.uniqueId }
    );
    return category;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAllCategories = async () => {
  try {
    let selectFields = {
      uniqueId: 1,
      name: 1,
      heading: 1,
      parentId: 1,
    };
    const categories = await getCategories(null, { ...selectFields });
    // const categoriesWithQuestions= await Promise.all(
    //     categories.map(async (cat)=>{
    //         const questions= await getQuestionsForCategories(cat.uniqueId);
    //         return {...cat.toObject, questions}
    //     })
    // )

    // return categoriesWithQuestions;
    return categories;
  } catch (err) {
    console.error(err);
    throw err;
  }
  // return await Category.find();
};

// Recursive function to get all ancestors of a category
async function getAllAncestors(parentId, ancestors = []) {
  // console.log(`start: parentId: ${parentId} :   function getAllAncestors : ${JSON.stringify(ancestors)}`);
  if (!parentId) {
    return ancestors;
  }
  const category = await Category.findOne({ uniqueId: parentId });
  // console.log(`category: ${JSON.stringify(category)}`);
  // if (!category || !category.parentId) {
  //   return ancestors;
  // }
  ancestors.unshift({
    name: category.name,
    uniqueId: category.uniqueId,
    parentId: category.parentId,
  }); // Add the name of the current category to ancestors array
  // console.log(`final: function getAllAncestors : ${JSON.stringify(ancestors)}`);
  return getAllAncestors(category.parentId, ancestors); // Recursively call to get ancestors of the parent category
}

async function getCategories(parentId, selectFields) {
  try {
    const criteria = parentId
      ? { parentId, isPrivate: false }
      : { parentId: { $in: [null, undefined, ""] }, isPrivate: false };
    let categories = await Category.find(criteria).select(selectFields);
    const categoriesWithChildren = await Promise.all(
      categories.map(async (category) => {
        const children = await getCategories(category.uniqueId, selectFields);
        const ancestors = await getAllAncestors(category.parentId);
        const questions = await getQuestionsForCategories(category.uniqueId);
        return { ...category.toObject(), children, ancestors, questions };
      })
    );
    return categoriesWithChildren;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getCategoryByUniqueId = async (uniqueId) => {
  let selectFields = {
    uniqueId: 1,
    name: 1,
    heading: 1,
    parentId: 1,
    smartContent: 1,
    title: 1,
    rating: 1,
  };
  const category = await Category.findOne({ uniqueId }).select(selectFields);
  const children = await Category.find({ parentId: uniqueId });
  const questions = await getQuestionsForCategories(uniqueId);

  let ancestors = [];
  try {
    ancestors = await getAllAncestors(category.parentId);
  } catch (error) {
    console.error(error);
  }

  return {
    ...category.toObject(),
    children: children.map((child) => ({
      title: child.title,
      uniqueId: child.uniqueId,
    })),
    ancestors: [...ancestors],
    questions: [...questions],
  };
};

/**Question*/
const createQuestion = async (questionData) => {
  try {
    const question = new Question({
      name: questionData.name,
      heading: questionData.heading,
      smartContent: questionData.smartContent || null,
      rating: questionData.rating,
      parentId: questionData.parentId,
      tags: questionData.tags || [],
      linkedCategoryId: questionData.linkedCategoryId,
      order: questionData.order,
      createdDate: new Date(),
      updatedDate: new Date(),
    });
    await question.save();
    return question;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

async function getAllQuestions() {
  try {
    let selectFields = {
      uniqueId: 1,
      name: 1,
      heading: 1,
      parentId: 1,
      rating: 1,
    };
    // console.log('Request came to fetch all questions');
    const questions = await getQuestionsForParentId(null, { ...selectFields });
    return questions;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Recursive function to get all ancestors of a Question
async function getAllAncestorQuestions(parentId, ancestors = []) {
  if (!parentId) {
    return ancestors;
  }
  const question = await Question.findOne({ uniqueId: parentId });

  ancestors.unshift({
    name: question.name,
    uniqueId: question.uniqueId,
    parentId: question.parentId,
  });

  return getAllAncestorQuestions(question.parentId, ancestors);
}

async function getQuestionsForParentId(parentId, selectFields) {
  try {
    const criteria = parentId
      ? { parentId, isPrivate: { $in: [null, undefined, false] } }
      : {
          parentId: { $in: [null, undefined, ""] },
          isPrivate: { $in: [null, undefined, false] },
        };
    let questions = await Question.find(criteria).select(selectFields);
    // console.log(`Total questions ${questions?.length||0} found with parentId: ${parentId?parentId:'null'}`)
    const questionsWithChildren = await Promise.all(
      questions.map(async (question) => {
        const children = await getQuestionsForParentId(
          question.uniqueId,
          selectFields
        );
        const ancestors = await getAllAncestorQuestions(question.parentId);
        // const questions = await getQuestionsForCategories(category.uniqueId);
        return { ...question.toObject(), children, ancestors };
      })
    );
    return questionsWithChildren;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getQuestionsForCategories(linkedCategoryId) {
  try {
    let selectFields = {
      uniqueId: 1,
      name: 1,
      heading: 1,
      parentId: 1,
      linkedCategoryId: 1,
      rating: 1,
    };

    const questions = await Question.find({ linkedCategoryId }).select(
      selectFields
    );
    return questions || [];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const getQuestionByCategoryIdAndQuesId = async (linkedCategoryId, uniqueId) => {
  const question = await Question.findOne({ uniqueId, linkedCategoryId });

  if (!question) throw new Error("Question not found");
  const answers = await getAnswersForQuestion(question.uniqueId);
  return {
    ...question.toObject(),
    answers,
  };
};

const getQuestionByUniqueId = async (uniqueId) => {
  const question = await Question.findOne({ uniqueId });

  if (!question) throw new Error("Question not found");
  let selectFields = {
    uniqueId: 1,
    name: 1,
    heading: 1,
    parentId: 1,
    rating: 1,
  };
  const answers = await getAnswersForQuestion(question.uniqueId);
  const children = await getQuestionsForParentId(
    question.uniqueId,
    selectFields
  );
  const ancestors = await getAllAncestorQuestions(question.parentId);
  return {
    ...question.toObject(),
    answers,
    children,
    ancestors,
  };
};

const updateLastRevisedOfQuestionByUniqueId = async (uniqueId) => {
  throw new Error("Mehod not implemented yet!!");
  //   let question = await Question.findOne({ uniqueId });
  //   if (!question) {
  //     throw new Error(`Question not found for uniqueId: ${uniqueId}`);
  //   }
};

const updateQuestionByUniqueId = async (uniqueId, questionData) => {
  try {
    let question = await Question.findOne({ uniqueId });
    if (!question) {
      throw new Error("Question not found");
    }
    // console.log(`categoryData : ${JSON.stringify(categoryData)}`)
    const {
      name,
      heading,
      smartContent,
      rating,
      linkedCategoryId,
      parentId,
      tags,
      children,
      order,
    } = questionData;
    question.linkedCategoryId = linkedCategoryId || question.linkedCategoryId;
    question.parentId = parentId || question.parentId;
    question.name = name || question.name;
    question.order = order || question.order;
    question.heading = heading || question.heading;
    question.tags = tags && tags.length >= 0 ? tags : question.tags;
    question.rating = rating >= 0 ? rating : question.occurenceDate;
    question.smartContent = smartContent || question.smartContent;
    question.updatedDate = new Date();
    question = await question.save();
    // const childrenIds = children || [];
    // // console.log(`childrenIds: ${childrenIds}`)
    // await Category.updateMany(
    //     { uniqueId: { $in: childrenIds } },
    //     { parentId: category.uniqueId }
    // );
    return question;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getQuestionsByTagId = async (tagId) => {
  try {
    const selectFields = {
      uniqueId: 1,
      name: 1,
      //parentId: 1,
      //tags: 1,
    };
    const tasks = await Question.find({ tags: tagId }).select(selectFields);
    return tasks;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Error retrieving Questions with tagId ${tagId}: ${error.message}`
    );
  }
};

/**Answer*/
const createAnswer = async (answerData) => {
  try {
    const answer = new Answer({
      name: answerData.name,
      heading: answerData.heading,
      smartContent: answerData.smartContent || null,
      rating: answerData.rating,
      linkedQuestionsId: answerData.linkedQuestionsId,
      order: answerData.order,
      createdDate: new Date(),
      updatedDate: new Date(),
    });
    await answer.save();
    return answer;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

async function getAnswersForQuestion(linkedQuestionsId) {
  try {
    let selectFields = {
      uniqueId: 1,
      name: 1,
      heading: 1,
      smartContent: 1,
      parentId: 1,
      linkedQuestionsId: 1,
      rating: 1,
    };

    const answers = await Answer.find({ linkedQuestionsId }); //.select(selectFields);
    return answers || [];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const updateAnswerByUniqueId = async (uniqueId, answerData) => {
  try {
    let answer = await Answer.findOne({ uniqueId });
    if (!answer) {
      throw new Error("Answer not found");
    }
    // console.log(`answerData : ${JSON.stringify(answerData)}`)
    const {
      name,
      heading,
      smartContent,
      rating,
      linkedQuestionsId,
      tags,
      children,
      order,
    } = answerData;
    answer.linkedQuestionsId = linkedQuestionsId || answer.linkedQuestionsId;
    // answer.parentId = parentId || answer.parentId;
    answer.name = name || answer.name;
    answer.order = order || answer.order;
    answer.heading = heading || answer.heading;
    answer.tags = tags && tags.length >= 0 ? tags : answer.tags;
    answer.rating = rating >= 0 ? rating : answer.occurenceDate;
    answer.smartContent = smartContent || answer.smartContent;
    answer.updatedDate = new Date();
    answer = await answer.save();

    return answer;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const searchTopics = async (searchString, searchOptions) => {
  const regex = new RegExp(searchString, "i"); // 'i' for case insensitive

  const selectFields = {
    uniqueId: 1,
    name: 1,
    heading: 1,
    parentId: 1,
    tags: 1,
  };

  const criteria = {
    $or: [
      { name: { $regex: regex } },
      { heading: { $regex: regex } },
      //{ description: { $regex: regex } },
    ],
  };

  if (
    searchOptions &&
    searchOptions.description &&
    searchOptions.description > 0
  ) {
    selectFields.description = 1;
    criteria["$or"].push({ description: { $regex: regex } });
  }

  return await Question.find(criteria).select(selectFields);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByUniqueId,
  updateCategoryByUniqueId,

  createQuestion,
  getAllQuestions,
  getQuestionByUniqueId,
  getQuestionByCategoryIdAndQuesId,
  updateQuestionByUniqueId,
  updateLastRevisedOfQuestionByUniqueId,

  // getAllQuestionsForReportingModule,

  getQuestionsByTagId,

  createAnswer,
  updateAnswerByUniqueId,

  searchTopics,
};
