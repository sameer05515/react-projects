const { CGPTFile } = require("./ChatGPTConversation.model");

const getAllCategories = async () => {
    try {
        let selectFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            isLatest: 1,
            location: 1
        };
        const categories = await CGPTFile.find().select(selectFields);

        return categories?.map(c => ({
            ...c.toObject(),
            latestFile: c.isLatest
        })) || [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getCategoryForUniqueId = async (uniqueId) => {
    try {
        let selectFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            isLatest: 1,
            location: 1,
            'conversations.uniqueId': 1,  // Project uniqueId of conversations
            'conversations.name': 1,      // Project name of conversations
            'conversations.linkedCGPTFileId': 1,
            'conversations.order': 1,
            'conversations.heading': 1,
        };
        const cgptFile = await CGPTFile.findOne({ uniqueId }).select(selectFields);

        if (!cgptFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        return cgptFile;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


// const getCategoryForUniqueIdAndConvUID = async (uniqueId, convUID)=>{
//     try {
//         let selectFields = {
//             uniqueId: 1,
//             name: 1,
//             heading: 1,
//             parentId: 1,
//             isLatest: 1,
//             location: 1,
//             'conversations.uniqueId': 1,  // Project uniqueId of conversations
//             'conversations.name': 1 ,      // Project name of conversations
//             'conversations.linkedCGPTFileId': 1 ,
//             'conversations.order': 1 ,
//             'conversations.heading': 1 ,

//             'messages.uniqueId': 1,  // Project uniqueId of conversations
//             'messages.name': 1 ,      // Project name of conversations
//             'messages.linkedCGPTConvId': 1 ,
//             'messages.order': 1 ,
//             'messages.heading': 1 ,
//         };
//         const cgptFile = await CGPTFile.findOne({ uniqueId }).select(selectFields);

//         if (!cgptFile) {
//             return res.status(404).json({ error: 'File not found' });
//         }

//         return cgptFile;
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }

// const getCategoryForUniqueIdAndConvUID = async (uniqueId, convUID) => {
//     try {
//         // Define the fields to project along with $elemMatch for conversations and messages
//         let selectFields = {
//             uniqueId: 1,
//             name: 1,
//             heading: 1,
//             parentId: 1,
//             isLatest: 1,
//             location: 1,
//             // conversations: {
//             //     $elemMatch: { uniqueId: convUID }, // Filter conversations with convUID
//             // },
//             // messages: {
//             //     $elemMatch: { linkedCGPTConvId: convUID }, // Filter messages with convUID
//             // },

//             'conversations.uniqueId': 1,  // Project uniqueId of conversations
//             'conversations.name': 1 ,      // Project name of conversations
//             'conversations.linkedCGPTFileId': 1 ,
//             'conversations.order': 1 ,
//             'conversations.heading': 1 ,

//             'messages.uniqueId': 1,  // Project uniqueId of conversations
//             'messages.name': 1 ,      // Project name of conversations
//             'messages.linkedCGPTConvId': 1 ,
//             'messages.order': 1 ,
//             'messages.heading': 1 ,
//         };

//         // Query the CGPTFile with filtered conversations and messages
//         const cgptFile = await CGPTFile.findOne({ uniqueId, "conversations.uniqueId": convUID, "messages.linkedCGPTConvId": convUID }).select(selectFields);

//         if (!cgptFile) {
//             return { error: 'File not found', status: 404 };
//         }

//         // Check if conversation was found
//         if (!cgptFile.conversations || cgptFile.conversations.length === 0) {
//             return { error: 'Conversation not found', status: 404 };
//         }

//         return cgptFile;
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };

const getCGPTFileWithFilteredConversationsAndMessages = async (uniqueId, convUID) => {
    try {
        // Fetch CGPTFile document with specific uniqueId
        const cGPTFile = await CGPTFile.findOne({ uniqueId });

        if (!cGPTFile) {
            throw new Error('CGPTFile not found');
        }

        // Filter conversations where uniqueId matches convUID
        const filteredConversations = cGPTFile.conversations.filter(
            (conversation) => conversation.uniqueId === convUID
        );

        // Filter messages where linkedCGPTConvId matches convUID
        const filteredMessages = cGPTFile.messages.filter(
            (message) => message.linkedCGPTConvId === convUID
        );

        // Construct the result
        const result = {
            ...cGPTFile.toObject(),
            conversations: filteredConversations,
            messages: filteredMessages
        };

        return result;
    } catch (error) {
        throw new Error(`Error fetching CGPTFile: ${error.message}`);
    }
};



module.exports = {
    // createCategory,
    getAllCategories,
    getCategoryForUniqueId,
    getCGPTFileWithFilteredConversationsAndMessages
    // updateCategoryByUniqueId,

    // createQuestion,
    // getAllQuestions,
    // getQuestionByUniqueId,
    // getQuestionByCategoryIdAndQuesId,
    // updateQuestionByUniqueId,

    // getAllQuestionsForReportingModule,

    // getQuestionsByTagId,

    // createAnswer,
    // updateAnswerByUniqueId,

    // searchTopics
};