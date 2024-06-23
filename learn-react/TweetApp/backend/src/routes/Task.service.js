const Task = require("./Task.model");
const { v4: uuidv4 } = require("uuid");

async function getAllTasks() {
    try {
        let selectFields = {
            uniqueId: 1,
            name: 1,
            parentId: 1,
            taskStatus: 1,
            children: 1,
        };
        const tasks = await getTasks(null, { ...selectFields });
        return tasks;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getTasks(parentId, selectFields) {
    try {
        const criteria = parentId ? { parentId } : { parentId: { $in: [null, undefined, ""] } };
        let tasks = await Task.find(criteria).select(selectFields);
        const tasksWithChildren = await Promise.all(
            tasks.map(async (task) => {
                const children = await getTasks(task.uniqueId, selectFields);
                return { ...task.toObject(), children };
            })
        );
        return tasksWithChildren;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getTaskById(uniqueId) {
    try {
        const task = await Task.findOne({ uniqueId: uniqueId });

        if (!task) {
            throw new Error("Task not found , uniqueId : " + uniqueId);
        }
        const children = await Task.find({ parentId: uniqueId });
        let ancestors = [];
        try {
            ancestors = await getAllAncestors(task.parentId);
            // res.json(ancestors);
        } catch (error) {
            // res.status(500).json({ error: error.message });
            console.log(error);
            ancestors = [];
        }
        const responseDTO = {
            ...task.toObject(),
            children: children.map((child) => ({
                name: child.name,
                uniqueId: child.uniqueId,
            })),
            ancestors: [...ancestors],
        };
        return responseDTO;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Recursive function to get all ancestors of a link
async function getAllAncestors(parentId, ancestors = []) {
    // console.log(`start: parentId: ${parentId} :   function getAllAncestors : ${JSON.stringify(ancestors)}`);
    if (!parentId) {
        return ancestors;
    }
    const task = await Task.findOne({ uniqueId: parentId });
    // console.log(`task: ${JSON.stringify(task)}`);
    // if (!task || !task.parentId) {
    //   return ancestors;
    // }
    ancestors.unshift({
        name: task.name,
        uniqueId: task.uniqueId,
        parentId: task.parentId,
    }); // Add the name of the current task to ancestors array
    // console.log(`final: function getAllAncestors : ${JSON.stringify(ancestors)}`);
    return getAllAncestors(task.parentId, ancestors); // Recursively call to get ancestors of the parent task
}

async function createTask(newTask) {
    try {
        const task = new Task({
            name: newTask.name,
            description: newTask.description,
            linkedTasks: newTask.linkedTasks || [],
            parentId: newTask.parentId,
            tags: newTask.tags || [],
            activities: newTask.activities || [],
            taskStatus: newTask.taskStatus
        });
        await task.save();
        return task;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function updateTask(taskId, updatedTask) {
    try {
        let task = await Task.findById(taskId);
        if (!task) {
            throw new Error("Task not found");
        }
        const { parentId, name, description, tags, linkedTasks, taskStatus, activities } = updatedTask;
        // console.log("activities: "+activities)
        task.parentId = parentId || task.parentId;
        task.name = name || task.name;
        task.description = description || task.description;
        task.tags = tags && tags.length >= 0 ? tags : task.tags;
        task.taskStatus = taskStatus != null ? taskStatus : task.taskStatus;
        task.linkedTasks = linkedTasks && linkedTasks.length >= 0 ? linkedTasks : task.linkedTasks;
        task = upsertActivities(task, activities);
        task.updatedDate = new Date();
        task = await task.save();
        const childrenIds = updatedTask.children || [];
        await Task.updateMany({ uniqueId: { $in: childrenIds } }, { parentId: task.uniqueId });
        return task;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function upsertActivities(existingTask, activities) {
    if (!existingTask || !activities || activities.length === 0) {
        return existingTask;
    }

    activities.forEach(activity => {
        if (activity.uniqueId) {
            const existingActivity = existingTask.activities?.find(ea => ea.uniqueId === activity.uniqueId);
            if (existingActivity) {
                existingActivity.description = activity.description;
                existingActivity.updatedDate = new Date();
                existingActivity.userDetails.id = activity.userDetails?.id || existingActivity.userDetails.id;
                existingActivity.userDetails.name = activity.userDetails?.name || existingActivity.userDetails.name;
            }
        } else {
            // Generate uniqueId for the new activity
            const uniqueId = uuidv4();
            // Add the new activity to the existingTask.activities array
            existingTask.activities.push({
                uniqueId,
                type: activity.type,
                description: activity.description,
                userDetails: activity.userDetails
            });
        }
    });

    return existingTask;
}

async function deleteTask(taskId) {
    try {
        const task = await Task.findByIdAndRemove(taskId);
        if (!task) {
            throw new Error("Task not found");
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getTasksByTagId = async (tagId) => {
    try {
        const selectFields = {
            uniqueId: 1,
            name: 1,
            //parentId: 1,
            //tags: 1,
        };
        const tasks = await Task.find({ tags: tagId }).select(selectFields);
        return tasks;
    } catch (error) {
        console.error(error);
        throw new Error(`Error retrieving tasks with tagId ${tagId}: ${error.message}`);
    }
};



module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTasksByTagId
};
