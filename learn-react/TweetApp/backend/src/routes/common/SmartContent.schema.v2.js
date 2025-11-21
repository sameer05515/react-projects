const mongoose = require('mongoose');

const SupportedOutFormats = {
  HTML: "html",
  YAML: "yaml",
  MARKDOWN: "markdown",
  TEXT: "text",
  TIS_to_SKELETON: "skeleton",
  YAML_to_SKELETON: "yaml_to_skeleton",
};

const SupportedInputComponents = {
  textArea: "TextArea",
  ckEditor: "CKEditor",
};

const smartContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  textOutputType: {
    type: String,
    // enum: ['html', 'yaml', 'markdown', 'skeleton', 'text'], // Assuming possible values are 'html' and 'plaintext'
    enum: Object.values(SupportedOutFormats),
    required: true,
    default: SupportedOutFormats.TEXT,
  },
  textInputType: {
    type: String,
    // enum: ['CKEditor', 'TextArea'],
    enum: Object.values(SupportedInputComponents),
    required: true,
    default: SupportedInputComponents.textArea,
  }
});

module.exports = smartContentSchema;