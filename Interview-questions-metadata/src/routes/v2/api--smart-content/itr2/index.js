const express = require("express");
const { FileTraversalAPIV2: FileTraversalAPI } = require("../../../../common/services/FileOperations/v3");
const BasePathMappings = [
  {
    name: "My-questions",
    basePath: "D:\\GIT\\react-projects\\Interview-questions-metadata\\public",
  },
];

/**
 * Saare base folders traverse karke ek consolidated mapping prepare karega.
 */
const prepareContentMappings = () => {
  let mappings = [];

  for (let bpm of BasePathMappings) {
    const result = FileTraversalAPI.getFileNamesWithFolderPath(bpm.basePath, bpm.name);
    if (!result.isError) {
      mappings = mappings.concat(result.data);
    } else {
      console.error(`Error in ${bpm.name}:`, result.message);
    }
  }

  return mappings;
};

const SampleContentMappings = prepareContentMappings();

//==========================

const router = express.Router();

/**
 * @swagger
 * /v2/api/smart-content/itr2/contentMappings:
 *   get:
 *     summary: Get dynamically generated content mappings
 *     description: Retrieve content mappings that are automatically generated from base path configurations. This endpoint uses the FileTraversalAPI to scan directories and build mappings dynamically.
 *     tags: [Content Mappings]
 *     responses:
 *       200:
 *         description: Successfully retrieved dynamically generated content mappings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContentMapping'
 *             example:
 *               - slug: "my-questions--java--index-md"
 *                 name: "Java Index"
 *                 fileLocation: "/path/to/java/index.md"
 */
router.get("/smart-content/itr2/contentMappings", (req, res) => res.json([...SampleContentMappings]));

module.exports = router;
