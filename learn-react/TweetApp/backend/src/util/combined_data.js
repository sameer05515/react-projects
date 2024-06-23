const mysql = require('mysql');
const fs = require('fs');

// MySQL configuration
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin@123',
  database: 'interview_mgmt',
  insecureAuth: true,
};

// Create MySQL connection
const mysqlConnection = mysql.createConnection(mysqlConfig);

// Connect to MySQL
mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL');

  // Step 1: Fetch all category IDs
  fetchCategoryIds();
});

function fetchCategoryIds() {
  const query = 'SELECT cat_id, cat_name, rating FROM t_category';

  mysqlConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching category IDs:', err);
      mysqlConnection.end();
      return;
    }

    // Initialize an array to store all data
    const allData = [];

    console.log(JSON.stringify(results, null, 2));

    // Step 2: Iterate through each category ID
    results.forEach((category) => {
      const categoryId = category.cat_id;

      // Step 3: Fetch questions for the given category ID
      fetchQuestions(categoryId, allData);
    });
  });
}

function fetchQuestions(categoryId, allData) {
  const query = 'SELECT ques_id FROM t_catg_ques WHERE linked_cat_id = ?';

  mysqlConnection.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error(`Error fetching questions for category ID ${categoryId}:`, err);
      return;
    }

    // Step 4: Fetch answers for each question ID
    results.forEach((question) => {
      const questionId = question.ques_id;
      fetchAnswers(questionId, categoryId, allData);
    });
  });
}

function fetchAnswers(questionId, categoryId, allData) {
  const query = 'SELECT * FROM t_catg_ques_ans WHERE linked_ques_id = ? AND linked_cat_id = ?';

  mysqlConnection.query(query, [questionId, categoryId], (err, results) => {
    if (err) {
      console.error(`Error fetching answers for question ID ${questionId} and category ID ${categoryId}:`, err);
      return;
    }

    // Combine all data into a single JSON object
    const jsonData = {
      categoryId,
      questionId,
      answers: results,
    };

    // Append data to the array
    allData.push(jsonData);

    // Write the entire array to the JSON file
    fs.writeFile('resourses/interview-mgmt/combined/combined_data.json', JSON.stringify(allData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing data to combined_data.json:', writeErr);
      } else {
        console.log(`Data for question ID ${questionId} and category ID ${categoryId} written to combined_data.json`);
      }
    });
  });
}
