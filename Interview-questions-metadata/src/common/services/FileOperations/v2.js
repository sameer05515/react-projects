const fs = require("fs");
const path = require("path");
const marked = require("marked");
const { PUBLIC_FOLDER_PATH: publicFolderPath } = require("../../../global-constants");

class FileRelatedOperations {
  static getFileExtension(filePath) {
    return path.extname(filePath).substring(1) || "text";
  }

  static fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  static readFileContent(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static readDirectory(dir, options) {
    return fs.readdirSync(dir, options);
  }

  static getFileStats(filePath) {
    return fs.statSync(filePath);
  }

  static concatParentDirectoryPath(parentDirPath, fileName) {
    return path.join(parentDirPath, fileName);
  }

  static getRelativePath(fromParentDirPath, toFullPath) {
    return path.relative(fromParentDirPath, toFullPath);
  }
}

const FileTraversalAPI = () => {
  const createFileList = (dir, fileList = []) => {
    const files = FileRelatedOperations.readDirectory(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      //   const filePath = FileRelatedOperations.concatParentDirectoryPath(publicFolderPath, file);
      const relativePath = path.relative(publicFolderPath, filePath);

      //   const relativePath = FileRelatedOperations.getRelativePath(publicFolderPath, filePath);

      const stats = FileRelatedOperations.getFileStats(filePath);

      if (!stats.isDirectory()) {
        fileList.push({ fileType: "file", name: relativePath, path: relativePath });
      }
    });

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(publicFolderPath, filePath);
      const stats = FileRelatedOperations.getFileStats(filePath);

      if (stats.isDirectory()) {
        const children = [];
        createFileList(filePath, children);
        fileList.push({ fileType: "directory", name: relativePath, path: relativePath, children });
      }
    });

    return fileList;
  };

  const prepareQueue = (fileList, prevQueue = []) => {
    let queue = [...prevQueue];

    if (fileList?.length) {
      const files = fileList.filter((file) => file.fileType !== "directory");
      queue = [...queue, ...files];

      fileList
        .filter((file) => file.fileType === "directory")
        .forEach((dir) => {
          queue = [...queue, ...prepareQueue(dir.children, [])];
        });
    }

    return queue;
  };

  const findNextFileObject = (fileList, filename) => {
    const files = prepareQueue(fileList);
    const queue = [...files];

    while (queue.length) {
      const currentFile = queue.shift();
      if (currentFile.path === filename) {
        return queue.shift() || files[0] || null;
      }

      if (currentFile.children?.length) {
        queue.push(...currentFile.children.filter((file) => file.fileType !== "directory"));
      }
    }

    return files[0] || null;
  };

  const findPrevFileObject = (fileList, filename) => {
    const files = prepareQueue(fileList);
    const index = files.findIndex((file) => file.name === filename);
    return index >= 0 ? files[(index + files.length - 1) % files.length] : null;
  };

  return { createFileList, findNextFileObject, findPrevFileObject };
};

const MarkdownReaderAPI = () => {
  const getFileHtmlContent = (filePath) => {
    try {
      const data = fs.readFileSync(path.join(publicFolderPath, filePath), "utf8");
      return wrapHTMLContent(marked(data));
    } catch (err) {
      console.error("Error reading file:", err);
      return null;
    }
  };

  const wrapHTMLContent = (htmlContent) => `<div class="markdown-body"> ${htmlContent} </div>`;

  return { getFileHtmlContent };
};

const ALLOWED_EXTENSIONS = ["md", "html", "text", "json", "tis", "yaml"];

class ContentMapping {
  constructor(filename, containingFolderPath, basePathMappingName) {
    this.slug = this.generateSlug(filename);
    this.fileLocation = path.join(containingFolderPath, filename);
    this.outputType = this.getOutputType(filename);
    this.basePathMappingName = basePathMappingName;
  }

  generateSlug(filename) {
    return filename
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  }

  getOutputType(filename) {
    const ext = path.extname(filename).substring(1);
    return ALLOWED_EXTENSIONS.includes(ext) ? ext : "text";
  }
}

class FileTraversalAPIV2 {
  static getFileNamesWithFolderPath(basePath, basePathMappingName) {    
    try {
      if (!FileRelatedOperations.fileExists(basePath)) {
        throw new Error(`Base path not found: ${basePath}`);
      }

      let fileMappings = [];
      const traverseDirectory = (dirPath) => {
        const files = FileRelatedOperations.readDirectory(dirPath, { withFileTypes: true });

        for (const file of files) {
          const fullPath = path.join(dirPath, file.name);

          if (file.isDirectory()) {
            traverseDirectory(fullPath);
          } else {
            const ext = FileRelatedOperations.getFileExtension(file.name);
            if (ALLOWED_EXTENSIONS.includes(ext)) {
              fileMappings.push(new ContentMapping(file.name, dirPath, basePathMappingName));
            }
          }
        }
      };

      traverseDirectory(basePath);
      return { data: fileMappings, isError: false, message: "Success" };
    } catch (error) {
      //   console.trace("[FileTraversalAPIV2]: [getFileNamesWithFolderPath]: ",error);
      return { data: [], isError: true, message: error.message || "Something went wrong" };
    }
  }
}

module.exports = { FileTraversalAPI, MarkdownReaderAPI, FileRelatedOperations, FileTraversalAPIV2 };
