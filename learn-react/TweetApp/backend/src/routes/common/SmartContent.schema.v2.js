const mongoose = require('mongoose');

const smartContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  textOutputType: {
    type: String,
    enum: ['html', 'yaml', 'markdown', 'skeleton', 'text'], // Assuming possible values are 'html' and 'plaintext'
    required: true,
  },
  textInputType: {
    type: String,
    enum: ['CKEditor', 'TextArea'],
    required: true,
  }
});

module.exports = smartContentSchema;