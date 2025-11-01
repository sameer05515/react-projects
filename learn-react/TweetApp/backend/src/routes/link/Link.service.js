const Link = require('./Link.model'); // Adjust the path to your Link model as needed

// Function to create a new link
async function createLink(linkData) {
    try {
        const link = await Link.create(linkData);
        return link;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get links with optional parentId
async function getLinks(parentId, selectFields) {
    try {
        const criteria = parentId ? { parentId } : { parentId: { $in: [null, undefined, ''] } };
        let links = await Link.find(criteria).select(selectFields);
        const linksWithChildren = await Promise.all(links.map(async link => {
            const children = await getLinks(link.uniqueId, selectFields);
            const ancestors = await getAllAncestors(link.parentId);
            return { ...link.toObject(), children, ancestors };
        }));
        return linksWithChildren;
    } catch (error) {
        throw new Error('Error fetching links');
    }
}

// Function to get a link by uniqueId
async function getLinkByUniqueId(uniqueId) {
    try {
        const link = await Link.findOne({ uniqueId });
        if (!link) {
            throw new Error('Link not found');
        }
        return link;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to get children of a link by parentId
async function getLinkChildren(parentId) {
    try {
        const children = await Link.find({ parentId });
        return children;
    } catch (error) {
        throw new Error('Error fetching link children');
    }
}

// Recursive function to get all ancestors of a link
async function getAllAncestors(parentId, ancestors = []) {
    if (!parentId) {
        return ancestors;
    }
    const link = await Link.findOne({ uniqueId: parentId });
    //   ancestors.unshift(link.name);
    ancestors.unshift({
        name: link.name,
        uniqueId: link.uniqueId,
        parentId: link.parentId,
    }); // Add the name of the current topic to ancestors array
    return getAllAncestors(link.parentId, ancestors);
}

// Function to update a link by uniqueId
async function updateLinkByUniqueId(uniqueId, linkData) {
    try {
        const link = await Link.findOneAndUpdate({ uniqueId }, linkData, { new: true });
        if (!link) {
            throw new Error('Link not found');
        }
        return link;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to delete a link by uniqueId
async function deleteLinkByUniqueId(uniqueId) {
    try {
        const link = await Link.findOneAndRemove({ uniqueId });
        if (!link) {
            throw new Error('Link not found');
        }
        return link;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createLink,
    getLinks,
    getLinkByUniqueId,
    getLinkChildren,
    getAllAncestors,
    updateLinkByUniqueId,
    deleteLinkByUniqueId
};
