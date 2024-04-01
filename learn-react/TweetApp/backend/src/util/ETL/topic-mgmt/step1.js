const mysql = require('mysql');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import the v4 function from the uuid library

// MySQL connection configuration
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin@123',
    database: 'topic_mgmt',
    insecureAuth: true,
});

// MongoDB connection configuration
mongoose.connect('mongodb://127.0.0.1:27017/test_topic_mgmt_db', { useNewUrlParser: true, useUnifiedTopology: true });
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the schema for MongoDB
const TopicSchema = new mongoose.Schema({
    topicId: { type: String, unique: true, default: () => uuidv4(), },
    name: { type: String, required: true, },
    oldRdbmsId: { type: Number },
    description: { type: String, },
    tags: [String],
    rating:{type:Number, },
    isPrivate:{type:Boolean, default: false},
    occurenceDate: { type: Date, default: Date.now, /**Default value is the current date and time*/ },
    createdDate: { type: Date, default: Date.now, },
    updatedDate: { type: Date, default: Date.now, }
});

const Topic = mongoose.model('Topic', TopicSchema);

// Fetch data from MySQL and save to MongoDB
mysqlConnection.connect((err) => {
    if (err) { throw err; }
    console.log("Connected to MySQL database");

    mysqlConnection.query("SELECT ID, creation_date, last_updation_date, description, isprivate, rating, title FROM topic"
        , (err, result) => {
            if (err) throw err;

            result.forEach(row => {
                const newTopic = new Topic({
                    oldRdbmsId: row.ID,
                    createdDate: row.creation_date,
                    updatedDate: row.last_updation_date,
                    occurenceDate: row.creation_date,
                    description: row.description,
                    isPrivate: row.isPrivate,
                    rating:row.rating,
                    name: row.title
                });
                newTopic.save()
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