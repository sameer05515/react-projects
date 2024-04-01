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

const categorySchema = new mongoose.Schema({
    cat_id: Number,
    cat_name: String,
    rating: Number,
    questions: [{
      ques_id: Number,
      linked_cat_id: Number,
      ques: String,
      rating: Number,
      hidden: Boolean,
      answers: [{
        ans_id: Number,
        answer: String,
        rating: Number
      }]
    }]
  });
  

const Category = mongoose.model('Category', categorySchema);

mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
  
    mysqlConnection.query("SELECT * FROM t_catg_ques_ans", (err, result) => {
      if (err) throw err;
  
      result.forEach(answer => {
        Category.findOneAndUpdate(
        //   { "questions.ques_id": answer.linked_ques_id }, // Find the category with the matching question ID
        
        { "questions": { $elemMatch: { "ques_id": answer.linked_ques_id, "linked_cat_id": answer.linked_cat_id } } }, // Find the category with the matching question ID and linked_cat_id
        
          { $push: { "questions.$.answers": { // Push the answer to the matching question's answers array
            ans_id: answer.ans_id,
            answer: answer.answer,
            rating: answer.rating
          }}},
          { new: true }
        )
        .then(updatedCategory => {
          console.log("Answer appended to question in category:", updatedCategory);
        })
        .catch(err => {
          console.error("Error appending answer to question in category:", err);
        });
      });
  
      mysqlConnection.end();
      console.log("MySQL connection closed");
    });
  });
  