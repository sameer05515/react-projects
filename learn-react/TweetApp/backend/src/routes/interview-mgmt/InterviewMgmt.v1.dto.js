// Define a response object structure
const linkResponseDTO = (linkData) => ({
    uniqueId: linkData.uniqueId,
    title: linkData.title,
    parentId: linkData.parentId,
    categoryName: linkData.categoryName,
    rating: linkData.rating,
    questions: linkData.questions,
    children: linkData.children || [], // Add children field, or an empty array if it doesn't exist
    ancestors: linkData.ancestors || [],
});


module.exports = {linkResponseDTO};