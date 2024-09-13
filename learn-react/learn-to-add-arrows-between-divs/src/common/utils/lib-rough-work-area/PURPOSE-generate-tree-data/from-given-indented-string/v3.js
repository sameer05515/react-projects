const input = `
Root
 Child 1
  Grandchild 1
   Grandchild 2
 Child 2
  Grandchild 3
`;

// Convert the input string into an array of lines with names and levels
const getLineArray = (input) => {
  return input.trim().split("\n").map((line, index) => ({
    name: line.trim(),
    level: line.search(/\S/),
    index
  }));
};

// Validate input or return an empty line array
const validInputAndReturnLineArray = (input) => {
  let valid = true;

  if (!input) {
    console.log('Input is null or empty');
    valid = false;    
  } else if (typeof input !== 'string') {
    console.log('Input is not a string');
    valid = false;
  }

  if (!valid) return [];

  const lineArray = getLineArray(input);
  
  // Check for consistent indentation
  let previousLevel = lineArray[0].level;
  for (let i = 1; i < lineArray.length; i++) {
    const currentLevel = lineArray[i].level;
    if (currentLevel < previousLevel && currentLevel > previousLevel - 1) {
      console.log('Inconsistent indentation at line:', lineArray[i].name);
      return [];
    }
    previousLevel = currentLevel;
  }

  return lineArray;
};

// Build the tree data from the input string
const buildTreeData = (input) => {
  const lineArray = validInputAndReturnLineArray(input) || [];

  const root = [];
  const stack = [];

  lineArray.forEach((line) => {
    const node = { name: line.name, children: [] };

    if (stack.length === 0) {
      // Root node
      root.push(node);
    } else {
      // Pop stack until the correct parent node is found or stack is empty
      while (stack.length > line.level) {
        stack.pop();
      }

      // The last item in the stack is the parent of the current node
      stack[stack.length - 1].children.push(node);
    }

    // Push the current node onto the stack
    stack.push(node);
  });

  return root;
};

// Generate the tree data and print it
const treeData = buildTreeData(input);
console.log(JSON.stringify(treeData, null, 2));
