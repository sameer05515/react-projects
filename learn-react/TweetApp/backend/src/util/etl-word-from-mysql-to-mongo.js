const mysql = require("mysql");
const mongoose = require("mongoose");

// MySQL configuration
const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "word_meaning",
  insecureAuth: true,
};

// MongoDB configuration
const mongoURI = "mongodb://127.0.0.1:27017/mongodb_test";

// Mongoose schema
const wordSchema = new mongoose.Schema({
  id: Number,
  unique_name: String,
  word: String,
  type: String,
  details: String,
  created_on: Date,
  updated_on: Date,
  last_read: Date,
});

const Word = mongoose.model("Word", wordSchema);

// Create MySQL connection
const mysqlConnection = mysql.createConnection(mysqlConfig);

// Connect to MySQL
mysqlConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL");

  // Paginate the select query to fetch 100 rows at a time
  const pageSize = 100;
  let offset = 0;

  function fetchNextPage() {
    const selectQuery = `SELECT * FROM t_word LIMIT ${offset}, ${pageSize}`;

    // Execute the select query
    mysqlConnection.query(selectQuery, (selectError, results) => {
      if (selectError) {
        console.error("Error executing select query:", selectError);
        mysqlConnection.end();
        return;
      }

      if (results.length === 0) {
        // No more data, close MySQL connection
        mysqlConnection.end();
        // Close MongoDB connection after all documents are inserted
        mongoose.connection.close();
        return;
      }

      // Connect to MongoDB
      mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Insert data into MongoDB
      results.forEach((row) => {
        const newWord = new Word({
          id: row.id,
          unique_name: row.unique_name,
          word: row.word,
          type: row.type,
          details: row.details,
          created_on: row.created_on,
          updated_on: row.updated_on,
          last_read: row.last_read,
        });

        newWord
          .save()
          .then((result) => {
            console.log("Document inserted into MongoDB:", result);
          })
          .catch((mongoError) => {
            console.error("Error inserting document into MongoDB:", mongoError);
          });
      });

      // Fetch the next page
      offset += pageSize;
      fetchNextPage();
    });
  }

  // Start fetching the first page
  fetchNextPage();
});
