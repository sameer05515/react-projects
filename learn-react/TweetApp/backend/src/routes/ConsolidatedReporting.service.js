const { Category, Question, Answer } = require("./InterviewMgmt.v2.model");
const { Topic, TopicSection } = require("./Topic.model");
const Task = require("./Task.model");

const selectFields = {
    uniqueId: 1,
    name: 1,
    parentId: 1,
    rating: 1,
    createdDate: 1,
    updatedDate: 1,
    tags: 1
};

// Common logic to fetch data from any model
async function getAllForReportingModule(Model) {
    try {
        const items = await Model.find().select(selectFields);
        return items?.map(item => ({
            ...item.toObject(),
            parentId: item.parentId || 'SUPER-ROOT'
        })) || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

// Specific functions to fetch data for reporting
async function getAllQuestionsForReportingModule() {
    return getAllForReportingModule(Question);
}

async function getAllTopicsForReportingModule() {
    return getAllForReportingModule(Topic);
}

async function getAllTasksForReportingModule() {
    return getAllForReportingModule(Task);
}

module.exports = {
    getAllQuestionsForReportingModule,
    getAllTopicsForReportingModule,
    getAllTasksForReportingModule
};
