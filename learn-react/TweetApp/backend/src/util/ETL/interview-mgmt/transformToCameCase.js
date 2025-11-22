const mongoose = require('mongoose');
const uuid = require('uuid');
const { transformCategoriesToCamelCase } = require('./transformToCamelCaseUtil');

// MongoDB connection configuration
mongoose.connect('mongodb://127.0.0.1:27017/test_intvw_mgmt_db', { useNewUrlParser: true, useUnifiedTopology: true });
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the schema for MongoDB
const categorySchema = new mongoose.Schema({
    uniqueId: { type: String, default: uuid.v4 },
    catId: Number,
    catName: String,
    cat_id: Number,
    cat_name: String,
    rating: Number,
    sourceDB: String,
    questions: [{
        uniqueId: { type: String, default: uuid.v4 },
        quesId: Number,
        linkedCatId: Number,
        ques_id: Number,
        linked_cat_id: Number,
        ques: String,
        rating: Number,
        hidden: Boolean,
        answers: [{
            uniqueId: { type: String, default: uuid.v4 },
            ansId: Number,
            ans_id: Number,
            answer: String,
            rating: Number
        }]
    }]
});

// Compile the schema into a model
const Category = mongoose.model('Category', categorySchema);

// Utility function to transform the data from the old schema to the new schema
async function transformData() {
    try {
        // Fetch data from the old schema
        const oldData = await Category.find({});

        // Transform and save data into the new schema
        const transformedData = transformCategoriesToCamelCase(oldData, uuid.v4);

        // Save transformed data into the new schema
        await Category.deleteMany({}); // Clear existing data
        await Category.insertMany(transformedData); // Insert transformed data
        console.log("Transformation completed successfully!");
    } catch (error) {
        console.error("Error transforming data:", error);
    }
}

// Call the transformation function
transformData();
