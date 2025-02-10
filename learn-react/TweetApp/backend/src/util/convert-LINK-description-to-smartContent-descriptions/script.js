const mongoose = require('mongoose');
const Link = require('../../routes/Link.model'); // Adjust the path as necessary

const metadata = {
    dateOfExecution:'10-Feb-2025',
    purpose: `convert 
    1. 'description' field of Link.model's Link to array of 'smartContent'
    2. 'description' field of Link.model's Activity to 'smartContent'
    `,
    steps: `
    Plan of Execution
    1. Take backup of links collection
    2. Fetch all links
    3. Convert 'description' to array of 'smartContent', and add a new field name 'descriptions'. Now a link can have zero or more smartContents.
    3.1. Delete 'description' field of Link.model's Link
    4. For each link object, iterate array of Link.model's Activity, field name 'activities'.
    5. Convert 'description' field to 'smartContent' of Link.model's Activity object, and add a new field name 'descr'.
    6. Verify changes
    `,
    postChangeActivities: `
    Make proper UI changes for the above activity
    Raise PR and commit changes
    `
};

// 1. Update 'description' to array of 'smartContent' in Link.model's Link
// 2. Update 'description' field to 'smartContent' of Link.model's Activity object in each link
async function updateDescriptionInTasks() {
    try {
        console.log("Starting updateDescriptionInTasks")
        const links = await Link.find().exec();

        const taskUpdates = links.map(async link => {
            if (link.description) {
                // link.descriptions = [
                //     {
                //         content: link.description,
                //         textOutputType: 'html',
                //         textInputType: 'CKEditor'
                //     }
                // ];
                link.description=undefined;
            }

            // if (link.activities && link.activities.length > 0) {
            //     link.activities = link.activities.map(act => ({
            //         ...act,
            //         // descr: {
            //         //     content: act.description,
            //         //     textOutputType: 'html',
            //         //     textInputType: 'CKEditor'
            //         // },
            //         // description: act.descr,
            //         descr: undefined
            //     }));
            // }

            return link.save();
        });

        await Promise.all(taskUpdates); // Execute all updates in parallel
        console.log("completed updateDescriptionInTasks")
    } catch (error) {
        console.error("Error in updateDescriptionInTasks",'Error updating links:', error);
        throw error;
    }
}

// Verifying changes
async function verify() {
    console.log('Verifying updates...');

    const links = await Link.find().exec();
    let allValid = true;

    for (const link of links) {
        // Check if 'descriptions' field is added and 'description' is removed
        if (!link.descriptions || !Array.isArray(link.descriptions)) {
            console.error(`Link ID ${link._id} is missing the 'descriptions' array.`);
            allValid = false;
        }

        // Check if 'activities' has 'descr' field
        if (link.activities && link.activities.length > 0) {
            for (const activity of link.activities) {
                if (!activity.description) {
                    console.error(`Activity in Link ID ${link._id} is missing 'description' field.`);
                    allValid = false;
                }
            }
        }
    }

    if (allValid) {
        console.log('All updates verified successfully.');
    } else {
        console.error('Verification failed for some links.');
    }

    return allValid;
}

// Main function to run all steps sequentially
async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mongodb_testiiii', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // console.log(`
        // ====================
        // Date of execution: 14-Oct-2023
        // PURPOSE:
        // ${metadata.purpose}

        // ======================
        // STEPS:
        // ${metadata.steps}

        // =====================
        // ${'Post Change Activities'.toUpperCase()}:
        // ${metadata.postChangeActivities}

        // ========================
        // `);

        console.log(`
            1. Update 'description' to array of 'smartContent' in Link.model's Link
            2. Update 'description' field to 'smartContent' of Link.model's Activity object in each link
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
