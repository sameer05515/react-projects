const { RelatedNode } = require("./RelatedNode.model");
const { v4: uuidv4 } = require("uuid");

const upsertRelations = (relations) => {
    if (!relations || relations.length === 0) {
        return [];
    }
    return relations.map((rel) => ({
        ...rel,
        uniqueId: rel?.uniqueId?.trim() ? rel.uniqueId : uuidv4(),
    }));
};

// Save a new RelatedNode
async function saveRelatedNode(relatedNodeData) {
    try {
        const uniqueId =
            relatedNodeData.uniqueId && relatedNodeData.uniqueId.trim()
                ? relatedNodeData.uniqueId
                : uuidv4();
        const newRelatedNode = new RelatedNode({
            uniqueId,
            name: relatedNodeData.name,
            itemType: relatedNodeData.itemType,
            //relations: upsertRelations(relatedNodeData.relations),
            softDelete: false,
            createdDate: new Date(),
            updatedDate: new Date(),
        });

        await newRelatedNode.save();
        return newRelatedNode;
    } catch (error) {
        console.error(error);
        throw new Error("Error saving RelatedNode: " + error.message);
    }
}

// Update an existing RelatedNode by uniqueId
async function updateRelatedNode(uniqueId, relatedNodeData) {
    try {
        let relatedNodeTobeUpdated = await RelatedNode.findOne({ uniqueId });
        if (!relatedNodeTobeUpdated) {
            throw new Error('RelatedNode not found');
        }

        const { itemType, name, relations, softDelete } = relatedNodeData;
        relatedNodeTobeUpdated.itemType = itemType || relatedNodeTobeUpdated.itemType;
        relatedNodeTobeUpdated.name = name || relatedNodeTobeUpdated.name;
        //relatedNodeTobeUpdated.relations = upsertRelations(relations);
        relatedNodeTobeUpdated.softDelete = softDelete !== null ? softDelete : relatedNodeTobeUpdated.softDelete;
        relatedNodeTobeUpdated.updatedDate = new Date();

        relatedNodeTobeUpdated = await relatedNodeTobeUpdated.save();
        return relatedNodeTobeUpdated;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating RelatedNode: ' + error.message);
    }
}

// Service to update an existing Node's relation and the other related node aasociated by withId
async function updateRelationInConnectedNodes(relationData) {
    try {
        console.log('[RelatedNode.service.js]: relationData: ',JSON.stringify(relationData));
        let relatedHasIdNode = await RelatedNode.findOne({ uniqueId: relationData.hasId });
        let relatedWithIdNode = await RelatedNode.findOne({ uniqueId: relationData.withId });

        if (!relatedHasIdNode) {
            throw new Error(`RelatedNode mentioned in hasId: ${relationData.hasId} not found`);
        }
        if (!relatedWithIdNode) {
            throw new Error(`RelatedNode mentioned in withId: ${relationData.withId} not found`);
        }

        // Update or add the relation in hasId node
        let hasIdRelation = relatedHasIdNode.relations.find(rel => rel.withId === relationData.withId);
        if (hasIdRelation) {
            // Update existing relation
            hasIdRelation.name = relationData.name;
            hasIdRelation.type = relationData.type;
            hasIdRelation.showReverseRelationName = relationData.showReverseRelationName;
            hasIdRelation.updatedDate = new Date();
            hasIdRelation.softDelete = relationData.softDelete || false;
        } else {
            // Add new relation
            relatedHasIdNode.relations.push({
                ...relationData,
                uniqueId: uuidv4(),
                showReverseRelationName: relationData.showReverseRelationName,
                createdDate: new Date(),
                updatedDate: new Date(),
                softDelete: false
            });
        }

        // Save the hasId node
        await relatedHasIdNode.save();

        // Update or add the reverse relation in withId node
        let withIdRelation = relatedWithIdNode.relations.find(rel => rel.withId === relationData.hasId);
        if (withIdRelation) {
            // Update existing relation
            withIdRelation.name = withIdRelation.name;
            withIdRelation.type = relationData.type === 'previous' ? 'next' : 'previous'; // You may need to define logic for reverseType
            withIdRelation.showReverseRelationName = !relationData.showReverseRelationName;
            withIdRelation.updatedDate = new Date();
            withIdRelation.softDelete = relationData.softDelete || false;
        } else {
            // Add new reverse relation
            relatedWithIdNode.relations.push({
                ...relationData,
                uniqueId: uuidv4(),
                type: relationData.type === 'previous' ? 'next' : 'previous', // Set reverseType or default to 'previous'
                hasId: relationData.withId, // Swap the hasId and withId for reverse relation
                withId: relationData.hasId,
                showReverseRelationName: !relationData.showReverseRelationName,
                createdDate: new Date(),
                updatedDate: new Date(),
                softDelete: false
            });
        }

        // Save the withId node
        await relatedWithIdNode.save();

        return { message: 'Successfully updated relations' };
    } catch (error) {
        console.error(error);
        throw new Error('Error updating RelatedNode: ' + error.message);
    }
}



// Fetch all RelatedNodes
async function fetchAllRelatedNodes() {
    try {
        const selectFields = {
            uniqueId: 1,
            name: 1,
            itemType: 1,
            relations: 1,
            softDelete: 1,
            createdDate: 1,
            updatedDate: 1,
        };
        const relatedNodes = await getRelatedNodes(null, { ...selectFields });
        return relatedNodes;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching all RelatedNodes: ' + error.message);
    }
}

async function getRelatedNodes(parentId, selectFields) {
    try {
        // const criteria = parentId
        //     ? { parentId }
        //     : { parentId: { $in: [null, undefined, ""] } };
        const criteria = {};
        let relatedNodes = await RelatedNode
            .find(criteria)
            .select(selectFields);
        // const relatedNodesWithChildren = await Promise.all(
        //     relatedNodes.map(async (relatedNode) => {
        //         const children = await getRelatedNodes(relatedNode.uniqueId, selectFields);
        //         const ancestors = await getAllAncestors(relatedNode.parentId);
        //         return { ...relatedNode.toObject(), children, ancestors };
        //     })
        // );
        const relatedNodesWithChildren = relatedNodes.map((relatedNode) => {
            return { ...relatedNode.toObject() };
        });
        return relatedNodesWithChildren;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Fetch a RelatedNode by uniqueId
async function fetchRelatedNodeByUniqueId(uniqueId) {
    try {
        const relatedNode = await RelatedNode.findOne({ uniqueId });
        if (!relatedNode) {
            throw new Error('RelatedNode not found');
        }

        return {
            ...relatedNode.toObject(),
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching RelatedNode by uniqueId: ' + error.message);
    }
}

// Search RelatedNodes by name or description
async function searchRelatedNodes(searchString, searchOptions) {
    try {
        const regex = new RegExp(searchString, "i"); // 'i' for case insensitive
        const criteria = {
            $or: [
                { name: { $regex: regex } },
            ],
        };

        if (searchOptions?.description) {
            criteria["$or"].push({ description: { $regex: regex } });
        }

        const relatedNodes = await RelatedNode.find(criteria).select({
            uniqueId: 1,
            name: 1,
            description: 1,
            tags: 1,
        });
        return relatedNodes;
    } catch (error) {
        console.error(error);
        throw new Error('Error searching RelatedNodes: ' + error.message);
    }
}


module.exports = {
    saveRelatedNode,
    updateRelatedNode,
    fetchAllRelatedNodes,
    fetchRelatedNodeByUniqueId,
    searchRelatedNodes,
    updateRelationInConnectedNodes
};