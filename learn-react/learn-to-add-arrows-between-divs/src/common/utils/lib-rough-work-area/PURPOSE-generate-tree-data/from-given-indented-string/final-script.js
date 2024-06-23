const input = `
Root
 Child 1
  Grandchild 1
   Grandchild 2
 Child 2
  Grandchild 3
`;

const input2 = `
Root
  Child 1
    Grandchild 1
    Grandchild 2
      Super Grandchild 1
  Child 2
    Grandchild 3
`;

const input3 = `
Root
`;

const input4 = `
Radha
Shyam
`;

const inputArr = ["", null, {}, input, input2, input3, input4];

/**
 * Convert the input string into an array of lines with names and levels
 */
const getLineArray = (input) => {
  return input
    .trim()
    .split("\n")
    .map((line) => ({
      name: line.trim(),
      indentationLevel: line.search(/\S/),
    }));
};

/**
 * Check if the previous difference is consistent with the first difference
 */
const isConsistentDifference = (prevDiff, firstDiff) => {
  if (firstDiff === 0 || prevDiff % firstDiff !== 0) {
    return false;
  }
  const multiplier = prevDiff / firstDiff;
  return Math.abs(multiplier) < 1;
};

/**
 * Validate the input and return an array of lines with levels or an error message
 */
const validInputAndReturnLineArray = (input) => {
  const validationResult = validateInput(input);
  if (!validationResult.validInput) {
    return validationResult;
  }

  const lineArray = getLineArray(input);

  if (lineArray.length === 0) {
    return { data: [], validInput: false, message: "Input has no valid lines" };
  } else if (lineArray.length === 1) {
    return {
      data: lineArray.map((line) => ({ ...line, level: 0 })),
      validInput: true,
      message: "Success",
    };
  }

  const indentationValidation = validateIndentation(lineArray);
  if (!indentationValidation.validInput) {
    return indentationValidation;
  }

  const adjustedLineArray = mapLevels(lineArray, indentationValidation.firstLineIndentationLevel, indentationValidation.firstDifference);
  return { data: adjustedLineArray, validInput: true, message: "Success" };
};

/**
 * Validate the input
 */
const validateInput = (input) => {
  if (!input) {
    return { data: [], validInput: false, message: "Input is null or empty" };
  } else if (typeof input !== "string") {
    return { data: [], validInput: false, message: "Input is not a string" };
  }
  return { validInput: true };
};

/**
 * Find the index of the first non-zero difference between consecutive elements
 */
const findFirstNonZeroDifferenceIndex = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    if (diff !== 0) {
      return { index: i, difference: diff };
    }
  }
  return { index: -1, difference: 0 }; // Return index -1 if all differences are zero
};

/**
 * Validate if all lines have more indentation than the first line
 */
const validateIfAllLinesHaveMoreIndentationThanFirstLine = (arr) => {
  if (arr.length === 1) {
    return true;
  }

  const firstIndentation = arr[0];
  return arr.slice(1).every(value => value >= firstIndentation);
};

/**
 * Validate the indentation of the lines
 */
const validateIndentation = (lineArray) => {
  const firstLineIndentationLevel = lineArray[0].indentationLevel;
  const indentationLevels = lineArray.map(line => line.indentationLevel);

  const { index: firstNonZeroIndex, difference: firstDifference } = findFirstNonZeroDifferenceIndex(indentationLevels);

  if (firstNonZeroIndex === -1) {
    if (lineArray.every(line => line.indentationLevel === firstLineIndentationLevel)) {
      const flatStructure = lineArray.map((line) => ({
        ...line,
        level: 0,
        children: [],
      }));
      return { data: flatStructure, validInput: true, message: "Success" };
    } else {
      return {
        data: [],
        validInput: false,
        message: "All lines have zero indentation but are not flat.",
      };
    }
  }

  if (firstDifference < 0) {
    return {
      data: [],
      validInput: false,
      message: "Indentation of the first child must be greater than the root level.",
    };
  }

  if (!validateIfAllLinesHaveMoreIndentationThanFirstLine(indentationLevels)) {
    return {
      data: [],
      validInput: false,
      message: "Indentation levels are inconsistent.",
    };
  }

  return { validInput: true, firstLineIndentationLevel, firstDifference };
};

/**
 * Map levels based on indentation
 */
const mapLevels = (lineArray, firstLineIndentationLevel, firstDifference) => {
  return lineArray.map((line) => ({
    ...line,
    level: (line.indentationLevel - firstLineIndentationLevel) / firstDifference,
  }));
};

/**
 * Build the tree data from the input string
 */
const buildTreeData = (input) => {
  const { data: lineArray, validInput, message } = validInputAndReturnLineArray(input);
  if (!validInput) {
    return { data: [], validInput, message };
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

  return { data: [...root], validInput, message };
};

// Generate the tree data and print it
inputArr.forEach((input, index) => {
  const { data: treeData, validInput, message } = buildTreeData(input);
  console.log(`index: ${index}, Valid Input: ${validInput}, ${validInput ? 'data' : 'error message'}: ${validInput ? JSON.stringify(treeData, null, 0) : message}`);
});
