const Task = require("./Task.model");
const { v4: uuidv4 } = require("uuid");

async function getAllTasks() {
    try {
        let selectFields = {
            uniqueId: 1,
            title: 1,
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
            throw new Error("Task not found , uniqueId : "+uniqueId);
        }
        const children = await Task.find({ parentId: uniqueId });
        let ancestors = [];
        const responseDTO = {
            ...task.toObject(),
            children: children.map((child) => ({
                title: child.title,
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

async function createTask(newTask) {
    try {
        const task = new Task({
            title: newTask.title,
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
        const { parentId, title, description, tags, linkedTasks, taskStatus, activities } = updatedTask;
        // console.log("activities: "+activities)
        task.parentId = parentId || task.parentId;
        task.title = title || task.title;
        task.description = description || task.description;
        task.tags = tags && tags.length >= 0 ? tags : task.tags;
        task.taskStatus = taskStatus != null ? taskStatus : task.taskStatus;
        task.linkedTasks = linkedTasks && linkedTasks.length >= 0 ? linkedTasks : task.linkedTasks;
        task = upsertActivities(task, activities);
        task.updatedDate= new Date();
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
                existingActivity.updatedDate= new Date();
                existingActivity.userDetails.id= activity.userDetails?.id || existingActivity.userDetails.id;
                existingActivity.userDetails.name= activity.userDetails?.name || existingActivity.userDetails.name;
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



module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
