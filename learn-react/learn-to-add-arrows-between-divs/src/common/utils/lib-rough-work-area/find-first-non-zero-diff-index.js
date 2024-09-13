const findFirstNonZeroDifferenceIndex = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const diff = arr[i] - arr[i - 1];
        if (diff !== 0) {
            return i; // Return the index of the second element in the first non-zero difference
        }
    }
    return -1; // Return -1 if all differences are zero
};

// Example usage:
const arr = [1, 1, 3,3, 5, 3, 1];
const index = findFirstNonZeroDifferenceIndex(arr);
console.log(index); // Output will be 2 (index of the first 3)


const validateIfAllLinesHaveMoreIndentationThanFirstLine = (arr) => {


    // If the array has only one element, return true
    if (arr.length === 1) {
        return true;
    }

    // Store the first element
    const firstNumber = arr[0];

    // Check if any number is less than the first number
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < firstNumber) {
            return false;
        }
    }

    return true;
};

// Example usage:
const arr1 = [10, 15, 20, 25];
const arr2 = [10, 5, 15, 20];
const arr3 = [5];
const arr4 = []; // Example of invalid input

console.log(validateIfAllLinesHaveMoreIndentationThanFirstLine(arr1)); // Output: true
console.log(validateIfAllLinesHaveMoreIndentationThanFirstLine(arr2)); // Output: false
console.log(validateIfAllLinesHaveMoreIndentationThanFirstLine(arr3)); // Output: true
// console.log(validateArray(arr4)); // This will throw an error: "Array must have at least one element."

