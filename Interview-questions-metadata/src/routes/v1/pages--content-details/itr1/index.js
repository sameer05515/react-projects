const express = require("express");
const { FileTraversalAPI, MarkdownReaderAPI } = require("../../../../common/services/FileOperations/v3");
const { PUBLIC_FOLDER_PATH: publicFolderPath } = require("../../../../global-constants");

const { createFileList, findNextFileObject, findPrevFileObject } = FileTraversalAPI();
const { getFileHtmlContent } = MarkdownReaderAPI();

// ===== ROUTER CODE in below

const router = express.Router();
// Route to render the file list and optionally render selected MD file as HTML

// const getContentDetails=()

router.get("/content-details/itr1", (req, res) => {
  //   console.log("[pages--content-details]: Recieved request");

  const fileList = createFileList(publicFolderPath);
  let htmlContent = null;

  let filename = req.query.filename;
  const direction = req.query.direction;

  // Check if a specific MD file is requested
  if (req.query.filename) {
    if (req.query.direction && req.query.direction === "next") {
      const nextFile = findNextFileObject(fileList, filename);
      const nextFileName = nextFile && nextFile.name ? nextFile.name : null;
      if (nextFileName) {
        filename = nextFileName;
      }
    } else if (req.query.direction && req.query.direction === "prev") {
      const prevFile = findPrevFileObject(fileList, filename);
      const prevFileName = prevFile && prevFile.name ? prevFile.name : null;
      if (prevFileName) {
        filename = prevFileName;
      }
    }

    try {
      htmlContent = getFileHtmlContent(filename);
      const resetSelected = (list) => {
        if (list && list.length > 0) {
          // Set the 'selected' property for the selected file
          const selectedFile = list.find((file) => file.path === filename && file.fileType === "file");
          if (selectedFile) {
            selectedFile.selected = true;
          }
          list.forEach((file) => {
            // file.selected = (file.path === filename && file.fileType === 'file');
            resetSelected(file.children);
          });
        }
      };
      // Set the 'selected' property for the selected file
      resetSelected(fileList);
    } catch (err) {
      console.error("Error reading file:", err);
    }
  }

  // res.render('index', { fileList, htmlContent, filename, direction });
  const viewPageUri = "content-details/v1";
  const contentDetailsNavigationAPIUri = "/v1/pages/admin/content-details/itr1";
  res.render(viewPageUri, {
    fileList,
    htmlContent,
    filename,
    direction,
    contentDetailsNavigationAPIUri,
  });
});

module.exports = router;
