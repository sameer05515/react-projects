const mongoose = require('mongoose');
const uuid = require('uuid');
const smartContentSchema = require('./common/SmartContent.schema'); // Import the smartContentSchema


const categorySchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuid.v4 },
    name: String,
    heading: String,
    smartContent: {
        type: smartContentSchema,
        required: true,
    },
    isPrivate:{type:Boolean, default:false},
    rating: Number,
    parentId: {
        type: String,
        default: ''
    },
    // linkedQuestions: [{
    //     uniqueId: { type: String, required: true },
    //     order: { type: Number, default: 0 }
    // }],
    tags: [String],
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    }
});

const questionSchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuid.v4 },
    name: String,
    heading: String,
    smartContent: {
        type: smartContentSchema,
        required: true,
    },
    rating: Number,
    parentId: {
        type: String,
        default: ''
    },
    linkedCategoryId:{ type: String, default: '' },
    order: { type: Number, default: 0 },
    // linkedAnswers: [{
    //     uniqueId: { type: String, required: true },
    //     order: { type: Number, default: 0 }
    // }],

    tags: [String],
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    }
});

const answerSchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuid.v4 },
    name: String,
    heading: String,
    smartContent: {
        type: smartContentSchema,
        required: true,
    },
    rating: Number,
    linkedQuestionsId:{ type: String, default: '' },
    order: { type: Number, default: 0 },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    }
});

const Category = mongoose.model('InterviewCategory', categorySchema);
const Question = mongoose.model('InterviewQuestion', questionSchema);
const Answer = mongoose.model('InterviewAnswer', answerSchema);

module.exports= {Category, Question, Answer};