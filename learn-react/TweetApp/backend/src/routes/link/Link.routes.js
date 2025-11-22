const express = require('express');
const router = express.Router();
const {
  createLink,
  getLinks,
  getAllLinksFlat,
  getLinkByUniqueId,
  getLinkChildren,
  getAllAncestors,
  updateLinkByUniqueId,
  deleteLinkByUniqueId
} = require('./Link.service');
const { linkResponseDTO } = require('./Link.dtos'); // Adjust the path to your DTO as needed

/**
 * @swagger
 * tags:
 *   - name: Link
 *     description: API for operations on links
 */

/**
 * @swagger
 * /links:
 *   post:
 *     summary: Create a new link
 *     tags: [Link]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Link created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.post('', async (req, res) => {
  try {
    const link = await createLink(req.body);
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /links:
 *   get:
 *     summary: Get all links (only basic fields)
 *     tags: [Link]
 *     responses:
 *       200:
 *         description: List of links
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uniqueId:
 *                     type: string
 *                     example: "abc123"
 *                   name:
 *                     type: string
 *                     example: "Sample Link"
 *                   parentId:
 *                     type: string
 *                     nullable: true
 *                     example: "parent123"
 *       500:
 *         description: Server error
 */
router.get('', async (req, res) => {
  try {
    const selectFields = {
      uniqueId: 1,
      name: 1,
      parentId: 1
    };
    const links = await getLinks(null, selectFields);
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /links/export/flat:
 *   get:
 *     summary: Export all links as a flat list (JSON)
 *     tags: [Link]
 *     responses:
 *       200:
 *         description: Links export as flat array
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to get links
 */
router.get('/export/flat', async (req, res) => {
  try {
    const links = await getAllLinksFlat();
    res.setHeader('Content-Disposition', 'attachment; filename="links-export-flat.json"');
    res.setHeader('Content-Type', 'application/json');
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /links/{uniqueId}:
 *   get:
 *     summary: Get link by uniqueId along with its children and ancestors
 *     tags: [Link]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the link
 *     responses:
 *       200:
 *         description: Link object with children and ancestors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uniqueId:
 *                   type: string
 *                   example: "abc123"
 *                 name:
 *                   type: string
 *                   example: "Sample Link"
 *                 parentId:
 *                   type: string
 *                   nullable: true
 *                   example: "parent123"
 *                 children:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Child Link"
 *                       uniqueId:
 *                         type: string
 *                         example: "child123"
 *                 ancestors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     additionalProperties: true
 *       500:
 *         description: Server error
 */
router.get('/:uniqueId', async (req, res) => {
  try {
    const link = await getLinkByUniqueId(req.params.uniqueId);
    const children = await getLinkChildren(req.params.uniqueId);
    let ancestors = [];
    try {
      ancestors = await getAllAncestors(link.parentId);
    } catch (error) {
      console.error(error);
      ancestors = [];
    }
    const responseDTO = linkResponseDTO({
      ...link.toObject(),
      children: children.map(child => ({
        name: child.name,
        uniqueId: child.uniqueId
      })),
      ancestors: [...ancestors]
    });
    res.json(responseDTO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /links/{uniqueId}:
 *   put:
 *     summary: Update a link by uniqueId
 *     tags: [Link]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Link updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       500:
 *         description: Server error
 */
router.put('/:uniqueId', async (req, res) => {
  try {
    const link = await updateLinkByUniqueId(req.params.uniqueId, req.body);
    res.json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /links/{uniqueId}:
 *   delete:
 *     summary: Delete a link by uniqueId
 *     tags: [Link]
 *     parameters:
 *       - in: path
 *         name: uniqueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the link
 *     responses:
 *       200:
 *         description: Link deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Link deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/:uniqueId', async (req, res) => {
  try {
    const link = await deleteLinkByUniqueId(req.params.uniqueId);
    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
