const express = require('express');
const path = require('path');
const { publicFolderPath, FileTraversalAPI, MarkdownReaderAPI } = require('./util');

const { createFileList, findNextFileObject, findPrevFileObject } = FileTraversalAPI();
const { getFileHtmlContent } = MarkdownReaderAPI();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to render the file list and optionally render selected MD file as HTML
app.get('/', (req, res) => {
    const fileList = createFileList(publicFolderPath);
    let htmlContent = null;

    let filename = req.query.filename;
    const direction = req.query.direction;

    // Check if a specific MD file is requested
    if (req.query.filename) {

        if (req.query.direction && req.query.direction === 'next') {
            const nextFile = findNextFileObject(fileList, filename);
            const nextFileName = nextFile && nextFile.name ? nextFile.name : null;
            if (nextFileName) {
                filename = nextFileName;
            }
        } else if (req.query.direction && req.query.direction === 'prev') {
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
                    const selectedFile = list.find(file => file.path === filename && file.fileType === 'file');
                    if (selectedFile) {
                        selectedFile.selected = true;
                    }
                    list.forEach(file => {
                        // file.selected = (file.path === filename && file.fileType === 'file');
                        resetSelected(file.children);
                    });
                }
            }
            // Set the 'selected' property for the selected file
            resetSelected(fileList);

        } catch (err) {
            console.error('Error reading file:', err);
        }
    }

    res.render('index', { fileList, htmlContent, filename, direction });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
