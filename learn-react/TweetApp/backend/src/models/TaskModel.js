// models/Task.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library

const taskSchema = new mongoose.Schema({ 
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    primary: true, // Declare 'id' as the primary key
  },
  uniqueId: {
    type: String,
    default: uuidv4, // Generate a new UUID as the default value
    unique: true, // Ensure uniqueness of UUIDs
  },
  title: String,
  description: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  linkedTasks:[String],
  taskStatus:{
    type: String,
    default: 'In Progress'
  }
});

// Middleware to update the 'updatedDate' field before each 'update' operation
taskSchema.pre("update", function (next) {
  this.updatedDate = new Date();
  next();
});

module.exports = mongoose.model("Task", taskSchema);
