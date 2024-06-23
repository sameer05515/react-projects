// Resume.service.js

const Resume = require('../models/Resume.model');

const createResume = async (resumeData) => {
  const newResume = new Resume(resumeData);
  await newResume.save();
  return newResume;
};

const updateResumeById = async (id, resumeData) => {
  return await Resume.findByIdAndUpdate(id, resumeData, { new: true });
};

const getAllResumes = async () => {
  return await Resume.find();
};

const getResumeById = async (id) => {
  return await Resume.findById(id);
};

const updateProjectById = async (resumeId, projectId, projectData) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) return null;

  const project = resume.companies.id(projectId);
  if (!project) return null;

  project.set(projectData);
  await resume.save();
  return project;
};

module.exports = {
  createResume,
  updateResumeById,
  getAllResumes,
  getResumeById,
  updateProjectById,
};
