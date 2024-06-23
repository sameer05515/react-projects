// routes/orderInfo.routes.js
const express = require('express');
const router = express.Router();
const orderInfoService = require('./OrderInfo.service');

// Upsert order information
router.post('/upsert', async (req, res) => {
    try {
        const { referenceId, itemType, orderedItemIds } = req.body;
        const orderInfo = await orderInfoService.upsertOrderInfo(referenceId, itemType, orderedItemIds);
        res.status(200).json(orderInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error upserting order information', error });
    }
});

// Find order information by referenceId
router.get('/find/:referenceId', async (req, res) => {
    try {
        const { referenceId } = req.params;
        const orderInfo = await orderInfoService.findByReferenceId(referenceId);
        res.status(200).json(orderInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error finding order information', error });
    }
});

module.exports = router;
