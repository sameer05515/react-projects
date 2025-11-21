// MyResume.routes.js

const express = require('express');
const router = express.Router();
const { getResumeByUniqueId } = require('./MyResume.service');

/**
 * @swagger
 * tags:
 *   - name: MyResume
 *     description: API for MyResume operations
 */

/**
 * @swagger
 * /my-resume/{uniqueId}:
 *   get:
 *     summary: Get resume by uniqueId
 *     description: Retrieve a MyResumeModel by its unique ID.
 *     tags: [MyResume]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the resume.
 *     responses:
 *       200:
 *         description: Resume found and returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: Resume not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resume not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
// Endpoint to get MyResumeModel data by uniqueId
router.get('/:uniqueId', async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const resumeData = await getResumeByUniqueId(uniqueId);

    if (!resumeData) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resumeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
