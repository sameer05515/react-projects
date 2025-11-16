/**
 * Creates a pipeline of functions that process data sequentially from left to right.
 *
 * @function pipe
 * @param {...Function} fns - A variable number of functions to be executed in sequence.
 * Each function must accept a single argument and return a value compatible with the next function in the pipeline.
 * @returns {Function} - A function that takes an initial argument and returns the final output
 * after applying all the provided functions in sequence.
 *
 * @example
 * // Example 1: Basic String Transformation
 * const toUpperCase = (str) => str.toUpperCase();
 * const appendExclamation = (str) => `${str}!`;
 *
 * const processText = pipe(toUpperCase, appendExclamation);
 * console.log(processText("hello")); // Output: "HELLO!"
 *
 * @example
 * // Example 2: Numerical Transformations
 * const multiplyBy2 = (num) => num * 2;
 * const subtract5 = (num) => num - 5;
 *
 * const calculate = pipe(multiplyBy2, subtract5);
 * console.log(calculate(10)); // Output: 15
 *
 * @example
 * // Example 3: Working with Arrays
 * const filterEvenNumbers = (arr) => arr.filter((num) => num % 2 === 0);
 * const doubleNumbers = (arr) => arr.map((num) => num * 2);
 *
 * const processArray = pipe(filterEvenNumbers, doubleNumbers);
 * console.log(processArray([1, 2, 3, 4, 5])); // Output: [4, 8]
 *
 * @example
 * // Example 4: Handling Empty Pipelines
 * const noop = pipe(); // No functions in the pipeline
 * console.log(noop("input")); // Output: "input"
 *
 * @throws {TypeError} If any argument in `fns` is not a function.
 * 
 * @see
 * Please refer [readme.md](./readme.md) for details
 */
const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), arg);

export default pipe;
