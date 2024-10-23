const { CGPTFile } = require("./ChatGPTConversation.model");

const getAllCategories = async () => {
    try {
        let selectFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            isLatest: 1,
            location: 1
        };
        const categories = await CGPTFile.find().select(selectFields);

        return categories?.map(c => ({
            ...c.toObject(),
            latestFile: c.isLatest
        })) || [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getCategoryForUniqueId = async (uniqueId) => {
    try {
        let selectFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            isLatest: 1,
            location: 1,
            'conversations.uniqueId': 1,  // Project uniqueId of conversations
            'conversations.name': 1       // Project name of conversations
        };
        const cgptFile = await CGPTFile.findOne({ uniqueId }).select(selectFields);

        if (!cgptFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        return cgptFile;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    // createCategory,
    getAllCategories,
    getCategoryForUniqueId,
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