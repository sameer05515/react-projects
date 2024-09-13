const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');
const { MemoryMap } = require('../../routes/MemoryMap.model'); // Adjust the path as necessary


// 1. Update skeletonTextType in MemoryMap
async function updateTagsInMemoryMaps() {
    const memoryMaps = await MemoryMap.find().exec();

    for (const memoryMap of memoryMaps) {
        memoryMap.skeletonTextType = "indented-string";
        await memoryMap.save();
    }
}


// 2. Verify that all memoryMaps have updated skeletonTextTypes
async function verifyTagUpdates() {
    const memoryMaps = await MemoryMap.find().exec();
    let allUpdated = true;

    for (const memoryMap of memoryMaps) {
        if (!memoryMap.skeletonTextType || memoryMap.skeletonTextType !== "indented-string") {
            console.log(`MemoryMap with ID ${memoryMap.uniqueId} has no skeletonTextType.`);
            allUpdated = false;
        }
    }

    if (allUpdated) {
        console.log('All memoryMaps have been updated with skeletonTextTypes.');
    } else {
        console.log('Some memoryMaps are missing skeletonTextTypes.');
    }
}



// Main function to run all steps sequentially
async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongodb_testiii', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // console.log('Step 1: Creating skeletonTextTypes for categories...');
        // const tagCategoryMapping = await mapTagsToCategories();

        console.log('Step 1: Updating skeletonTextType in MemoryMaps...');
        await updateTagsInMemoryMaps();

        console.log('Step 2: Verifying updates...');
        await verifyTagUpdates();

        console.log('Process completed successfully.');
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        mongoose.connection.close();
    }
}

main();