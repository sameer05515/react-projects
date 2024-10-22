const { Category, Question, Answer } = require("./InterviewMgmt.v2.model");

async function getAllQuestionsForReportingModule() {
    try {
        let selectFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            rating: 1,
            createdDate:1,
            updatedDate:1,
            tags:1
        };
        // console.log('Request came to fetch all questions');
        const questions = await Question.find().select(selectFields);
        return questions?.map(q => ({
            ...q.toObject(),
            parentId: q.parentId || 'SUPER-ROOT'
        })) || [];
    } catch (err) {
        console.error(err);
        // throw err;
        return [];
    }
}

module.exports={
    getAllQuestionsForReportingModule
}