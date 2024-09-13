const {
    CGPTFile,
    CGPTConversation,
    CGPTMessage,
} = require("./ChatGPTConversation.model");

// Helper function to generate common select fields for CGPTFile, CGPTConversation, and CGPTMessage
const generateSelectFields = (type) => {
    const baseFields = {
        uniqueId: 1,
        name: 1,
        heading: 1,
        parentId: 1,
        createdDate: 1,
        updatedDate: 1,
    };
    
    switch (type) {
        case 'file':
            return {
                ...baseFields,
                isLatest: 1,
                location: 1,
            };
        case 'conversation':
            return {
                ...baseFields,
                linkedCGPTFileId: 1,
                order: 1,
            };
            case 'message-summarized':
                return {
                    ...baseFields,
                    linkedCGPTFileId: 1,
                    linkedCGPTConvId: 1,
                    // author: 1,
                    // descriptions: 1,
                    order: 1,
                };
        case 'message':
            return {
                ...baseFields,
                linkedCGPTFileId: 1,
                linkedCGPTConvId: 1,
                author: 1,
                descriptions: 1,
                order: 1,
            };
        default:
            return baseFields;
    }
};

// Helper function to find CGPTFile by uniqueId
const findCGPTFile = async (uniqueId) => {
    return await CGPTFile.findOne({ uniqueId }).select(generateSelectFields('file'));
};

// Get all categories (CGPTFiles)
const getAllCategories = async () => {
    try {
        const categories = await CGPTFile.find().select(generateSelectFields('file'));
        return categories.map((c) => ({
            ...c.toObject(),
            latestFile: c.isLatest,
        }));
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Get category for specific uniqueId
const getCategoryForUniqueId = async (uniqueId) => {
    try {
        const cgptFile = await findCGPTFile(uniqueId);
        if (!cgptFile) throw new Error("File not found");

        const conversations = await CGPTConversation.find({
            linkedCGPTFileId: uniqueId,
        }).select(generateSelectFields('conversation'));

        return {
            ...cgptFile.toObject(),
            conversations: conversations.map((conv) => conv.toObject()),
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Get CGPTFile for uniqueId and specific conversation (convUID)
const getCGPTFileForUIDAndConvUID = async (uniqueId, convUID) => {
    try {
        const cgptFile = await findCGPTFile(uniqueId);
        if (!cgptFile) throw new Error("CGPTFile not found");

        const filteredConversations = await CGPTConversation.find({
            linkedCGPTFileId: uniqueId,
            uniqueId: convUID,
        }).select(generateSelectFields('conversation'));

        const filteredMessages = await CGPTMessage.find({
            linkedCGPTFileId: uniqueId,
            linkedCGPTConvId: convUID,
        }).select(generateSelectFields('message-summarized'));

        return {
            ...cgptFile.toObject(),
            conversations: filteredConversations.map((conv) => conv.toObject()),
            messages: filteredMessages.map((msg) => msg.toObject()),
        };
    } catch (error) {
        throw new Error(`Error fetching CGPTFile: ${error.message}`);
    }
};

// Get CGPTFile for uniqueId, conversation (convUID), and specific message (msgUID)
const getCGPTFileForUIDAndConvUIDAndMsgUID = async (uniqueId, convUID, msgUID) => {
    try {
        const cgptFile = await findCGPTFile(uniqueId);
        if (!cgptFile) throw new Error("CGPTFile not found");

        const filteredConversations = await CGPTConversation.find({
            linkedCGPTFileId: uniqueId,
            uniqueId: convUID,
        }).select(generateSelectFields('conversation'));

        const filteredMessages = await CGPTMessage.find({
            linkedCGPTFileId: uniqueId,
            linkedCGPTConvId: convUID,
            uniqueId: msgUID,
        }).select(generateSelectFields('message'));

        return {
            ...cgptFile.toObject(),
            conversations: filteredConversations.map((conv) => conv.toObject()),
            messages: filteredMessages.map((msg) => msg.toObject()),
        };
    } catch (error) {
        throw new Error(`Error fetching CGPTFile: ${error.message}`);
    }
};

const getConversationsForConvUID= async (convUID)=>{
    try {
        const filteredConversations = await CGPTConversation.find({
            uniqueId: convUID,
        }).select(generateSelectFields('conversation'));

        return {
            conversations: filteredConversations.map((conv) => conv.toObject()),
        };
    } catch (error) {
        throw new Error(`Error fetching CGPTFile: ${error.message}`);
    }
}

const getMessagesForMsgUID= async (msgUID)=>{
    try {
        const filteredMessages = await CGPTMessage.find({
            uniqueId: msgUID,
        }).select(generateSelectFields('message-summarized'));

        return {
            messages: filteredMessages.map((msg) => msg.toObject()),
        };
    } catch (error) {
        throw new Error(`Error fetching CGPTFile: ${error.message}`);
    }
}

module.exports = {
    getAllCategories,
    getCategoryForUniqueId,
    getCGPTFileForUIDAndConvUID,
    getCGPTFileForUIDAndConvUIDAndMsgUID,
    getConversationsForConvUID,
    getMessagesForMsgUID
};
