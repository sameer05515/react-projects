const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library


const tagSchema = new mongoose.Schema({
  tagId: {
    type: String,
    unique: true,
    default: () => uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
