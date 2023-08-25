const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import the v4 function from the uuid library

const topicSchema = new mongoose.Schema({
  topicId: {
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

module.exports = Topic;
