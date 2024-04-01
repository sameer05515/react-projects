// resumeRoutes.js

const express = require('express');
const router = express.Router();
const {
  createResume,
  updateResumeById,
  getAllResumes,
  getResumeById,
  updateProjectById,
} = require('../services/Resume.service');

// Create a new resume
router.post('/', async (req, res) => {
  try {
    const newResume = await createResume(req.body);
    res.status(201).json(newResume);
  } catch (error) {
    res.status(400).json({ error: 'Error creating resume' });
  }
});

// Update a resume by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedResume = await updateResumeById(id, req.body);
    if (!updatedResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(updatedResume);
  } catch (error) {
    res.status(400).json({ error: 'Error updating resume' });
  }
});

// Get all resumes
router.get('/', async (req, res) => {
  try {
    const resumes = await getAllResumes();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resumes' });
  }
});

// Get a resume by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resume = await getResumeById(id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resume' });
  }
});

// Update a project by ID
router.put('/:resumeId/projects/:projectId', async (req, res) => {
  const { resumeId, projectId } = req.params;
  try {
    const project = await updateProjectById(resumeId, projectId, req.body);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: 'Error updating project' });
  }
});

module.exports = router;
