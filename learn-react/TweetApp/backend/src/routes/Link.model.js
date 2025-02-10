const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library
const smartContentSchema = require('./common/SmartContent.schema'); // Import the smartContentSchema

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
});

const linkSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    unique: true,
    default: () => uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    default: "",
  },
  linkType: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  descriptions: [smartContentSchema],
  // children: [childSchema], // Define children field as an array of objects
});

const Tag = mongoose.model("Link", linkSchema);

module.exports = Tag;
