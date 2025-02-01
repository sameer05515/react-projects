const fs = require("fs");
const path = require("path");
const marked = require("marked");
const { PUBLIC_FOLDER_PATH: publicFolderPath } = require("../../../global-constants");

const FileTraversalAPI = () => {
  // Function to read files recursively and construct fileList array
  const createFileList = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(publicFolderPath, filePath);
      const stats = fs.statSync(filePath);
      if (!stats.isDirectory()) {
        fileList.push({
          fileType: "file",
          name: relativePath,
          path: relativePath,
        });
      }
    });

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(publicFolderPath, filePath);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        // Initialize an empty array to store children
        const children = [];
        // Recursively process children of the directory
        createFileList(filePath, children);
        // Add directory to file list with its children
        fileList.push({
          fileType: "directory",
          name: relativePath,
          path: relativePath,
          children: children, // Include children array
        });
      }
    });
    return fileList;
  };

  const prepareQueue = (fileList, prevQueue = []) => {
    let queue = [...prevQueue];
    if (fileList && fileList.length > 0) {
      // Filter out files with fileType as directory
      const files = fileList.filter((file) => file.fileType !== "directory");
      if (files) {
        queue = [...queue, ...files];
      }

      fileList
        .filter((file) => file.fileType === "directory")
        .forEach((dir) => {
          const childQ = prepareQueue(dir.children, []);
          queue = [...queue, ...childQ];
        });
    }
    return queue;
  };

  const findNextFileObject = (fileList, filename) => {
    // Filter out files with fileType as directory
    const files = prepareQueue(fileList, []);

    // Initialize a queue for BFS traversal with filtered files
    const queue = [...files];

    // Perform BFS traversal
    while (queue.length > 0) {
      // Dequeue the first file object from the queue
      const currentFile = queue.shift();

      // Check if the current file object matches the specified filename
      if (currentFile.path === filename) {
        // If the current file object matches the filename, return the next file object in the queue
        return queue.shift() || files[0] || null;
      }

      // If the current file object has children, enqueue them for further traversal
      if (currentFile.children && currentFile.children.length > 0) {
        queue.push(...currentFile.children.filter((file) => file.fileType !== "directory"));
      }
    }

    // If the filename is not found or if it's the last file in the list, return the first file object
    return files[0] || null;
    // return null;
  };

  const findPrevFileObject = (fileList, filename) => {
    const files = prepareQueue(fileList, []);
    // console.log("findPrevFileObject : " + files.length);
    const index = files.findIndex((file) => file.name === filename);
    if (index >= 0) {
      return files[(index + files.length - 1) % files.length];
    } else {
      return null;
    }
  };

  return { createFileList, findNextFileObject, findPrevFileObject };
};

const MarkdownReaderAPI = () => {
  // const publicFolderPath = path.join(__dirname, '../public');
  const getFileHtmlContent = (filePath) => {
    try {
      const data = fs.readFileSync(path.join(publicFolderPath, filePath), "utf8");
      return wrapHTMLContent(marked(data));
    } catch (err) {
      console.error("Error reading file:", err);
      return null;
    }
  };

  const wrapHTMLContent = (htmlContent) => {
    return `<div class="markdown-body"> ${htmlContent} </div>`;
  };

  return { getFileHtmlContent };
};

class FileRelatedOperations {
  // Function to get the file extension
  static getFileExtension = (filePath) => {
    return path.extname(filePath).substring(1) || "text";
  };

  // Function to check if a file exists
  static fileExists = (filePath) => fs.existsSync(filePath);

  // Function to read file content asynchronously
  static readFileContent = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };
}

//=====================================
/** Allowed file extensions */
const ALLOWED_EXTENSIONS = ["md", "html", "text", "json", "tis", "yaml"];

/**
 * ContentMapping class har ek file ka metadata hold karega.
 */
class ContentMapping {
  constructor(filename, containingFolderPath, basePathMappingName) {
    this.slug = this.generateSlug(filename);
    this.fileLocation = path.join(containingFolderPath, filename);
    this.outputType = this.getOutputType(filename);
    this.basePathMappingName = basePathMappingName;
  }

  /** Slug generate karega file ke naam se */
  generateSlug(filename) {
    return filename
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  }

  /** File extension ke basis pe outputType assign karega */
  getOutputType(filename) {
    const ext = path.extname(filename).substring(1);
    return ALLOWED_EXTENSIONS.includes(ext) ? ext : "text";
  }
}

/**
 * FileTraversalAPI ek given basePath ko traverse karega aur valid files ko return karega.
 */
class FileTraversalAPIV2 {
  static getFileNamesWithFolderPath(basePath, basePathMappingName) {
    try {
      if (!fs.existsSync(basePath)) {
        throw new Error(`Base path not found: ${basePath}`);
      }

      let fileMappings = [];
      const traverseDirectory = (dirPath) => {
        const files = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const file of files) {
          const fullPath = path.join(dirPath, file.name);

          if (file.isDirectory()) {
            traverseDirectory(fullPath);
          } else {
            const ext = path.extname(file.name).substring(1);
            if (ALLOWED_EXTENSIONS.includes(ext)) {
              fileMappings.push(new ContentMapping(file.name, dirPath, basePathMappingName));
            }
          }
        }
      };

      traverseDirectory(basePath);
      return { data: fileMappings, isError: false, message: "Success" };
    } catch (error) {
      return { data: [], isError: true, message: error.message || "Something went wrong" };
    }
  }
}

module.exports = { FileTraversalAPI, MarkdownReaderAPI, FileRelatedOperations, FileTraversalAPIV2 };
