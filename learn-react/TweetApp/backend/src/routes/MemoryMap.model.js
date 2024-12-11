// MemoryMap.model.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library
const smartContentSchema = require("./common/SmartContent.schema"); // Import the smartContentSchema

const detailSchema = new mongoose.Schema({
    uniqueId: { type: String, default: () => uuidv4(), unique: true },
    smartContent: {
        type: smartContentSchema,
    },
});

const referenceSchema = new mongoose.Schema({
    uniqueId: { type: String, default: () => uuidv4(), unique: true },
    itemType: {
        type: String,
        enum: [
            "topic",
            "section",
            "link",
            "interview-question",
            "interview-category",
        ],
        required: true,
    },
    itemMetadata: {
        topicUniqueID: { type: String },
        linkUniqueID: { type: String },
    },
});

const memoryMapSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        unique: true,
        default: () => uuidv4(),
        validate: {
            validator: function (v) {
                return v.trim().length > 0;
            },
            message:
                "uniqueId cannot be an empty string or a string that trims to zero length",
        },
    },
    parentId: { type: String, default: "" },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.trim().length > 0;
            },
            message:
                "Name cannot be an empty string or a string that trims to zero length",
        },
    },
    skeleton: { type: String, default: "", required: false, },
    skeletonTextType: {
        type: String,
        enum: [
            "indented-string",
            "json-array",
        ],
        required: false,
    },
    details: [detailSchema],
    references: [referenceSchema],
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
    softDelete: { type: Boolean, default: false },
});

const MemoryMap = mongoose.model("MemoryMap", memoryMapSchema);
// const TopicSection=mongoose.model('TopicSection', topicSectionSchema)

module.exports = { MemoryMap };
