const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const {
    CGPTFile,
    CGPTConversation,
    CGPTMessage,
} = require("../../routes/ChatGPTConversation.model");
const { CGPTFileNames } = require("./constants");
const { fetchJsonData } = require("./util");
const fs = require("fs").promises; // Use promises API for fs

const metadata = {
    dateOfExecution: "23-Oct-2023",
    purpose: `convert 
    1. Raw chatGPT file names to json object and save in DB with empty array of 'smartContent'
    2. Raw ChatGPT conversation objects to a formatted json object and save in DB with empty array of 'smartContent'
    3. Raw ChatGPT message objects to a formatted json object and save in DB with its message.text in first element of array of 'smartContent'
    `,
    steps: `
    Plan of Execution
    1. Take backup of all collections
    2. Save hardcoded chatGPT file names
    2. Fetch all conversations for a chatGPT file
    3. Convert Raw ChatGPT conversation objects to a formatted json object and save in DB with empty array of 'smartContent'
    3.1. Convert Raw ChatGPT message objects to a formatted json object and save in DB with its message.text in first element of array of 'smartContent'
    4. Verify changes
    `,
    postChangeActivities: `
    Make proper UI changes for the above activity
    Raise PR and commit changes
    `,
};

const outputFolderLocation = "D:/GIT/my-backup/ChatGPTNormalizedData";


// Function to read a JSON file
const readJsonFile = async (fileName) => {

    const outputFile = `${outputFolderLocation}/ND_${fileName}.json`;

    try {
        // Read file contents
        const data = await fs.readFile(outputFile);

        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Return the parsed data
        return jsonData;
    } catch (error) {
        console.error("Error reading JSON file:", error);
        throw error; // Re-throw error for further handling if needed
    }
};

// 1. Save hardcoded chatGPT file names
async function saveHardcodedChatGPTFileNames() {
    try {
        for (const category of CGPTFileNames.filter(c=>c.isLatest)) {
            // const data = await readJsonFile(category.name);
            const chatGPTFileObject = {
                uniqueId: category.name,
                name: category.name,
                heading: category.name,
                location: category.location,
                descriptions: [],                
                parentId: "",
                createdDate: category.createdDate,
                isLatest: category.isLatest,
            };
            const { conversations, messages } = await fetchandSaveConvAndMessages(category.location,category.name);
            // chatGPTFileObject.conversations = conversations;
            // chatGPTFileObject.messages = messages;

            const newTag = new CGPTFile({
                // uniqueId: uuidv4(),
                // name: category.name,
                // location: category.location,
                // descriptions: [],
                // heading: category.name, // Assuming you want to copy smartContent
                // parentId: "", // Or whatever logic is required
                // createdDate: category.createdDate,
                // isLatest: category.isLatest,
                ...chatGPTFileObject
            });

            const savedTag = await newTag.save();
            await CGPTConversation.insertMany(conversations);
            await CGPTMessage.insertMany(messages);
            // await fetchandSaveConvAndMessages(savedTag);
            console.log(`Data saved successfully at: ${savedTag.name}`);
        }
    } catch (err) {
        console.error("Error in saveHardcodedChatGPTFileNames:", err);
    }
}

async function fetchandSaveConvAndMessages(location,linkedCGPTFileId) {
    let normalizedConvArr = [];
    let normalizedMessages = [];

    try {
        const convArr = await fetchJsonData(location);
        let order = 0;

        for (const conv of convArr) {
            const newConv = {
                // uniqueId: uuidv4(),
                uniqueId: conv.uniqueId,
                name: conv.name,
                createdDate: conv.createdOn,
                updatedDate: conv.updatedOn,
                linkedCGPTFileId:linkedCGPTFileId,
                descriptions: [],
                heading: conv.name,
                parentId: "",
                order: ++order
            };

            normalizedConvArr.push(newConv);

            const convMessages = saveMessages(newConv.uniqueId, conv.messages, linkedCGPTFileId);
            normalizedMessages.push(...convMessages); // Append messages
        }
    } catch (err) {
        console.error("Error in fetchandSaveConvAndMessages:", err);
        return { conversations: [], messages: [] };
    }
    return { conversations: normalizedConvArr, messages: normalizedMessages };
}

// Save messages
function saveMessages(linkedCGPTConvId, messages, linkedCGPTFileId) {
    let normalizedMessages = [];

    try {
        let order = 0;

        for (const msg of messages) {
            const newMsg = {
                // uniqueId: uuidv4(),
                uniqueId: msg.uniqueId,
                name: msg.uniqueId + "_" + linkedCGPTConvId,
                author: msg.author,
                linkedCGPTConvId: linkedCGPTConvId,
                linkedCGPTFileId:linkedCGPTFileId,
                descriptions: [
                    {
                        content: msg.text,
                        textOutputType: "markdown",
                        textInputType: "TextArea",
                    },
                ],
                order: ++order
            };

            normalizedMessages.push(newMsg);
        }
    } catch (err) {
        console.error("Error in saveMessages:", err);
    }

    return normalizedMessages; // Return the normalized messages
}

async function main() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(
            "mongodb://localhost:27017/chat_gpt_normalized_data",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB connected.");

        console.log("Step 1: Save hardcoded chatGPT file names...");
        await saveHardcodedChatGPTFileNames();

        console.log("Process completed successfully.");
    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
}

main();
