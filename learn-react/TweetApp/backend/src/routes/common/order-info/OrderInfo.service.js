// services/orderInfo.service.js
const OrderInfo = require('./OrderInfo.model'); // Adjust the path as necessary

// Upsert order information for a given referenceId and itemType
const upsertOrderInfo = async (referenceId, itemType, orderedItemIds) => {
    return OrderInfo.findOneAndUpdate(
        { referenceId, itemType },
        { $set: { orderedItemIds } },
        { upsert: true, new: true }
    );
};

// Find order information by referenceId
const findByReferenceId = async (referenceId) => {
    return OrderInfo.find({ referenceId });
};

module.exports = {
    upsertOrderInfo,
    findByReferenceId
};
