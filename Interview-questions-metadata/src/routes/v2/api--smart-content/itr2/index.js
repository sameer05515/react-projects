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
 *
 * Internal routes, just to help for development process in v2 apis.
 *
 * Later these apis will only be accesible to admin role user, post we implement RBAC
 *
 * */
router.get("/smart-content/itr2/contentMappings", (req, res) => res.json([...SampleContentMappings]));

module.exports = router;
