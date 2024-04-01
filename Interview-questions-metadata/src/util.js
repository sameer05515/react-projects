const fs = require('fs');
const path = require('path');
const marked = require('marked');

const publicFolderPath = path.join(__dirname, '../public');

const FileTraversalAPI = () => {

    // const publicFolderPath = path.join(__dirname, '../public');

    // Function to read files recursively and construct fileList array
    const createFileList = (dir, fileList = []) => {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const relativePath = path.relative(publicFolderPath, filePath);
            const stats = fs.statSync(filePath);
            if (!stats.isDirectory()) {
                fileList.push({
                    fileType: 'file',
                    name: relativePath,
                    path: relativePath
                });
            }
        });

        files.forEach(file => {
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
                    fileType: 'directory',
                    name: relativePath,
                    path: relativePath,
                    children: children // Include children array
                });
            }
        });
        return fileList;
    };



    const prepareQueue = (fileList, prevQueue = []) => {
        let queue = [...prevQueue];
        if (fileList && fileList.length > 0) {
            // Filter out files with fileType as directory
            const files = fileList.filter(file => file.fileType !== 'directory');
            if (files) {
                queue = [...queue, ...files]
            }

            fileList.filter(file => file.fileType === 'directory').forEach(dir => {
                const childQ = prepareQueue(dir.children, []);
                queue = [...queue, ...childQ];
            });
        }
        return queue;
    }


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
                queue.push(...currentFile.children.filter(file => file.fileType !== 'directory'));
            }
        }

        // If the filename is not found or if it's the last file in the list, return the first file object
        return files[0] || null;
        // return null;
    };

    const findPrevFileObject = (fileList, filename) => {
        const files = prepareQueue(fileList, []);
        // console.log("findPrevFileObject : " + files.length);
        const index = files.findIndex(file => file.name === filename);
        if (index >= 0) {
            return files[(index + files.length - 1) % files.length];
        } else {
            return null;
        }
    }

    // Set the 'selected' property for the selected file
    // const resetSelected = (list) => {
    //     if (list && list.length > 0) {
    //         // Set the 'selected' property for the selected file
    //         const selectedFile = list.find(file => file.path === filename && file.fileType === 'file');
    //         if (selectedFile) {
    //             selectedFile.selected = true;
    //         }
    //         list.forEach(file => {
    //             // file.selected = (file.path === filename && file.fileType === 'file');
    //             resetSelected(file.children);
    //         });
    //     }
    // }

    return { publicFolderPath, createFileList, findNextFileObject, findPrevFileObject };
};

const MarkdownReaderAPI = () => {
    // const publicFolderPath = path.join(__dirname, '../public');
    const getFileHtmlContent = (filePath) => {
        // console.log(`Vandana ka boor : ${filePath}`)
        try {
            const data = fs.readFileSync(
                path.join(publicFolderPath, filePath),
                "utf8"
            );
            return wrapHTMLContent(marked(data));
        } catch (err) {
            console.error("Error reading file:", err);
            return null;
        }
    };

    const wrapHTMLContent = (htmlContent) => {
        return `<div class="markdown-body"> ${htmlContent} </div>`;
    }

    return { getFileHtmlContent };
}

module.exports = {
    publicFolderPath,
    FileTraversalAPI,
    MarkdownReaderAPI,
};


/**================== Test API =====================*/
// const { publicFolderPath, createFileList, findNextFileObject } = FileTraversalAPI();
// const fileList = createFileList(publicFolderPath);
// console.log(JSON.stringify(fileList, null, 1));
// const filename = "version-control\\index.md";
// const nextFile = findNextFileObject(fileList, filename);
// console.log(`next file : ${JSON.stringify(nextFile)}`)