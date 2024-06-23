const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from the uuid library
const smartContentSchema = require('./common/SmartContent.schema'); // Import the smartContentSchema


const tagSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    unique: true,
    default: () => uuidv4(),
    validate: {
      validator: function(v) {
        return v.trim().length > 0;
      },
      message: 'uniqueId cannot be an empty string or a string that trims to zero length'
    }
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  parentId: { type: String, default: '' },
  smartContent: {
    type: smartContentSchema,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
