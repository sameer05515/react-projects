    // ResumeModel.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const companySchema = new mongoose.Schema({
  companyName: String,
  tenure: String,
  projects: [projectSchema],
});

const addressSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  state: String,
  district: String,
});

const resumeSchema = new mongoose.Schema({
  resumeId: String,
  linkedUserId: String,
  name: String,
  address: addressSchema,
  summary: String,
  companies: [companySchema],
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
