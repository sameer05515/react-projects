const mysql = require('mysql');
const mongoose = require('mongoose');

// MySQL connection configuration
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin@123',
  database: 'interview_mgmt',
  insecureAuth: true,
});

// MongoDB connection configuration
mongoose.connect('mongodb://127.0.0.1:27017/test_intvw_mgmt_db', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://127.0.0.1:27017/test_intvw_mgmt_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   bufferCommands: false, // Disable buffering
//   bufferTimeoutMS: 10000 // Increase buffer timeout (in milliseconds)
// });
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the schema for MongoDB
const categorySchema = new mongoose.Schema({
  cat_id: Number,
  cat_name: String,
  rating: Number
});

const Category = mongoose.model('Category', categorySchema);

// Fetch data from MySQL and save to MongoDB
mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");

  mysqlConnection.query("SELECT cat_id, cat_name, rating FROM t_category", (err, result) => {
    if (err) throw err;

    result.forEach(category => {
      const newCategory = new Category({
        cat_id: category.cat_id,
        cat_name: category.cat_name,
        rating: category.rating
      });
      newCategory.save()
        .then((result) => {
          console.log("Document inserted into MongoDB:", result);
        })
        .catch((mongoError) => {
          console.error("Error inserting document into MongoDB:", mongoError);
        });
    });

    mysqlConnection.end();
    console.log("MySQL connection closed");
  });
});
