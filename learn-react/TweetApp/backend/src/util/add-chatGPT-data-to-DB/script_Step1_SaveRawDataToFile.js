const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const {
    CGPTFile,
    CGPTConversation,
    CGPTMessage,
} = require("../../routes/ChatGPTConversation.model");
const { CGPTFileNames } = require("./constants");
const { fetchJsonData } = require("./util");
const fs = require("fs");

const metadata = {
    dateOfExecution: "23-Oct-2023",
    purpose: `convert 
    1. Raw chatGPT file names to json object and save in a file, post normalization
    `,
    steps: `
    Plan of Execution
    1. Raw chatGPT file names to json object 
    2. normalize it
    3. save in a file
    4. Verify changes
    `,
    postChangeActivities: `
    Make proper UI changes for the above activity
    Raise PR and commit changes
    `,
};

const outputFolderLocation = "D:/temp-movement/ChatGPTNormalizedData";

const saveToFile = async (data, fileName) => {
    // Convert the MySQL result to JSON format
    const jsonData = JSON.stringify(data, null, 2);

    // Specify the output file path
    const outputFile = `${outputFolderLocation}/ND_${fileName}.json`;
    // Write the JSON data to the output file
    try {
        // Write the JSON string to the file
        await fs.writeFile(outputFile, jsonData, (writeErr) => {
            if (writeErr) {
                console.error("Error writing to file:", writeErr);
            } else {
                console.log(`Data written to ${outputFile}`);
            }
        });

        console.log(`File saved successfully at: ${outputFile}`);
    } catch (error) {
        console.error("Error saving file:", error);
    }
};

// 1. Save hardcoded chatGPT file names
async function saveHardcodedChatGPTFileNames() {
    try {
        for (const category of CGPTFileNames) {
            const chatGPTFileObject = {
                uniqueId: uuidv4(),
                name: category.name,
                location: category.location,
                descriptions: [],
                heading: category.name, // Assuming you want to copy smartContent
                parentId: "", // Or whatever logic is required
                createdDate: category.createdDate,
                isLatest: category.isLatest,
            };

            const {conversations, messages} = await fetchandSaveConvAndMessages(category.location);
            chatGPTFileObject.conversations=conversations;
            chatGPTFileObject.messages=messages;

            await saveToFile(chatGPTFileObject, category.name);

        }
    } catch (err) {
        console.error("Error in saveHardcodedChatGPTFileNames:", err);
    }
}

async function fetchandSaveConvAndMessages(location) {
    let normalizedConvArr = [];
    let normalizedMessages = [];

    try {
        const convArr = await fetchJsonData(location);
        let order=0;
        for (const conv of convArr) {
            const newConv = {
                uniqueId: uuidv4(),
                oldId: conv.oldId,
                name: conv.name,
                createdDate: conv.createdOn,
                updatedDate: conv.updatedOn,
                descriptions: [],
                heading: conv.name, // Assuming you want to copy smartContent
                parentId: "", // Or whatever logic is required
                order: (++order)
                // linkedCGPTFileId: savedTag.uniqueId,
            };

            normalizedConvArr.push(newConv);
            normalizedMessages = saveMessages(newConv.uniqueId, conv.messages)
            //   const savedConv = await newConv.save();
            //   await saveMessages(savedConv, conv.messages);
        }
    } catch (err) {
        console.error("Error in fetchandSaveConvAndMessages:", err);
        return { conversations: [], messages: [] };
    }
    return { conversations: normalizedConvArr, messages: normalizedMessages };
}

function saveMessages(linkedCGPTConvId, messages) {
    let normalizedMessages = [];
    try {
        let order=0;
        for (const msg of messages) {
            const newMsg = {
                uniqueId: uuidv4(),
                oldId: msg.oldId,
                name: msg.oldId + "_" + linkedCGPTConvId,
                author: msg.author,
                linkedCGPTConvId: linkedCGPTConvId,
                descriptions: [
                    {
                        content: msg.text,
                        textOutputType: "markdown",
                        textInputType: "TextArea",
                    },
                ],
                order: (++order)
            };

            normalizedMessages.push(newMsg);

        }
    } catch (err) {
        console.error("Error in fetchandSaveConvAndMessages:", err);
        return [];
    }
    return normalizedMessages;
}

async function main() {
    let processCompletedSuccessfully = false;
    try {
        // console.log("Connecting to MongoDB...");
        // await mongoose.connect(
        //     "mongodb://localhost:27017/chat_gpt_normalized_data",
        //     {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true,
        //     }
        // );
        console.log("Starting Normalization Process.");

        console.log("Step 1: Save hardcoded chatGPT file names...");
        await saveHardcodedChatGPTFileNames();

        console.log("Process completed successfully.");
        processCompletedSuccessfully = true;
    } catch (error) {
        console.error("Error occurred:", error);
        processCompletedSuccessfully = false;
    } finally {
        // await mongoose.connection.close();
        console.log(
            "MongoDB connection closed. Status: " +
            (processCompletedSuccessfully ? "Success" : "Error")
        );
    }
}

main();
