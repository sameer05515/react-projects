// Import js-yaml (for Node.js)
const jsyaml = require('js-yaml');
const jsonArray=require('./skeleton');

// Example JSON array
// const jsonArray = [
//     { name: "John", age: 30, city: "New York" },
//     { name: "Jane", age: 25, city: "London" }
// ];

// Convert JSON array to YAML string
const yamlString = jsyaml.dump(jsonArray);

// Output the YAML string
console.log(yamlString);
