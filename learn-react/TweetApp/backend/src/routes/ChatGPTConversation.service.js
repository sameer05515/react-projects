const {
    CGPTFile,
    CGPTConversation,
    CGPTMessage,
} = require("./ChatGPTConversation.model");

const getAllCategories = async () => {
    try {
        let selectFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            isLatest: 1,
            location: 1,
        };
        const categories = await CGPTFile.find().select(selectFields);

        return (
            categories?.map((c) => ({
                ...c.toObject(),
                latestFile: c.isLatest,
            })) || []
        );
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getCategoryForUniqueId = async (uniqueId) => {
    try {
        let selectCGPTFileFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            isLatest: 1,
            location: 1,
            createdDate: 1,
            updatedDate: 1,
        };

        let selectCGPTConversationFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            linkedCGPTFileId: 1,
            createdDate: 1,
            updatedDate: 1,
            order:1
        };

        const cgptFile = await CGPTFile.findOne({ uniqueId }).select(
            selectCGPTFileFields
        );
        if (!cgptFile) {
            // return res.status(404).json({ error: 'File not found' });
            throw new Error("File not found");
        }
        const conversations = await CGPTConversation.find({
            linkedCGPTFileId: uniqueId,
        }).select(selectCGPTConversationFields);

        return {
            ...cgptFile.toObject(),
            conversations: conversations?.map((conv) => ({ ...conv.toObject() })),
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getCGPTFileForUIDAndConvUID = async (
    uniqueId,
    convUID
) => {
    try {
        let selectCGPTFileFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            isLatest: 1,
            location: 1,
            createdDate: 1,
            updatedDate: 1,
        };
        let selectCGPTConversationFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            linkedCGPTFileId: 1,
            createdDate: 1,
            updatedDate: 1,
            order:1
        };
        let selectCGPTMessageFields = {
            uniqueId: 1,
            name: 1,
            heading: 1,
            parentId: 1,
            linkedCGPTFileId: 1,
            linkedCGPTConvId:1,
            createdDate: 1,
            updatedDate: 1,
            order:1
        };
        // Fetch CGPTFile document with specific uniqueId
        const cGPTFile = await CGPTFile.findOne({ uniqueId }).select(
            selectCGPTFileFields
        );

        if (!cGPTFile) {
            throw new Error("CGPTFile not found");
        }

        const filteredConversations = await CGPTConversation.find({
            linkedCGPTFileId: uniqueId,
            uniqueId: convUID
        }).select(selectCGPTConversationFields);

        const filteredMessages= await CGPTMessage.find({
            linkedCGPTFileId: uniqueId,
            linkedCGPTConvId: convUID
        }).select(selectCGPTMessageFields);

        // Construct the result
        const result = {
            ...cGPTFile.toObject(),
            conversations: filteredConversations?.map((conv) => ({
                ...conv.toObject(),
            })),
            messages: filteredMessages?.map((msg) => ({
                ...msg.toObject(),
            })),
        };

        return result;
    } catch (error) {
        throw new Error(`Error fetching CGPTFile: ${error.message}`);
    }
};

const getCGPTFileForUIDAndConvUIDAndMsgUID=async (uniqueId,
    convUID, msgUID)=>{
        try {
            let selectCGPTFileFields = {
                uniqueId: 1,
                name: 1,
                heading: 1,
                parentId: 1,
                isLatest: 1,
                location: 1,
                createdDate: 1,
                updatedDate: 1,
            };
            let selectCGPTConversationFields = {
                uniqueId: 1,
                name: 1,
                heading: 1,
                parentId: 1,
                linkedCGPTFileId: 1,
                createdDate: 1,
                updatedDate: 1,
                order:1
            };
            let selectCGPTMessageFields = {
                uniqueId: 1,
                name: 1,
                heading: 1,
                parentId: 1,
                linkedCGPTFileId: 1,
                linkedCGPTConvId:1,
                createdDate: 1,
                updatedDate: 1,
                author:1,
                descriptions:1,
                order:1
            };
            // Fetch CGPTFile document with specific uniqueId
            const cGPTFile = await CGPTFile.findOne({ uniqueId }).select(
                selectCGPTFileFields
            );
    
            if (!cGPTFile) {
                throw new Error("CGPTFile not found");
            }
    
            const filteredConversations = await CGPTConversation.find({
                linkedCGPTFileId: uniqueId,
                uniqueId: convUID
            }).select(selectCGPTConversationFields);
    
            const filteredMessages= await CGPTMessage.find({
                linkedCGPTFileId: uniqueId,
                linkedCGPTConvId: convUID,
                uniqueId:msgUID
            }).select(selectCGPTMessageFields);
    
            // Construct the result
            const result = {
                ...cGPTFile.toObject(),
                conversations: filteredConversations?.map((conv) => ({
                    ...conv.toObject(),
                })),
                messages: filteredMessages?.map((msg) => ({
                    ...msg.toObject(),
                })),
            };
    
            return result;
        } catch (error) {
            throw new Error(`Error fetching CGPTFile: ${error.message}`);
        }
    }

module.exports = {
    // createCategory,
    getAllCategories,
    getCategoryForUniqueId,
    getCGPTFileForUIDAndConvUID,
    getCGPTFileForUIDAndConvUIDAndMsgUID
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
