// const mongoose = require('mongoose');

// // Replace 'your_database_name' with the actual name of your MongoDB database
// const mongoDBUrl = 'mongodb+srv://prem:India@123@cluster0.h9zdm.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB successfully!');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
//   });

// const username = "prem";
// const password = "India@123";
// const cluster = "cluster0.h9zdm";
// const dbname = "mongodb_test";

// mongoose.connect(
//   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// );


// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });


// const mongoose = require('mongoose');

// const username = "prem";
// const password = "India@123";
// const cluster = "cluster0.h9zdm";
// const dbname = "mongodb_test";

const mongoose = require('mongoose');

// Replace 'YOUR_USERNAME', 'YOUR_PASSWORD', 'YOUR_CLUSTER_NAME', and 'YOUR_DATABASE_NAME' with your actual MongoDB Atlas credentials
const username = 'prem';
const password = 'India@123';
const clusterName = 'cluster0.h9zdm';
const databaseName = 'mongodb_test';

// const mongoDBUri = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const mongoDBUri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(
  password
)}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas!');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});
