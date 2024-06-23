// Define a response object structure
const linkResponseDTO = (linkData) => ({
    uniqueId: linkData.uniqueId,
    name: linkData.name,
    parentId: linkData.parentId,
    linkType: linkData.linkType,
    linkUrl: linkData.linkUrl,
    description: linkData.description,
    children: linkData.children || [], // Add children field, or an empty array if it doesn't exist
    ancestors: linkData.ancestors || [],
});


module.exports = {linkResponseDTO};