const mysql = require('mysql');
const fs = require('fs');

// MySQL configuration
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin@123',
  database: 'interview_mgmt_sep_27_2019',
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

  // Fetch data from each table
  fetchTableData('t_category', 'resourses/interview-mgmt/categories.json');
  fetchTableData('t_catg_ques', 'resourses/interview-mgmt/questions.json');
  fetchTableData('t_catg_ques_ans', 'resourses/interview-mgmt/answers.json');
  fetchTableData('t_catg_ques_read_history', 'resourses/interview-mgmt/read_history.json');

  // Close MySQL connection
  mysqlConnection.end();
});

function fetchTableData(tableName, outputFile) {
  const query = `SELECT * FROM ${tableName}`;

  mysqlConnection.query(query, (err, results) => {
    if (err) {
      console.error(`Error fetching data from ${tableName}:`, err);
      return;
    }

    const jsonData = JSON.stringify(results, null, 2);

    // Write data to JSON file
    fs.writeFile(outputFile, jsonData, (writeErr) => {
      if (writeErr) {
        console.error(`Error writing data to ${outputFile}:`, writeErr);
      } else {
        console.log(`Data from ${tableName} written to ${outputFile}`);
      }
    });
  });
}
