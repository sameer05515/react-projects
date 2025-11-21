const fs = require("fs");
const path = require("path");
const marked = require("marked");
const { PUBLIC_FOLDER_PATH: publicFolderPath } = require("../../../global-constants");

const ALLOWED_EXTENSIONS = ["md", "html", "text", "json", "tis", "yaml"];

class FileRelatedOperations {
  static getFileExtension(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return ext ? ext.slice(1) : "text";
  }

  static fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  static async readFileContent(filePath) {
    return fs.promises.readFile(filePath, "utf8");
  }

  static readDirectory(dir, options = undefined) {
    return fs.readdirSync(dir, options);
  }

  static getFileStats(filePath) {
    return fs.statSync(filePath);
  }
}

/**
 * Traversal and navigation utilities for file structures.
 */
const FileTraversalAPI = () => {
  /**
   * Recursively builds a file/directory list, using relative public paths.
   */
  const createFileList = (dir) => {
    return FileRelatedOperations.readDirectory(dir).map((item) => {
      const filePath = path.join(dir, item);
      const relativePath = path.relative(publicFolderPath, filePath);
      const stats = FileRelatedOperations.getFileStats(filePath);

      if (stats.isDirectory()) {
        return {
          fileType: "directory",
          name: relativePath,
          path: relativePath,
          children: createFileList(filePath),
        };
      }
      return {
        fileType: "file",
        name: relativePath,
        path: relativePath,
      };
    });
  };

  /**
   * Flattens a file list tree to a queue for sequential navigation.
   */
  const prepareQueue = (fileList) => {
    let queue = [];
    fileList.forEach((file) => {
      queue.push(file);
      if (file.children) {
        queue = queue.concat(prepareQueue(file.children));
      }
    });
    return queue;
  };

  /**
   * Finds the next file object for navigation.
   * Wraps around if at end.
   */
  const findNextFileObject = (fileList, filename) => {
    const files = prepareQueue(fileList).filter((f) => f.fileType === "file");
    const index = files.findIndex((file) => file.path === filename);
    if (index === -1 || files.length === 0) return null;
    return files[(index + 1) % files.length];
  };

  /**
   * Finds the previous file object for navigation.
   * Wraps around if at start.
   */
  const findPrevFileObject = (fileList, filename) => {
    const files = prepareQueue(fileList).filter((f) => f.fileType === "file");
    const index = files.findIndex((file) => file.path === filename);
    if (index === -1 || files.length === 0) return null;
    return files[(index - 1 + files.length) % files.length];
  };

  return { createFileList, findNextFileObject, findPrevFileObject };
};

const MarkdownReaderAPI = () => {
  /**
   * Reads and parses a markdown file to HTML, optionally styled.
   * Returns `null` if file can't be read.
   */
  const getFileHtmlContent = (filePath) => {
    try {
      const fullPath = path.join(publicFolderPath, filePath);
      if (!fs.existsSync(fullPath)) {
        return null;
      }
      const data = fs.readFileSync(fullPath, "utf8");
      return `<div class="markdown-body">${marked.parse(data)}</div>`;
    } catch (err) {
      console.error("Error reading file:", err);
      return null;
    }
  };

  return { getFileHtmlContent };
};

/**
 * Represents a mapping for file meta info for API v2 traversal.
 */
class ContentMapping {
  constructor(filename, containingFolderPath, basePathMappingName) {
    this.slug = ContentMapping.generateSlug(filename);
    this.fileLocation = path.join(containingFolderPath, filename);
    this.outputType = ContentMapping.getOutputType(filename);
    this.basePathMappingName = basePathMappingName;
  }

  static generateSlug(filename) {
    // Generate a clean, URL-friendly, lower-cased slug (including extension)
    return filename.replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-\.]/g, "")
      .toLowerCase();
  }

  static getOutputType(filename) {
    const ext = path.extname(filename).slice(1).toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext) ? ext : "text";
  }
}

/**
 * Traversal API for returning v2 (API-ready) file listings.
 */
class FileTraversalAPIV2 {
  static getFileNamesWithFolderPath(basePath, basePathMappingName) {
    if (!FileRelatedOperations.fileExists(basePath)) {
      return {
        data: [],
        isError: true,
        message: `Base path not found: ${basePath}`,
      };
    }
    const fileMappings = [];

    const traverseDirectory = (dirPath) => {
      // {withFileTypes: true} returns Dirent objects
      FileRelatedOperations.readDirectory(dirPath, { withFileTypes: true }).forEach((file) => {
        const fullPath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
          traverseDirectory(fullPath);
        } else {
          // Only consider allowed extension files
          if (ALLOWED_EXTENSIONS.includes(FileRelatedOperations.getFileExtension(file.name))) {
            fileMappings.push(new ContentMapping(file.name, dirPath, basePathMappingName));
          }
        }
      });
    };

    traverseDirectory(basePath);

    return {
      data: fileMappings,
      isError: false,
      message: "Success",
    };
  }
}

module.exports = {
  FileTraversalAPI,
  MarkdownReaderAPI,
  FileRelatedOperations,
  FileTraversalAPIV2,
};
