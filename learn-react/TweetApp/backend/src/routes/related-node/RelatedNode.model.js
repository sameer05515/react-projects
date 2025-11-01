// RelatedNode.model.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const relationSchema = new mongoose.Schema({
    uniqueId: { type: String, default: () => uuidv4(), unique: true },
    name: {
        type: String,
        required: false,        
    },
    type: {
        type: String,
        enum: [
            "previous",
            "next"
        ],
        required: true,
    },
    showReverseRelationName: { type: Boolean, default: false },
    hasId: { type: String },
    withId: { type: String },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
    softDelete: { type: Boolean, default: false },

})

const relatedNodeSchema = new mongoose.Schema(
    {
        uniqueId: {
            type: String,
            default: () => uuidv4(),
            unique: true,
            required: true,  // Ensures a value is always provided
        },
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
        itemType: {
            type: String,
            enum: [
                "category",
                "question",
                "topic",
                "section",
                "link",
                "tech-stack",
                "memory-map",
                "conversation",
                "message"
            ],
            required: true,
        },
        relations: [relationSchema],
        createdDate: {
            type: Date,
            default: Date.now,
        },
        updatedDate: {
            type: Date,
            default: Date.now,
        },
        softDelete: { type: Boolean, default: false },
    }
);

// Pre-save hook to ensure uniqueId is generated if not set
relatedNodeSchema.pre('save', function (next) {
    if (!this.uniqueId || this.uniqueId.trim() === "") {
        this.uniqueId = uuidv4();
    }
    next();
});

const RelatedNode = mongoose.model("RelatedNode", relatedNodeSchema);

module.exports = { RelatedNode };
