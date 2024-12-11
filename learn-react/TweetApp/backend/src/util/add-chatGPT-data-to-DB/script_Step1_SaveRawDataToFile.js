const fs = require("fs").promises; // Use promises API for fs
const { v4: uuidv4 } = require("uuid");
const { CGPTFileNames } = require("./constants");
const { fetchJsonData } = require("./util");

const outputFolderLocation = "D:/GIT/my-backup/ChatGPTNormalizedData";

// Function to save data to a file
const saveToFile = async (data, fileName) => {
    const jsonData = JSON.stringify(data, null, 2); // Format JSON with indentation

    const outputFile = `${outputFolderLocation}/ND_${fileName}.json`;

    try {
        // Write the JSON string to the file
        await fs.writeFile(outputFile, jsonData);
        console.log(`File saved successfully at: ${outputFile}`);
    } catch (error) {
        console.error("Error saving file:", error);
    }
};

// 1. Save hardcoded ChatGPT file names
async function saveHardcodedChatGPTFileNames() {
    try {
        for (const category of CGPTFileNames) {
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
            chatGPTFileObject.conversations = conversations;
            chatGPTFileObject.messages = messages;

            await saveToFile(chatGPTFileObject, category.name);
        }
    } catch (err) {
        console.error("Error in saveHardcodedChatGPTFileNames:", err);
    }
}

// Fetch and save conversations and messages
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

// Main function
async function main() {
    let processCompletedSuccessfully = false;
    try {
        console.log("Starting Normalization Process.");

        console.log("Step 1: Save hardcoded chatGPT file names...");
        await saveHardcodedChatGPTFileNames();

        console.log("Process completed successfully.");
        processCompletedSuccessfully = true;
    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        console.log(
            "Normalization process completed. Status: " +
            (processCompletedSuccessfully ? "Success" : "Error")
        );
    }
}

main();
