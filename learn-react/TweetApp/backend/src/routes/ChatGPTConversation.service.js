const { CGPTFile } = require("./ChatGPTConversation.model");

const getAllCategories = async () => {
    try {
        let selectFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
        };
        const categories = await CGPTFile.find().select(selectFields);
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
};

module.exports = {
    // createCategory,
    getAllCategories,
    // getCategoryByUniqueId,
    // updateCategoryByUniqueId,

    // createQuestion,
    // getAllQuestions,
    // getQuestionByUniqueId,
    // getQuestionByCategoryIdAndQuesId,
    // updateQuestionByUniqueId,

    // getAllQuestionsForReportingModule,

    // getQuestionsByTagId,

    // createAnswer,
    // updateAnswerByUniqueId,

    // searchTopics
};