const express = require('express');
const router = express.Router();
const {
    saveMemoryMap,
    updateMemoryMap,
    updateMemoryMapForGivenSkeleton,
    fetchAllMemoryMaps,
    fetchMemoryMapByUniqueId
} = require('./MemoryMap.service');

// Route to save a new MemoryMap
router.post('/', async (req, res) => {
    try {
        const memoryMap = await saveMemoryMap(req.body);
        res.status(201).json(memoryMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to update an existing MemoryMap by uniqueId
router.put('/:uniqueId', async (req, res) => {
    try {
        const memoryMap = await updateMemoryMap(req.params.uniqueId, req.body);
        res.status(200).json(memoryMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to update an existing MemoryMap by uniqueId, for given skeleton
router.put('/:uniqueId/append-skeleton', async (req, res) => {
    try {
        const memoryMap = await updateMemoryMapForGivenSkeleton(req.params.uniqueId, req.body);
        res.status(200).json(memoryMap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to fetch all MemoryMaps
router.get('/', async (req, res) => {
    try {
        const memoryMaps = await fetchAllMemoryMaps();
        res.status(200).json(memoryMaps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch a MemoryMap by uniqueId
router.get('/:uniqueId', async (req, res) => {
    try {
        const memoryMap = await fetchMemoryMapByUniqueId(req.params.uniqueId);
        res.status(200).json(memoryMap);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
