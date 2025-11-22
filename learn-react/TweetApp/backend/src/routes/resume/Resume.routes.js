// Resume.routes.js

const express = require('express');
const router = express.Router();
const {
  createResume,
  updateResumeById,
  getAllResumes,
  getResumeById,
  updateProjectById,
} = require('./Resume.service');

/**
 * @swagger
 * tags:
 *   - name: Resume
 *     description: API for resume operations
 */

/**
 * @swagger
 * /resumes:
 *   post:
 *     summary: Create a new resume
 *     tags: [Resume]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Resume created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error creating resume
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error creating resume
 */
router.post('/', async (req, res) => {
  try {
    const newResume = await createResume(req.body);
    res.status(201).json(newResume);
  } catch (error) {
    res.status(400).json({ error: 'Error creating resume' });
  }
});

/**
 * @swagger
 * /resumes/{id}:
 *   put:
 *     summary: Update an existing resume by ID
 *     tags: [Resume]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the resume to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Resume not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Resume not found
 *       400:
 *         description: Error updating resume
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error updating resume
 */
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

/**
 * @swagger
 * /resumes:
 *   get:
 *     summary: Get all resumes
 *     tags: [Resume]
 *     responses:
 *       200:
 *         description: List of resumes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error fetching resumes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error fetching resumes
 */
router.get('/', async (req, res) => {
  try {
    const resumes = await getAllResumes();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resumes' });
  }
});

/**
 * @swagger
 * /resumes/{id}:
 *   get:
 *     summary: Get a resume by ID
 *     tags: [Resume]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the resume to retrieve
 *     responses:
 *       200:
 *         description: Resume found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Resume not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Resume not found
 *       500:
 *         description: Error fetching resume
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error fetching resume
 */
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

/**
 * @swagger
 * /resumes/{resumeId}/projects/{projectId}:
 *   put:
 *     summary: Update a project by its ID in a resume
 *     tags: [Resume]
 *     parameters:
 *       - in: path
 *         name: resumeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the resume
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Project not found
 *       400:
 *         description: Error updating project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error updating project
 */
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
