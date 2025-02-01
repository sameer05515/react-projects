const mysql = require("mysql");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// MySQL connection configuration
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "word_meaning",
  insecureAuth: true,
});

// MongoDB connection configuration
mongoose.connect("mongodb://127.0.0.1:27017/mongodb_testii", { useNewUrlParser: true, useUnifiedTopology: true });
const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "MongoDB connection error:"));


// Mongoose schema
const wordSchema = new mongoose.Schema({
    id: { type: String, unique: true, default: () => uuidv4(), },
    unique_name: String,
    word: String,
    type: String,
    details: String,
    created_on: Date,
    updated_on: Date,
    last_read: Date,
  });
  
const Word = mongoose.model('Word', wordSchema);


// Fetch data from MySQL and save to MongoDB
mysqlConnection.connect((err) => {
    if (err) { throw err; }
    console.log("Connected to MySQL database");

    mysqlConnection.query("SELECT ID, unique_name, word, type, details, created_on, updated_on, last_read FROM t_word"
        , (err, result) => {
            if (err) throw err;

            result.forEach(row => {
                const newWord = new Word({
                    // oldRdbmsId: row.ID,
                    unique_name: row.unique_name,
                    word: row.word,
                    type: row.type,
                    details: row.details,
                    created_on: row.created_on,
                    updated_on:row.updated_on,
                    last_read: row.last_read
                });
                newWord.save()
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