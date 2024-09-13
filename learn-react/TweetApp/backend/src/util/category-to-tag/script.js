const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Category, Question } = require('../../routes/InterviewMgmt.v2.model'); // Adjust the path as necessary
const Tag = require('../../routes/Tag.model'); // Adjust the path as necessary

// 1. Create a tag for each category
async function createTagsForCategories() {
    const categories = await Category.find().exec();
    const tagCategoryMapping = {}; // Old Category ID -> New Tag ID

    for (const category of categories) {
        const newTag = new Tag({
            uniqueId: uuidv4(),
            name: category.name,
            description: `Tag for ${category.name} `,
            smartContent: category.smartContent, // Assuming you want to copy smartContent
            parentId: 'c1452f3d-e309-40a2-bb55-009f13551952', // Or whatever logic is required
        });

        const savedTag = await newTag.save();
        tagCategoryMapping[category.uniqueId] = savedTag.uniqueId;
    }

    return tagCategoryMapping;
}

// 2. Create a map for newTagId and oldCatId
async function mapTagsToCategories() {
    return await createTagsForCategories();
}

// 3. Update tags in Question
async function updateTagsInQuestions(tagCategoryMapping) {
    const questions = await Question.find().exec();

    for (const question of questions) {
        const newTagId = tagCategoryMapping[question.linkedCategoryId];
        if (newTagId) {
            question.tags = [newTagId];
            await question.save();
        }
    }
}

// 4. Verify that all questions have updated tags
async function verifyTagUpdates() {
    const questions = await Question.find().exec();
    let allUpdated = true;

    for (const question of questions) {
        if (!question.tags || question.tags.length === 0) {
            console.log(`Question with ID ${question.uniqueId} has no tags.`);
            allUpdated = false;
        }
    }

    if (allUpdated) {
        console.log('All questions have been updated with tags.');
    } else {
        console.log('Some questions are missing tags.');
    }
}

// Main function to run all steps sequentially
async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongodb_testiii', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        console.log('Step 1: Creating tags for categories...');
        const tagCategoryMapping = await mapTagsToCategories();

        console.log('Step 2: Updating tags in questions...');
        await updateTagsInQuestions(tagCategoryMapping);

        console.log('Step 3: Verifying updates...');
        await verifyTagUpdates();

        console.log('Process completed successfully.');
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        mongoose.connection.close();
    }
}

main();
