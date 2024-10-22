const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { CGPTFile, CGPTConversation, CGPTMessage } = require('../../routes/ChatGPTConversation.model'); 
const {CGPTFileNames} = require('./constants');
const {fetchJsonData} = require('./util')

const metadata = {
    dateOfExecution:'23-Oct-2023',
    purpose: `convert 
    1. Raw chatGPT file names to json object and save in DB with empty array of 'smartContent'
    2. Raw ChatGPT conversation objects to a formaated json object and save in DB with empty array of 'smartContent'
    3. Raw ChatGPT message objects to a formaated json object and save in DB with its message.text in first element of array of 'smartContent'
    `,
    steps: `
    Plan of Execution
    1. Take backup of all collections
    2. Save hardcoded chatGPT file names
    2. Fetch all conversations for a chatGPT file
    3. Convert Raw ChatGPT conversation objects to a formaated json object and save in DB with empty array of 'smartContent'
    3.1. Convert Raw ChatGPT message objects to a formaated json object and save in DB with its message.text in first element of array of 'smartContent'
    4. Verify changes
    `,
    postChangeActivities: `
    Make proper UI changes for the above activity
    Raise PR and commit changes
    `
};

// 1. Save hardcoded chatGPT file names
async function saveHardcodedChatGPTFileNames() {
    // const tagCategoryMapping = {}; // Old Category ID -> New Tag ID

    for (const category of CGPTFileNames) {
        const newTag = new CGPTFile({
            uniqueId: uuidv4(),
            name: category.name,
            location: category.location,
            descriptions: [],
            heading: category.name, // Assuming you want to copy smartContent
            parentId: '', // Or whatever logic is required
            createdDate:category.createdDate,
            isLatest:category.isLatest
        });

        const savedTag = await newTag.save();
        fetchandSaveConvAndMessages(savedTag);

        // tagCategoryMapping[category.uniqueId] = savedTag.uniqueId;
    }

    // return tagCategoryMapping;
}

async function fetchandSaveConvAndMessages(savedTag){
    const convArr=await fetchJsonData(savedTag.location);

    for(const conv of convArr){
        const newConv= new CGPTConversation({
            uniqueId: uuidv4(),
            name: conv.name,
            createdDate:conv.createdOn,
            updatedDate: conv.updatedOn,
            descriptions: [],
            heading: conv.name, // Assuming you want to copy smartContent
            parentId: '', // Or whatever logic is required
            linkedCGPTFileId: savedTag.uniqueId
        });

        const savedConv = await newConv.save();

    }
}

// async function saveMessages()




// Main function to run all steps sequentially
async function main() {
    await mongoose.connect('mongodb://localhost:27017/chat_gpt_normalized_data', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        console.log('Step 1: Save hardcoded chatGPT file names...');
        await saveHardcodedChatGPTFileNames();

        // console.log('Step 2: Updating tags in questions...');
        // await updateTagsInQuestions(tagCategoryMapping);

        // console.log('Step 3: Verifying updates...');
        // await verifyTagUpdates();

        console.log('Process completed successfully.');
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        mongoose.connection.close();
    }
}

main();