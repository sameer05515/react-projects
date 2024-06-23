const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  // Define the fields for the UserInfo object
  // For example, assuming there are 'name', 'email', and 'phone' fields
  name: String,
  email: String,
  phone: String,
});

const professionalExperienceSchema = new mongoose.Schema({
  sequenceNo: Number,
  companyName: String,
  startDate: String,
  endDate: String,
  designations: [
    {
      name: String,
      startDate: String,
      endDate: String,
    },
  ],
  highlights:[String]
});

const myResumeSchema = new mongoose.Schema({
  uniqueName: {
    type: String,
    unique: true,
    required: true,
  },
  linkedUserInfo: {
    type: userInfoSchema,
    required: true,
  },
  expertiseSet: {
    type: [String],
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  professionalExperience: {
    type: [professionalExperienceSchema],
    required: true,
  },
});

const MyResumeModel = mongoose.model("MyResumeModel", myResumeSchema);

module.exports = MyResumeModel;
