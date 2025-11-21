const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library

const parameterSchema = new Schema({
  header: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const comparableObjectSchema = new Schema({
  uniqueId: {
    type: String,
    unique: true,
    default: () => uuidv4(),
  },
  title: {
    type: String,
    required: true,
  },
  initialSummary: {
    type: String,
  },
  finalSummary: {
    type: String,
  },
  parameters: {
    type: [parameterSchema],
    default: [],
  },
});

const ComparableObjectModel = mongoose.model('ComparableObjectModel', comparableObjectSchema);

module.exports = ComparableObjectModel;
