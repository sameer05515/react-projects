const PinnedItem = require("./PinnedItem.model");
const { v4: uuidv4 } = require("uuid");

const upsertPinnedItem = async (pinnedItemData) => {
    const { uniqueId, linkedUniqueId, linkedItemType, softDelete } = pinnedItemData;


    const pinnedItem = await PinnedItem.findOne({ linkedUniqueId });
    if (!pinnedItem) {
        // new insert ka case hai
        const pinnedItemToBeUpserted = {
            uniqueId: uuidv4(),
            linkedUniqueId: linkedUniqueId,
            linkedItemType: linkedItemType,
            softDelete: false,
            createdDate: new Date(),
            updatedDate: new Date()
        };
        return await PinnedItem.create(pinnedItemToBeUpserted);
    } else {
        // update ka case hai
        pinnedItem.softDelete= softDelete!==null? softDelete : pinnedItem.softDelete;
        pinnedItem.linkedItemType= linkedItemType!==null? linkedItemType : pinnedItem.linkedItemType;
        pinnedItem.updatedDate= new Date();
        return await pinnedItem.save();

    }
}

const getAllPinnedItemsByType = async (pinnedItemType) => {
    const criteria = { linkedItemType: pinnedItemType, softDelete: false };
    let pinnedItems = await PinnedItem.find(criteria);
    return pinnedItems;
}

const getAllPinnedItems= async ()=>{
    return await PinnedItem.find({softDelete: false});
}

module.exports = {
    upsertPinnedItem,
    getAllPinnedItemsByType,
    getAllPinnedItems
};