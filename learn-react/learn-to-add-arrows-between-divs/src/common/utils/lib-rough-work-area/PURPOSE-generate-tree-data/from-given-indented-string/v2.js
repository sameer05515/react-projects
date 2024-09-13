const {input1 : input, getStringifiedObject, seperator} = require('../../common/test-commons');

const parseTreeDataV1 = (input) => {
    const lines = input.trim().split("\n");
    const stack = [];

    let root = null;

    lines.forEach((line) => {
        const level = line.search(/\S/); // Indentation level
        const node = { name: line.trim(), children: [], level };

        if (stack.length === 0) {
            // This is the root node
            root = node;
        } else {
            // Find the correct parent for the current node
            while (stack.length > level) {
                stack.pop();
            }
            stack[stack.length - 1].children.push(node);
        }

        stack.push(node);
    });

    return root ? [root] : [];
};

// // Example usage
// const input = `
//   Root
//    Child 1
//     Grandchild 1
//      Grandchild 2
//    Child 2
//     Grandchild 3
//   `;

console.log(getStringifiedObject(parseTreeDataV1(input), true));
