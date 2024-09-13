// models/Task.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library
const smartContentSchema = require('./common/SmartContent.schema'); // Import the smartContentSchema

// const activitySchema = new mongoose.Schema({
//   uniqueId: { type: String, default: uuidv4, unique: true },
// type: String,
// createdDate: { type: Date, default: Date.now },
// updatedDate: { type: Date, default: Date.now },
//   description: String,
//   userDetails: {
//     id: String,
//     name: String
//   }
// });

const activitySchema = new mongoose.Schema({
  uniqueId: { type: String, default: uuidv4, unique: true },
  type: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  description: {
    type: smartContentSchema,
    required: false,
  },
  // descr: {
  //   type: smartContentSchema,
  //   required: false,
  // },
  userDetails: {
    id: { type: String, required: true },
    name: { type: String, required: true }
  }
});

const taskSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true, primary: true, },
  uniqueId: { type: String, default: uuidv4, unique: true, },
  parentId: { type: String, default: '' },
  name: { type: String, required: true },
  // description: { type: String, required: false },
  descriptions: [smartContentSchema],
  createdDate: { type: Date, default: Date.now, },
  updatedDate: { type: Date, default: Date.now, },
  tags: [String],
  linkedTasks: [String],
  taskStatus: { type: String, default: 'In Progress' },
  activities: [activitySchema]
});

// Middleware to update the 'updatedDate' field before each 'update' operation
taskSchema.pre("update", function (next) {
  this.updatedDate = new Date();
  next();
});

module.exports = mongoose.model("Task", taskSchema);
