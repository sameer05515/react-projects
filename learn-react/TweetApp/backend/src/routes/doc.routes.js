// doc.routes.js

const express = require('express');
const router = express.Router();
const {
    getFileHtmlContent,
    wrapHTMLContent,
    isResourceAvailable,
    getCSSStyle,
} = require('./doc.service');

/**
 * @swagger
 * /help:
 *   get:
 *     summary: Serve documentation HTML for specified resource
 *     description: >
 *       Returns HTML-rendered content for documentation resources (such as index, guides, etc).  
 *       Optionally styles the HTML and chooses a .md (Markdown) file by resource name.
 *     tags:
 *       - Documentation
 *     parameters:
 *       - in: query
 *         name: resource
 *         schema:
 *           type: string
 *         required: false
 *         description: Name of the documentation resource (e.g., 'index', 'usage'). Defaults to 'index'.
 *       - in: query
 *         name: viewStyles
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional style name for rendering the HTML.
 *     responses:
 *       200:
 *         description: HTML for the requested documentation resource.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       404:
 *         description: Resource not found (served as HTML).
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
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
