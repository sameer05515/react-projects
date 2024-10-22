const mongoose = require('mongoose');
const uuid = require('uuid');
const smartContentSchema = require('./common/SmartContent.schema'); // Import the smartContentSchema

// Base schema for common fields
const baseSchema = {
    uniqueId: { type: String, default: uuid.v4 },
    name: String,
    heading: String,
    descriptions: [smartContentSchema],
    parentId: { type: String, default: '' },
    tags: [String],
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
};

// Schema for CGPTFile
const cGPTFileSchema = new mongoose.Schema({
    ...baseSchema,
    location: String,
    isLatest:{type: Boolean, default:false},
});

// Schema for CGPTConversation
const cGPTConversationSchema = new mongoose.Schema({
    ...baseSchema,
    oldId: String,
    rating: Number,
    linkedCGPTFileId: { type: String, default: '' },
    order: { type: Number, default: 0 }
});

// Schema for CGPTMessage
const cGPTMessagesSchema = new mongoose.Schema({
    ...baseSchema,
    oldId: String,
    rating: Number,
    linkedCGPTConvId: { type: String, default: '' },
    order: { type: Number, default: 0 }
});

// Models
const CGPTFile = mongoose.model('CGPTFile', cGPTFileSchema);
const CGPTConversation = mongoose.model('CGPTConversation', cGPTConversationSchema);
const CGPTMessage = mongoose.model('CGPTMessage', cGPTMessagesSchema);

module.exports = { CGPTFile, CGPTConversation, CGPTMessage };
