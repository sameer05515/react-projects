const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library
const smartContentSchema = require("./common/SmartContent.schema"); // Import the smartContentSchema

const Status = {
  OPEN: "Open",
  CLOSED: "Closed",
  UNKNOWN: "Unknown",
};

const ThinkTankItemType = {
  ToDo: "to-do",
  RawQuestion: "raw-question",
  YetToBeDecided: "yet-to-be-decided",
};

// // SmartContent sub-schema
// const SmartContentSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true,
//     default: "Missing Content!!!",
//   },
//   textOutputType: {
//     type: String,
//     required: true,
//     enum: ["HTML", "Markdown", "PlainText"], // Adjust based on availableOutputTypes
//     default: "HTML",
//   },
// });

// ThinkTankItem Schema
const ThinkTankItemSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    smartContent: {
      type: smartContentSchema,
      required: true,
      default: () => ({
        content: "Missing Content!!!",
        textOutputType: "HTML",
        textInputType: "TextArea",
      }),
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: Status.OPEN,
    },
    closedOn: {
      type: Date,
      default: null, // If not closed, this remains null
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    hasGroomed: {
      type: Boolean,
      default: false,
    },
    itemType: {
      type: String,
      enum: Object.values(ThinkTankItemType),
      required: true,
      default: ThinkTankItemType.YetToBeDecided,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const ThinkTankItemModel = mongoose.model("ThinkTank", ThinkTankItemSchema);

module.exports = { ThinkTankItemModel, ThinkTankItemType, Status };
