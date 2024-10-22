const mongoose = require('mongoose');
const uuid = require('uuid');
const smartContentSchema = require('./common/SmartContent.schema'); // Import the smartContentSchema


const cGPTFileSchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuid.v4 },
    name: String,
    location: String,
    descriptions: [smartContentSchema],
    parentId: {
        type: String,
        default: ''
    },
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

const cGPTConversationSchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuid.v4 },
    oldId: String,
    name: String,
    heading: String,
    descriptions: [smartContentSchema],
    rating: Number,
    parentId: {
        type: String,
        default: ''
    },
    linkedCGPTFileId: { type: String, default: '' },
    order: { type: Number, default: 0 },
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

const cGPTMessagesSchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuid.v4 },
    oldId: String,
    name: String,
    heading: String,
    descriptions: [smartContentSchema],
    rating: Number,
    linkedCGPTConvId: { type: String, default: '' },
    parentId: {
        type: String,
        default: ''
    },
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

const Category = mongoose.model('CGPTFile', cGPTFileSchema);
const Question = mongoose.model('CGPTConversation', cGPTConversationSchema);
const Answer = mongoose.model('CGPTMessage', cGPTMessagesSchema);

module.exports = { Category, Question, Answer };