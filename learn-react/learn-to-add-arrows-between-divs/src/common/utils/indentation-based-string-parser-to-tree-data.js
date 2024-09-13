
/**
 * Convert the input string into an array of lines with names and indentation levels
 */
const parseLines = (input) => {
  return input
    .trim()
    .split("\n")
    .filter((line) => line && line.trim().length > 0)
    .map((line) => ({
      name: line.trim(),
      indentationLevel: line.search(/\S/),
    }));
};

/**
 * Check if the previous difference is consistent with the initial difference
 */
const isDifferenceConsistent = (prevDifference, initialDifference) => {
  if (initialDifference === 0 || prevDifference % initialDifference !== 0) {
    return false;
  }
  const ratio = prevDifference / initialDifference;
  return Math.abs(ratio) < 1;
};

/**
 * Validate the input and return an array of lines with levels or an error message
 */
const validateAndParseLines = (input) => {
  const validation = validateInput(input);
  if (!validation.isValid) {
    return validation;
  }

  const lines = parseLines(input);

  if (lines.length === 0) {
    return { data: [], isValid: false, message: "Input has no valid lines" };
  } else if (lines.length === 1) {
    return {
      data: lines.map((line) => ({ ...line, level: 0 })),
      isValid: true,
      message: "Success",
    };
  }

  const indentationValidation = validateIndentation(lines);
  if (!indentationValidation.isValid) {
    return indentationValidation;
  }

  const adjustedLines = adjustLevels(
    lines,
    indentationValidation.initialIndentationLevel,
    indentationValidation.initialDifference
  );
  return { data: adjustedLines, isValid: true, message: "Success" };
};

/**
 * Validate the input
 */
const validateInput = (input) => {
  if (!input) {
    return { data: [], isValid: false, message: "Input is null or empty" };
  } else if (typeof input !== "string") {
    return { data: [], isValid: false, message: "Input is not a string" };
  }
  return { isValid: true };
};

/**
 * Find the index of the first non-zero difference between consecutive indentation levels
 */
const findFirstNonZeroDifference = (indentationLevels) => {
  for (let i = 1; i < indentationLevels.length; i++) {
    const difference = indentationLevels[i] - indentationLevels[i - 1];
    if (difference !== 0) {
      return { index: i, difference };
    }
  }
  return { index: -1, difference: 0 }; // Return index -1 if all differences are zero
};

/**
 * Check if all lines have greater or equal indentation compared to the first line
 */
const areIndentationsConsistent = (indentationLevels) => {
  if (indentationLevels.length === 1) {
    return true;
  }

  const initialIndentation = indentationLevels[0];
  return indentationLevels
    .slice(1)
    .every((level) => level >= initialIndentation);
};

/**
 * Validate the indentation of the lines
 */
const validateIndentation = (lines) => {
  const initialIndentationLevel = lines[0].indentationLevel;
  const indentationLevels = lines.map((line) => line.indentationLevel);

  const { index: firstNonZeroIndex, difference: initialDifference } =
    findFirstNonZeroDifference(indentationLevels);

  if (firstNonZeroIndex === -1) {
    if (
      lines.every((line) => line.indentationLevel === initialIndentationLevel)
    ) {
      const flatStructure = lines.map((line) => ({
        ...line,
        level: 0,
        children: [],
      }));
      return { data: flatStructure, isValid: true, message: "Success" };
    } else {
      return {
        data: [],
        isValid: false,
        message: "All lines have zero indentation but are not flat.",
      };
    }
  }

  if (initialDifference < 0) {
    return {
      data: [],
      isValid: false,
      message:
        "Indentation of the first child must be greater than the root level.",
    };
  }

  if (!areIndentationsConsistent(indentationLevels)) {
    return {
      data: [],
      isValid: false,
      message: "Indentation levels are inconsistent.",
    };
  }

  return { isValid: true, initialIndentationLevel, initialDifference };
};

/**
 * Adjust levels based on indentation
 */
const adjustLevels = (lines, initialIndentationLevel, initialDifference) => {
  return lines.map((line) => ({
    ...line,
    level:
      (line.indentationLevel - initialIndentationLevel) / initialDifference,
  }));
};

/**
 * Build the tree data from the input string
 */
const buildTree = (input) => {
  const { data: lines, isValid, message } = validateAndParseLines(input);
  if (!isValid) {
    return { data: [], isValid, message };
  }

  const rootNodes = [];
  const nodeStack = [];

  lines.forEach((line) => {
    const node = { name: line.name, children: [] };

    while (nodeStack.length > line.level) {
      nodeStack.pop();
    }

    if (nodeStack.length === 0) {
      rootNodes.push(node);
    } else {
      nodeStack[nodeStack.length - 1].children.push(node);
    }

    nodeStack.push(node);
  });

  return { data: rootNodes, isValid, message };
};

// Generate the tree data and print it
// inputArr.forEach((input, index) => {
//   const { data: treeData, isValid, message } = buildTree(input);
//   console.log(`index: ${index}, Valid Input: ${isValid}, ${isValid ? 'data' : 'error message'}: ${isValid ? JSON.stringify(treeData, null, 0) : message}`);
// });

// inputArr.forEach(({input, expectedResult}, index) => {
//     const { data: treeData, isValid, message } = buildTree(input);
//     // console.log(`index: ${index}, Valid Input: ${isValid}, ${isValid ? 'data' : 'error message'}: ${isValid ? JSON.stringify(treeData, null, 0) : message}`);
//     console.log(`index: ${index}, expectedResult: ${expectedResult},  recieved result: ${isValid}`);
//     // console.log(`, ${isValid ? 'data' : 'error message'}: ${isValid ? JSON.stringify(treeData, null, 0) : message}`)

//   });

export {
  buildTree,
  // exampleIndentedStringArrayForTesting,
  isDifferenceConsistent,
};
