// doc.service.js

const fs = require('fs');
const path = require('path');
const marked = require('marked');

const helpRootFolderPath = path.join(__dirname, '../../resourses/help');
const avblResList = ['index', 'categories'];
const remoteCSSStyles = {
    dark: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.min.css',
    light: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown-light.min.css',
};

const getFileHtmlContent = (filePath) => {
    try {
        const data = fs.readFileSync(path.join(helpRootFolderPath, filePath), 'utf8');
        return marked(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
};

const wrapHTMLContent = (styleToApply, htmlContent) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="${styleToApply}" />
    </head>
    <body class="markdown-body">
        ${htmlContent}
    </body>
    </html>`;
};

const isResourceAvailable = (resource) => {
    return avblResList.includes(resource.toLowerCase());
};

const getCSSStyle = (viewStyles) => {
    return remoteCSSStyles[
        viewStyles && ['dark', 'light'].includes(viewStyles.trim().toLowerCase())
            ? viewStyles.trim().toLowerCase()
            : 'dark'
    ];
};

module.exports = {
    getFileHtmlContent,
    wrapHTMLContent,
    isResourceAvailable,
    getCSSStyle,
};
