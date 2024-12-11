import ErrorCodes from "./error-code";

// Define types
type Node = {
  name: string;
  level: number;
  children: Node[];
};

export type ValidationResult = {
  isValid: boolean;
  errorCode: string;
  message: string;
  data: Node[];
};

// Function to determine the indentation level of a line
const getIndentationLevel = (line: string): number => line.search(/\S/);

// Function to check if all indentation levels are equal
const areAllLevelsEqual = (levels: number[]): boolean => {
  const uniqueLevels = Array.from(new Set(levels));
  return uniqueLevels.length === 1;
};

// Function to calculate the difference between consecutive indentation levels
const calculateDifferences = (levels: number[]): number[] => {
  const differences: number[] = [];
  for (let i = 1; i < levels.length; i++) {
    differences.push(levels[i] - levels[i - 1]);
  }
  return differences;
};

// Function to check if differences are consistent
const areDifferencesConsistent = (differences: number[]): boolean => {
  const firstDifference = differences[0];
  return differences.every(
    (diff) => diff === firstDifference || diff % firstDifference === 0
  );
};

// Function to build the hierarchical tree from lines
const buildTreeFromLines = (
  lines: string[],
  firstIndentation: number,
  firstDifference: number
): Node[] => {
  const result: Node[] = [];
  const stack: Node[] = [{ name: lines[0].trim(), level: 0, children: [] }];
  result.push(stack[0]);

  for (let i = 1; i < lines.length; i++) {
    const level =
      (getIndentationLevel(lines[i]) - firstIndentation) / firstDifference;
    const node: Node = { name: lines[i].trim(), level, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length > 0) {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
    result.push(node);
  }

  return result;
};

// Main validation function
const validate = (lines: string[]): ValidationResult => {
//   if (typeof input !== "string") {
//     return {
//       isValid: false,
//       errorCode: ErrorCodes.INVALID_INPUT.code,
//       message: ErrorCodes.INVALID_INPUT.message,
//       data: [],
//     };
//   }

//   const lines = input
//     .split("\n")
//     .map((line) => line.trimEnd())
//     .filter((line) => line.length > 0);

  if (!lines || lines.length === 0) {
    return {
      isValid: false,
      errorCode: ErrorCodes.EMPTY_INPUT.code,
      message: ErrorCodes.EMPTY_INPUT.message,
      data: [],
    };
  }

  if (lines.length === 1) {
    return {
      isValid: true,
      errorCode: ErrorCodes.SUCCESS.code,
      message: ErrorCodes.SUCCESS.message,
      data: [{ name: lines[0].trim(), level: 0, children: [] }],
    };
  }

  const firstIndentation = getIndentationLevel(lines[0]);
  const levels = lines.map((line) => getIndentationLevel(line));

  if (areAllLevelsEqual(levels)) {
    return {
      isValid: true,
      errorCode: ErrorCodes.SUCCESS.code,
      message: ErrorCodes.SUCCESS.message,
      data: lines.map((line) => ({
        name: line.trim(),
        level: 0,
        children: [],
      })),
    };
  }

  const differences = calculateDifferences(levels);
  if (!areDifferencesConsistent(differences)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INCONSISTENT_INDENTATION.code,
      message: ErrorCodes.INCONSISTENT_INDENTATION.message,
      data: [],
    };
  }

  // Validate indentation
  const firstDifference = differences[0];
  if (firstDifference <= 0) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_INDENTATION.code,
      message: ErrorCodes.INVALID_INDENTATION.message,
      data: [],
    };
  }

  const result = buildTreeFromLines(lines, firstIndentation, firstDifference);

  return {
    isValid: true,
    errorCode: ErrorCodes.SUCCESS.code,
    message: ErrorCodes.SUCCESS.message,
    data: result,
  };
};

export default validate;
