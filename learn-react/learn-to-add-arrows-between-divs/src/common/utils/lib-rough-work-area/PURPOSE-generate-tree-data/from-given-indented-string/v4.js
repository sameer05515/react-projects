const input = `
Root
 Child 1
  Grandchild 1
   Grandchild 2
 Child 2
  Grandchild 3
`;

// const input2 = `
// Root
//   Child 1
//     Grandchild 1
//     Grandchild 2
//       Super Grandchild 1
//   Child 2
//     Grandchild 3
// `;

const inputArr = [input, '', null, {} /**, input2 **/];
/**
 * This version is failing to generate valid tree structure generation for , input2 
 * {Reason : input2 has indentation increment 2. 
 * In current version of script, it validates either indentation difference is non-negative}
 * 
 * Will create new version and resolve this issue
 */

// Convert the input string into an array of lines with names and levels
const getLineArray = (input) => {
    return input.trim().split("\n").map((line) => ({
        name: line.trim(),
        level: line.search(/\S/),
    }));
};

// Validate input or return an empty line array
const validInputAndReturnLineArray = (input) => {
    if (!input) {
        return { data: [], validInput: false, message: 'Input is null or empty' };
    } else if (typeof input !== 'string') {
        return { data: [], validInput: false, message: 'Input is not a string' };
    }

    const lineArray = getLineArray(input);

    if (lineArray.length === 0) {
        return { data: [], validInput: false, message: 'Input has no valid lines' };
    }

    // Check for consistent indentation
    let previousLevel = lineArray[0].level;
    for (let i = 1; i < lineArray.length; i++) {
        const currentLevel = lineArray[i].level;
        if (currentLevel < previousLevel && currentLevel > previousLevel - 1) {
            return { data: [], validInput: false, message: `Inconsistent indentation at line: ${lineArray[i].name}` };
        }
        previousLevel = currentLevel;
    }

    return { data: lineArray, validInput: true, message: 'Success' };
};

// Build the tree data from the input string
const buildTreeData = (input) => {
    const { data: lineArray, validInput, message } = validInputAndReturnLineArray(input);
    if (!validInput) {
        console.log(message);
        return [];
    }

    const root = [];
    const stack = [];

    lineArray.forEach((line) => {
        const node = { name: line.name, children: [] };

        while (stack.length > line.level) {
            stack.pop();
        }

        if (stack.length === 0) {
            root.push(node);
        } else {
            stack[stack.length - 1].children.push(node);
        }

        stack.push(node);
    });

    return root;
};

// Generate the tree data and print it
inputArr.forEach((input) => {
    const treeData = buildTreeData(input);
    console.log(JSON.stringify(treeData, null, 2));
});
