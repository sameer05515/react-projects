// doc.routes.js

const express = require('express');
const router = express.Router();
const {
    getFileHtmlContent,
    wrapHTMLContent,
    isResourceAvailable,
    getCSSStyle,
} = require('./doc.service');

// Endpoint for /help?out=html
router.get('/help', (req, res) => {
    const { resource, viewStyles } = req.query;
    const fileName = resource || 'index';
    const styleToApply = getCSSStyle(viewStyles);

    // console.log(`styleToApply : ${styleToApply}`);

    if (isResourceAvailable(fileName)) {
        const htmlContent = getFileHtmlContent(`${fileName}.md`);
        res.send(wrapHTMLContent(styleToApply, htmlContent));
    } else {
        const htmlContent = `<div>
                                Requested resource <b>${fileName}</b> not available! <br/>
                                <a href="/help">Back to documentation </a>
                            </div>`;
        res.send(wrapHTMLContent(styleToApply, htmlContent));
    }
});

module.exports = router;
