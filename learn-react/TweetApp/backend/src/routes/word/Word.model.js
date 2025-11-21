const mongoose = require("mongoose");

// Mongoose schema
const wordSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => uuidv4() },
  unique_name: String,
  word: String,
  type: String,
  details: String,
  created_on: Date,
  updated_on: Date,
  last_read: Date,
});

module.exports = mongoose.model("Word", wordSchema);
