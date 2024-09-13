const {input1 : input, getStringifiedObject, seperator} = require('../../common/test-commons');

// parse input string into treeData, by identifying its indentation
const parseTreeDataV1 = (input) => {
  // 1. Get lines and indentationLevel
  const lines = input.trim().split("\n"); // Split the input into lines and remove any leading/trailing whitespace
  const stack = []; // Initialize an empty stack to hold the nodes

  lines.forEach((line) => {
    const level = line.search(/\S/); // Determine the indentation level by finding the first non-whitespace character
    const node = { name: line.trim(), children: [],level }; // Create a new node with the trimmed name and an empty children array

    // If the current level is less than the stack's length, pop elements from the stack
    while (stack.length > level) {
      stack.pop();
    }

    // If there is a parent node, push the current node into the parent's children array
    if (stack.length > 0) {
      stack[stack.length - 1].children.push(node);
    }

    // Push the current node onto the stack
    stack.push(node);
  });

  // Return the stack, which will contain the tree structure
  return stack.length > 0 ? stack : [];
};


// const differentWaysToGenerateTreeData = parseTreeDataV1(input);
// Step 1. Get lines from given input
console.clear();

// console.log(new Date().toString(), "\nStep 1. Get lines from given input");
// const linesArray = getLinesAndIndentationLevel(input);
// console.log(
//   "All lines: ",
//   getStringifiedObject(linesArray),
//   seperator
// );

// console.log('Step 2: get distinct levels from lines array');
// const distinctLevels=getDistinctLevels(linesArray);
// console.log(
//   "Distinct Levels: ",
//   getStringifiedObject(distinctLevels),
//   seperator
// );

// console.log('Result Data: ', getStringifiedObject(differentWaysToGenerateTreeData, true));

const differentWaysToGenerateTreeData = parseTreeDataV1(input);
console.log(
  "differentWaysToGenerateTreeData: \n",
  getStringifiedObject(differentWaysToGenerateTreeData, true),
  seperator
);