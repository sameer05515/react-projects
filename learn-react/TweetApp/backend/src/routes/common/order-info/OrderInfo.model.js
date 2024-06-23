const mongoose = require('mongoose');
const itemTypes = require('./itemTypes'); // Adjust the path as necessary

const orderInfoSchema = new mongoose.Schema({
    referenceId: { 
        type: String, 
        required: true 
    },  // This could be the referenceId for categories, questions, or answers.
    itemType: { 
        type: String, 
        required: true,
        enum: itemTypes  // Use the imported array here
    },  // Indicates the type of item ('Category', 'Question', 'Answer')
    orderedItemIds: [{ 
        type: String, 
        required: true 
    }]  // An array of IDs representing the ordered items
});

const OrderInfo = mongoose.model('OrderInfo', orderInfoSchema);

module.exports = OrderInfo;
