const express = require("express");
const { FileTraversalAPI, MarkdownReaderAPI } = require("../../../../common/services/FileOperations/v3");
const { PUBLIC_FOLDER_PATH: publicFolderPath } = require("../../../../global-constants");

const { createFileList, findNextFileObject, findPrevFileObject } = FileTraversalAPI();
const { getFileHtmlContent } = MarkdownReaderAPI();

const router = express.Router();

/**
 * @swagger
 * /v1/pages/admin/content-details/itr1:
 *   get:
 *     summary: Render content details page with file tree
 *     description: Renders an HTML page with a file tree navigation and optionally displays a selected Markdown file. Supports next/previous file navigation.
 *     tags: [Content Details (v1)]
 *     parameters:
 *       - in: query
 *         name: filename
 *         required: false
 *         schema:
 *           type: string
 *         description: Name of the Markdown file to display
 *         example: "Difference-between-syntax-questions.md"
 *       - in: query
 *         name: direction
 *         required: false
 *         schema:
 *           type: string
 *           enum: [next, prev]
 *         description: Navigation direction to move to next or previous file
 *         example: "next"
 *     responses:
 *       200:
 *         description: Successfully rendered content details page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               description: HTML page with file tree and content
 */
router.get("/content-details/itr1", (req, res) => {
  const fileList = createFileList(publicFolderPath);
  let htmlContent = null;
  let { filename, direction } = req.query;

  if (filename) {
    // Handle navigation direction, if specified
    if (direction === "next") {
      const nextFile = findNextFileObject(fileList, filename);
      if (nextFile?.name) filename = nextFile.name;
    } else if (direction === "prev") {
      const prevFile = findPrevFileObject(fileList, filename);
      if (prevFile?.name) filename = prevFile.name;
    }

    try {
      htmlContent = getFileHtmlContent(filename);

      // Recursively mark the selected file in the list
      (function setSelected(list) {
        if (Array.isArray(list)) {
          list.forEach((file) => {
            if (file.path === filename && file.fileType === "file") {
              file.selected = true;
            } else {
              file.selected = false;
            }
            if (Array.isArray(file.children)) setSelected(file.children);
          });
        }
      })(fileList);

    } catch (err) {
      console.error("Error reading file:", err);
    }
  }

  res.render("content-details/v1", {
    fileList,
    htmlContent,
    filename,
    direction,
    contentDetailsNavigationAPIUri: "/v1/pages/admin/content-details/itr1",
  });
});

module.exports = router;
