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
        for (const category of CGPTFileNames.filter(d=>d.isLatest)) {
            const data = await readJsonFile(category.name);
            const newTag = new CGPTFile({
                // uniqueId: uuidv4(),
                // name: category.name,
                // location: category.location,
                // descriptions: [],
                // heading: category.name, // Assuming you want to copy smartContent
                // parentId: "", // Or whatever logic is required
                // createdDate: category.createdDate,
                // isLatest: category.isLatest,
                ...data
            });

            const savedTag = await newTag.save();
            // await fetchandSaveConvAndMessages(savedTag);
            console.log(`Data saved successfully at: ${savedTag.name}`);
        }
    } catch (err) {
        console.error("Error in saveHardcodedChatGPTFileNames:", err);
    }
}

// async function fetchandSaveConvAndMessages(savedTag) {
//     try {
//         const convArr = await fetchJsonData(savedTag.location);
//         for (const conv of convArr) {
//             const newConv = new CGPTConversation({
//                 uniqueId: uuidv4(),
//                 name: conv.name,
//                 createdDate: conv.createdOn,
//                 updatedDate: conv.updatedOn,
//                 descriptions: [],
//                 heading: conv.name, // Assuming you want to copy smartContent
//                 parentId: "", // Or whatever logic is required
//                 linkedCGPTFileId: savedTag.uniqueId,
//             });
//             const savedConv = await newConv.save();
//             await saveMessages(savedConv, conv.messages);
//         }
//     } catch (err) {
//         console.error("Error in fetchandSaveConvAndMessages:", err);
//     }
// }

// async function saveMessages(savedConv, messages) {
//     try {
//         for (const msg of messages) {
//             const newMsg = new CGPTMessage({
//                 uniqueId: uuidv4(),
//                 oldId: msg.oldId,
//                 name: msg.oldId + "_" + savedConv.uniqueId,
//                 author: msg.author,
//                 linkedCGPTConvId: savedConv.uniqueId,
//                 descriptions: [
//                     {
//                         content: msg.text,
//                         textOutputType: "markdown",
//                         textInputType: "TextArea",
//                     },
//                 ],
//             });
//             await newMsg.save();
//         }
//     } catch (err) {
//         console.error("Error in fetchandSaveConvAndMessages:", err);
//     }
// }

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
