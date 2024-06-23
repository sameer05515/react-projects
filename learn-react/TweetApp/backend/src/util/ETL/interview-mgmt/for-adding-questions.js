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
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the schema for MongoDB
const categorySchema = new mongoose.Schema({
  cat_id: Number,
  cat_name: String,
  rating: Number,
  questions: [{
    ques_id: Number,
    linked_cat_id: Number,
    ques: String,
    rating: Number,
    hidden: Boolean
  }]
});

const Category = mongoose.model('Category', categorySchema);

// Fetch questions from MySQL and append to category documents in MongoDB
// mysqlConnection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL database");

//   mysqlConnection.query("SELECT * FROM t_catg_ques", (err, result) => {
//     if (err) throw err;

//     result.forEach(question => {
//       Category.findOneAndUpdate(
//         { cat_id: question.linked_cat_id },
//         { $push: { questions: {
//           ques_id: question.ques_id,
//           linked_cat_id: question.linked_cat_id,
//           ques: question.ques,
//           rating: question.rating,
//           hidden: question.hidden
//         }}},
//         { new: true },
//         (err, updatedCategory) => {
//           if (err) throw err;
//           console.log("Question appended to category:", updatedCategory);
//         }
//       );
//     });

//     mysqlConnection.end();
//     console.log("MySQL connection closed");
//   });
// });


mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
  
    mysqlConnection.query("SELECT * FROM t_catg_ques", (err, result) => {
      if (err) throw err;
  
      result.forEach(question => {
        Category.findOneAndUpdate(
          { cat_id: question.linked_cat_id },
          { $push: { questions: {
            ques_id: question.ques_id,
            linked_cat_id: question.linked_cat_id,
            ques: question.ques,
            rating: question.rating,
            hidden: question.hidden
          }}},
          { new: true }
        )
        .then(updatedCategory => {
          console.log("Question appended to category:", updatedCategory);
        })
        .catch(err => {
          console.error("Error appending question to category:", err);
        });
      });
  
      mysqlConnection.end();
      console.log("MySQL connection closed");
    });
  });
  