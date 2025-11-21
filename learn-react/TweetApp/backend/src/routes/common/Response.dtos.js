// Define a response object structure
const taskResponseDTO = (obj) => ({
    _id: obj._id,
    uniqueId: obj.uniqueId,
    title: obj.title,
    parentId: obj.parentId,
    description: obj.description,
    createdDate:obj.createdDate,
    updatedDate:obj.updatedDate,
    taskStatus: obj.taskStatus,
    children: obj.children || [], // Add children field, or an empty array if it doesn't exist
    ancestors: obj.ancestors || [],
    tags:obj.tags ||[],
    linkedTasks: obj.linkedTasks||[]
});


module.exports = { taskResponseDTO };