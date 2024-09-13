const mongoose = require('mongoose');
const Task = require('../../routes/Task.model'); // Adjust the path as necessary

const metadata = {
    dateOfExecution:'14-Oct-2023',
    purpose: `convert 
    1. 'description' field of Task.model's Task to array of 'smartContent'
    2. 'description' field of Task.model's Activity to 'smartContent'
    `,
    steps: `
    Plan of Execution
    1. Take backup of tasks collection
    2. Fetch all tasks
    3. Convert 'description' to array of 'smartContent', and add a new field name 'descriptions'. Now a task can have zero or more smartContents.
    3.1. Delete 'description' field of Task.model's Task
    4. For each task object, iterate array of Task.model's Activity, field name 'activities'.
    5. Convert 'description' field to 'smartContent' of Task.model's Activity object, and add a new field name 'descr'.
    6. Verify changes
    `,
    postChangeActivities: `
    Make proper UI changes for the above activity
    Raise PR and commit changes
    `
};

// 1. Update 'description' to array of 'smartContent' in Task.model's Task
// 2. Update 'description' field to 'smartContent' of Task.model's Activity object in each task
async function updateDescriptionInTasks() {
    try {
        const tasks = await Task.find().exec();

        const taskUpdates = tasks.map(async task => {
            if (task.description) {
                // task.descriptions = [
                //     {
                //         content: task.description,
                //         textOutputType: 'html',
                //         textInputType: 'CKEditor'
                //     }
                // ];
                task.description=undefined;
            }

            if (task.activities && task.activities.length > 0) {
                task.activities = task.activities.map(act => ({
                    ...act,
                    // descr: {
                    //     content: act.description,
                    //     textOutputType: 'html',
                    //     textInputType: 'CKEditor'
                    // },
                    // description: act.descr,
                    descr: undefined
                }));
            }

            return task.save();
        });

        await Promise.all(taskUpdates); // Execute all updates in parallel
    } catch (error) {
        console.error('Error updating tasks:', error);
        throw error;
    }
}

// Verifying changes
async function verify() {
    console.log('Verifying updates...');

    const tasks = await Task.find().exec();
    let allValid = true;

    for (const task of tasks) {
        // Check if 'descriptions' field is added and 'description' is removed
        if (!task.descriptions || !Array.isArray(task.descriptions)) {
            console.error(`Task ID ${task._id} is missing the 'descriptions' array.`);
            allValid = false;
        }

        // Check if 'activities' has 'descr' field
        if (task.activities && task.activities.length > 0) {
            for (const activity of task.activities) {
                if (!activity.description) {
                    console.error(`Activity in Task ID ${task._id} is missing 'description' field.`);
                    allValid = false;
                }
            }
        }
    }

    if (allValid) {
        console.log('All updates verified successfully.');
    } else {
        console.error('Verification failed for some tasks.');
    }

    return allValid;
}

// Main function to run all steps sequentially
async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mongodb_testiiiiii', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`
        ====================
        Date of execution: 14-Oct-2023
        PURPOSE:
        ${metadata.purpose}

        ======================
        STEPS:
        ${metadata.steps}

        =====================
        ${'Post Change Activities'.toUpperCase()}:
        ${metadata.postChangeActivities}

        ========================
        `);

        console.log(`
            1. Update 'description' to array of 'smartContent' in Task.model's Task
            2. Update 'description' field to 'smartContent' of Task.model's Activity object in each task
        `);

        await updateDescriptionInTasks();

        console.log('Step 2: Verifying updates...');
        await verify();

        console.log('Process completed successfully.');
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await mongoose.connection.close();
    }
}

main();
