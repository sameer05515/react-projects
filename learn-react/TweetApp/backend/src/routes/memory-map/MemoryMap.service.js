const { MemoryMap } = require('./MemoryMap.model');
const { v4: uuidv4 } = require("uuid");

const upsertDetails = (details) => {
    if (!details || details.length === 0) {
        return [];
    }
    return details.map(d => ({
        uniqueId: d.uniqueId && d.uniqueId.trim() ? d.uniqueId : uuidv4(),
        smartContent: d.smartContent
    }));
};

const upsertReferences = (references) => {
    if (!references || references.length === 0) {
        return [];
    }
    return references.map(r => ({
        uniqueId: r.uniqueId && r.uniqueId.trim() ? r.uniqueId : uuidv4(),
        itemType: r.itemType,
        itemMetadata: r.itemMetadata
    }));
};

// Save a new MemoryMap
async function saveMemoryMap(memoryMapData) {
    try {
        const uniqueId = memoryMapData.uniqueId && memoryMapData.uniqueId.trim() ? memoryMapData.uniqueId : uuidv4();
        const newMemoryMap = new MemoryMap({
            uniqueId,
            parentId: memoryMapData.parentId,
            name: memoryMapData.name,
            details: upsertDetails(memoryMapData.details),
            references: upsertReferences(memoryMapData.references),
            softDelete: false,
            createdDate: new Date(),
            updatedDate: new Date()
        });

        await newMemoryMap.save();
        return newMemoryMap;
    } catch (error) {
        console.error(error);
        throw new Error('Error saving MemoryMap: ' + error.message);
    }
}

// Update an existing MemoryMap by uniqueId
async function updateMemoryMap(uniqueId, memoryMapData) {
    try {
        let memoryMapTobeUpdated = await MemoryMap.findOne({ uniqueId });
        if (!memoryMapTobeUpdated) {
            throw new Error('MemoryMap not found');
        }

        const { parentId, name, details, references, softDelete } = memoryMapData;
        memoryMapTobeUpdated.parentId = parentId || memoryMapTobeUpdated.parentId;
        memoryMapTobeUpdated.name = name || memoryMapTobeUpdated.name;
        memoryMapTobeUpdated.details = upsertDetails(details);
        memoryMapTobeUpdated.references = upsertReferences(references);
        memoryMapTobeUpdated.softDelete = softDelete !== null ? softDelete : memoryMapTobeUpdated.softDelete;
        memoryMapTobeUpdated.updatedDate = new Date();

        memoryMapTobeUpdated = await memoryMapTobeUpdated.save();
        return memoryMapTobeUpdated;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating MemoryMap: ' + error.message);
    }
}

// Update an existing MemoryMap by uniqueId, for given skeleton
async function updateMemoryMapForGivenSkeleton(uniqueId, memoryMapData){

    try{

        let memoryMapTobeUpdated = await MemoryMap.findOne({ uniqueId });
        if (!memoryMapTobeUpdated) {
            throw new Error('MemoryMap not found: '+uniqueId);
        }

        const { skeleton } = memoryMapData;
        memoryMapTobeUpdated.skeleton = skeleton || memoryMapTobeUpdated.skeleton;
        // memoryMapTobeUpdated.name = name || memoryMapTobeUpdated.name;
        // memoryMapTobeUpdated.details = upsertDetails(details);
        // memoryMapTobeUpdated.references = upsertReferences(references);
        // memoryMapTobeUpdated.softDelete = softDelete !== null ? softDelete : memoryMapTobeUpdated.softDelete;
        memoryMapTobeUpdated.updatedDate = new Date();

        memoryMapTobeUpdated = await memoryMapTobeUpdated.save();
        return memoryMapTobeUpdated;

    }catch (error) {
        console.error(error);
        throw new Error('Error updating MemoryMap: ' + error.message);
    }
}

// Fetch all MemoryMaps
async function fetchAllMemoryMaps() {
    try {
        const selectFields = {
            uniqueId: 1,
            name: 1,
            parentId: 1,
            skeleton: 1,
            details: 1,
            references: 1
        };
        const memoryMaps = await getMemoryMaps(null, { ...selectFields });
        return memoryMaps;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching all MemoryMaps: ' + error.message);
    }
}

async function getMemoryMaps(parentId, selectFields) {
    try {
        const criteria = parentId
            ? { parentId }
            : { parentId: { $in: [null, undefined, ""] } };
        let memoryMaps = await MemoryMap.find(criteria).select(selectFields);
        const memoryMapsWithChildren = await Promise.all(
            memoryMaps.map(async (memoryMap) => {
                const children = await getMemoryMaps(memoryMap.uniqueId, selectFields);
                const ancestors = await getAllAncestors(memoryMap.parentId);
                return { ...memoryMap.toObject(), children, ancestors };
            })
        );
        return memoryMapsWithChildren;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Recursive function to get all ancestors of a link
async function getAllAncestors(parentId, ancestors = []) {

    if (!parentId) {
        return ancestors;
    }
    const memoryMap = await MemoryMap.findOne({ uniqueId: parentId });

    ancestors.unshift({
        name: memoryMap.name,
        uniqueId: memoryMap.uniqueId,
        parentId: memoryMap.parentId,
    }); // Add the name of the current memoryMap to ancestors array

    return getAllAncestors(memoryMap.parentId, ancestors); // Recursively call to get ancestors of the parent memoryMap
}

// Fetch a MemoryMap by uniqueId
async function fetchMemoryMapByUniqueId(uniqueId) {
    try {
        const memoryMap = await MemoryMap.findOne({ uniqueId });
        if (!memoryMap) {
            throw new Error('MemoryMap not found');
        }

        return {
            ...memoryMap.toObject(),
        };
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching MemoryMap by uniqueId: ' + error.message);
    }
}

// Search MemoryMaps by name or description
async function searchMemoryMaps(searchString, searchOptions) {
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

        const memoryMaps = await MemoryMap.find(criteria).select({
            uniqueId: 1,
            name: 1,
            description: 1,
            tags: 1,
        });
        return memoryMaps;
    } catch (error) {
        console.error(error);
        throw new Error('Error searching MemoryMaps: ' + error.message);
    }
}

// Get MemoryMaps by tag ID
async function getMemoryMapsByTagId(tagId) {
    try {
        const memoryMaps = await MemoryMap.find({ tags: tagId }).select({
            uniqueId: 1,
            name: 1,
        });
        return memoryMaps;
    } catch (error) {
        console.error(error);
        throw new Error(`Error retrieving MemoryMaps with tagId ${tagId}: ${error.message}`);
    }
}

module.exports = {
    saveMemoryMap,
    updateMemoryMap,
    updateMemoryMapForGivenSkeleton,
    fetchAllMemoryMaps,
    fetchMemoryMapByUniqueId,
    searchMemoryMaps,
    getMemoryMapsByTagId,
};
