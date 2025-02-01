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
    return fs.promises.readFile(filePath, "utf8");
  }

  static readDirectory(dir, options) {
    return fs.readdirSync(dir, options);
  }

  static getFileStats(filePath) {
    return fs.statSync(filePath);
  }
}

const FileTraversalAPI = () => {
  const createFileList = (dir) => {
    return FileRelatedOperations.readDirectory(dir).map((file) => {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(publicFolderPath, filePath);
      const stats = FileRelatedOperations.getFileStats(filePath);

      return stats.isDirectory()
        ? { fileType: "directory", name: relativePath, path: relativePath, children: createFileList(filePath) }
        : { fileType: "file", name: relativePath, path: relativePath };
    });
  };

  const prepareQueue = (fileList, prevQueue = []) => {
    return fileList.reduce(
      (queue, file) => [...queue, file, ...(file.children ? prepareQueue(file.children, []) : [])],
      prevQueue
    );
  };

  const findNextFileObject = (fileList, filename) => {
    const files = prepareQueue(fileList);
    const index = files.findIndex((file) => file.path === filename);
    return index >= 0 ? files[(index + 1) % files.length] : null;
  };

  const findPrevFileObject = (fileList, filename) => {
    const files = prepareQueue(fileList);
    const index = files.findIndex((file) => file.name === filename);
    return index >= 0 ? files[(index - 1 + files.length) % files.length] : null;
  };

  return { createFileList, findNextFileObject, findPrevFileObject };
};

const MarkdownReaderAPI = () => {
  const getFileHtmlContent = (filePath) => {
    try {
      const data = fs.readFileSync(path.join(publicFolderPath, filePath), "utf8");
      return `<div class="markdown-body">${marked(data)}</div>`;
    } catch (err) {
      console.error("Error reading file:", err);
      return null;
    }
  };

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
    return filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
  }

  getOutputType(filename) {
    const ext = path.extname(filename).substring(1);
    return ALLOWED_EXTENSIONS.includes(ext) ? ext : "text";
  }
}

class FileTraversalAPIV2 {
  static getFileNamesWithFolderPath(basePath, basePathMappingName) {
    if (!FileRelatedOperations.fileExists(basePath)) {
      return { data: [], isError: true, message: `Base path not found: ${basePath}` };
    }

    let fileMappings = [];

    const traverseDirectory = (dirPath) => {
      for (const file of FileRelatedOperations.readDirectory(dirPath, { withFileTypes: true })) {
        const fullPath = path.join(dirPath, file.name);

        if (file.isDirectory()) {
          traverseDirectory(fullPath);
        } else if (ALLOWED_EXTENSIONS.includes(FileRelatedOperations.getFileExtension(file.name))) {
          fileMappings.push(new ContentMapping(file.name, dirPath, basePathMappingName));
        }
      }
    };

    traverseDirectory(basePath);
    return { data: fileMappings, isError: false, message: "Success" };
  }
}

module.exports = { FileTraversalAPI, MarkdownReaderAPI, FileRelatedOperations, FileTraversalAPIV2 };
