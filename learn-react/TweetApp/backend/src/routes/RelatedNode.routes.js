const express = require('express');
const router = express.Router();
const {
    saveRelatedNode,
    updateRelatedNode,
    fetchAllRelatedNodes,
    fetchRelatedNodeByUniqueId,
    updateRelationInConnectedNodes
} = require('./RelatedNode.service');

// Route to save a new RelatedNode
router.post('/', async (req, res) => {
    try {
        const relatedNode = await saveRelatedNode(req.body);
        res.status(201).json(relatedNode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to update an existing Node's relation and the other related node aasociated by withId
router.put('/upsert-relation', async (req, res) => {
    try {
        console.log('[RelatedNode.routes.js]: relationData: ',JSON.stringify(req.body));
        const relatedNode = await updateRelationInConnectedNodes(req.body);
        res.status(200).json(relatedNode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to update an existing RelatedNode by uniqueId
router.put('/:uniqueId', async (req, res) => {
    try {
        const relatedNode = await updateRelatedNode(req.params.uniqueId, req.body);
        res.status(200).json(relatedNode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// Route to fetch all RelatedNodes
router.get('/', async (req, res) => {
    try {
        const relatedNodes = await fetchAllRelatedNodes();
        res.status(200).json(relatedNodes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch a RelatedNode by uniqueId
router.get('/:uniqueId', async (req, res) => {
    try {
        const relatedNode = await fetchRelatedNodeByUniqueId(req.params.uniqueId);
        res.status(200).json(relatedNode);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
