const mongoose = require('mongoose');
const { Topic,TopicSection } = require('../../routes/Topic.model'); // Adjust the path as needed

const metadata={
    dateOfExecution:'14-Oct-2023',
    purpose: `convert 
    1. 'description' field of Topic.model's Topic to 'smartContent'
    2. remove 'description' field of Topic.model's Topic by assigning 'undefined' value
    `,
    steps:`
1. fetch 10 records from document .
2. check if smartContent is null or undefined
3. if not, just skip
4. if yes, add smartContent field as follows
{
                        content: topic.description, 
                        textOutputType: 'html',
                        textInputType: 'CKEditor'
                    } 
5. Save data and fetch next 10 records, till last page reached.
    `
}

async function updateSmartContentForTopics(batchSize = 10) {
  try {
    let hasMoreRecords = true;
    let skip = 0;

    while (hasMoreRecords) {
      // Fetch 10 records in a batch
      const topics = await Topic.find({})
        .skip(skip)
        .limit(batchSize)
        .lean(); // Fetch records as plain JavaScript objects

      if (topics.length === 0) {
        hasMoreRecords = false; // No more records to process
        break;
      }

      for (const topic of topics) {
        if (topic.smartContent === null || topic.smartContent === undefined) {
          // Update smartContent field
          topic.smartContent = {
            content: topic.description || '',
            textOutputType: 'html',
            textInputType: 'CKEditor',
          };

          // Save the updated record
          await Topic.updateOne({ _id: topic._id }, { $set: { smartContent: topic.smartContent } });
        }
      }

      // Move to the next batch
      skip += batchSize;
    }

    console.log('Update process completed.');
  } catch (err) {
    console.error('Error updating smartContent:', err);
  }
}

async function deleteDescriptionField(batchSize = 10){
    try {
        let hasMoreRecords = true;
        let skip = 0;
    
        while (hasMoreRecords) {
          // Fetch 10 records in a batch
          const topics = await Topic.find({})
            .skip(skip)
            .limit(batchSize);
            //.lean(); // Fetch records as plain JavaScript objects
    
          if (topics.length === 0) {
            hasMoreRecords = false; // No more records to process
            break;
          }
    
          for (const topic of topics) {
            // if (topic.smartContent === null || topic.smartContent === undefined) {
            //   // Update smartContent field
            //   topic.smartContent = {
            //     content: topic.description || '',
            //     textOutputType: 'html',
            //     textInputType: 'CKEditor',
            //   };
    
            //   // Save the updated record
            //   await Topic.updateOne({ _id: topic._id }, { $set: { smartContent: topic.smartContent } });
            // }
            // await Topic.updateOne({ _id: topic._id }, { $set: { description: undefined } });
            topic.description=undefined;
            topic.save();
          }
    
          // Move to the next batch
          skip += batchSize;
        }
    
        console.log('Update process completed.');
      } catch (err) {
        console.error('Error updating smartContent:', err);
      }
}

async function addSoftDeleteField(batchSize = 10){
    try {
        let hasMoreRecords = true;
        let skip = 0;
    
        while (hasMoreRecords) {
          // Fetch 10 records in a batch
          const topics = await TopicSection.find({})
            .skip(skip)
            .limit(batchSize)
            .lean(); // Fetch records as plain JavaScript objects
    
          if (topics.length === 0) {
            hasMoreRecords = false; // No more records to process
            break;
          }
    
          for (const topic of topics) {
            // if (topic.smartContent === null || topic.smartContent === undefined) {
            //   // Update smartContent field
            //   topic.smartContent = {
            //     content: topic.description || '',
            //     textOutputType: 'html',
            //     textInputType: 'CKEditor',
            //   };
    
            //   // Save the updated record
            //   await Topic.updateOne({ _id: topic._id }, { $set: { smartContent: topic.smartContent } });
            // }
            await TopicSection.updateOne({ _id: topic._id }, { $set: { softDelete: false } });
            // topic.softDelete=false;
            // topic.save();
          }
    
          // Move to the next batch
          skip += batchSize;
        }
    
        console.log('Update process completed.');
      } catch (err) {
        console.error('Error updating smartContent:', err);
      }
}



// Connect to MongoDB and execute the utility
(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongodb_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB.');

    // Execute the function
    // await updateSmartContentForTopics();
    // await deleteDescriptionField();
    await addSoftDeleteField();


    mongoose.disconnect();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();
