const mongoose = require('mongoose');
const uuid = require('uuid');


const categorySchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuid.v4 },
    categoryId: Number,
    categoryName: String,
    title: String,
    cat_id: Number,
    cat_name: String,
    rating: Number,
    sourceDB: String,
    parentId: {
        type: String,
        default: ''
      },
    questions: [{
        uniqueId: { type: String, default: uuid.v4 },
        quesId: Number,
        linkedCatId: Number,
        ques_id: Number,
        linked_cat_id: Number,
        ques: String,
        title: String,
        rating: Number,
        hidden: Boolean,
        answers: [{
            uniqueId: { type: String, default: uuid.v4 },
            ansId: Number,
            linkedCatId:Number,
            linkedQuesId:Number,
            ans_id: Number,
            answer: String,
            title: String,
            rating: Number
        }]
    }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;