const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import the v4 function from the uuid library
const smartContentSchema = require('./common/SmartContent.schema'); // Import the smartContentSchema

const topicSectionSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    unique: true,
    default: () => uuidv4(),
  },
  linkedTopicUniqueId: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  smartContent: {
    type: smartContentSchema,
    required: true,
  },
  order: {type:Number, required:true},
  tags: [String],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  }
});

const topicSchema = new mongoose.Schema({
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
  parentId: { type: String, default: '' },
  name: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.trim().length > 0;
      },
      message: 'Name cannot be an empty string or a string that trims to zero length'
    }
  },
  description: {
    type: String,
  },
  smartContent: {
    type: smartContentSchema,
    //required: true,
  },
  tags: [String],
  occurenceDate: {
    type: Date, // Assuming you want to store dates
    default: Date.now, // Default value is the current date and time
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



// Middleware to update the 'updatedDate' field before each 'update' operation
// topicSchema.pre("update", function (next) {
//   this.updatedDate = new Date();
//   next();
// });



const Topic = mongoose.model('Topic', topicSchema);
const TopicSection=mongoose.model('TopicSection', topicSectionSchema)

module.exports = {Topic,TopicSection};
