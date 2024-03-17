const mysql = require('mysql');
const fs = require('fs');

// MySQL configuration
const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin@123',
    database: 'topic_mgmt_sep_27_2019',
    insecureAuth: true,
  };

// Create a MySQL connection
const connection = mysql.createConnection(mysqlConfig);

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL');

  // Query to fetch data from the 'topic' table
  const query = 'SELECT * FROM topic';

  // Execute the query
  connection.query(query, (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      connection.end();
      return;
    }

    // Convert the MySQL result to JSON format
    const jsonData = JSON.stringify(results, null, 2);

    // Specify the output file path
    const outputFile = 'C:/Prem/GIT/react-projects/learn-react/TweetApp/backend/resourses/topic_mgmt_sep_27_2019/topics.json';

    // Write the JSON data to the output file
    fs.writeFile(outputFile, jsonData, (writeErr) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
      } else {
        console.log(`Data written to ${outputFile}`);
      }

      // Close the MySQL connection
      connection.end();
    });
  });
});
