// models/activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    id:String,
  activityName: String,
  activityDescription: String,
  recurrence: String,
  shouldContinue: String,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model('Activity', activitySchema);
