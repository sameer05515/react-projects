### Documentation for `pipe` Function

#### Purpose:
The `pipe` function is a utility method used to compose multiple functions into a single pipeline. It allows you to pass the output of one function as the input to the next, in a left-to-right sequence, creating clean, declarative, and readable code for performing a series of transformations or computations.

---

#### Implementation:
```javascript
const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), arg);

export default pipe;
```

---

### Explanation:

#### 1. **Parameters:**
   - `...fns`: A rest parameter that accepts any number of functions as arguments. These functions are executed sequentially from left to right.
   - `(arg)`: The initial value (or argument) passed into the composed pipeline.

#### 2. **Logic:**
   - The `reduce` method is used to iteratively pass the result of one function (`acc`) as the input to the next (`fn`) in the pipeline.
   - The first function operates on the initial argument `arg`, and each subsequent function processes the result of the previous function.

#### 3. **Return Value:**
   - Returns a new function that takes an initial input value and applies all the provided functions in sequence, ultimately returning the final output.

---

### Usage:

#### Example 1: Basic Usage
```javascript
const toUpperCase = (str) => str.toUpperCase();
const appendExclamation = (str) => `${str}!`;

const processText = pipe(toUpperCase, appendExclamation);

console.log(processText("hello")); // Output: "HELLO!"
```

**Explanation:**  
- The input `"hello"` is passed to `toUpperCase`, converting it to `"HELLO"`.  
- The result `"HELLO"` is then passed to `appendExclamation`, resulting in `"HELLO!"`.

---

#### Example 2: Working with Numbers
```javascript
const multiplyBy2 = (num) => num * 2;
const subtract5 = (num) => num - 5;

const calculate = pipe(multiplyBy2, subtract5);

console.log(calculate(10)); // Output: 15
```

**Explanation:**  
- The input `10` is passed to `multiplyBy2`, resulting in `20`.  
- The result `20` is then passed to `subtract5`, resulting in `15`.

---

#### Example 3: Chaining Array Transformations
```javascript
const filterEvenNumbers = (arr) => arr.filter((num) => num % 2 === 0);
const doubleNumbers = (arr) => arr.map((num) => num * 2);

const processArray = pipe(filterEvenNumbers, doubleNumbers);

console.log(processArray([1, 2, 3, 4, 5])); // Output: [4, 8]
```

**Explanation:**  
- The array `[1, 2, 3, 4, 5]` is passed to `filterEvenNumbers`, returning `[2, 4]`.  
- The filtered array `[2, 4]` is then passed to `doubleNumbers`, returning `[4, 8]`.

---

### Benefits:
1. **Readability:**  
   - `pipe` enables clean, declarative code by chaining operations in a natural left-to-right flow.

2. **Reusability:**  
   - You can compose reusable pipelines for complex transformations, avoiding repetitive code.

3. **Functional Programming Style:**  
   - Encourages immutability and function composition, which are core principles of functional programming.

4. **Scalability:**  
   - Adding or removing functions in the pipeline is straightforward without affecting the overall logic.

---

### Edge Cases:
1. **Empty Pipeline:**
   ```javascript
   const noop = pipe();
   console.log(noop("input")); // Output: "input"
   ```
   - If no functions are provided, the input is returned as-is.

2. **Non-Function Arguments:**
   - Ensure all arguments passed to `pipe` are valid functions. Otherwise, it will throw a `TypeError`.

3. **Side Effects:**
   - Avoid adding functions with side effects to the pipeline, as it could lead to unexpected behaviors in a functional programming context.

---

### Comparison with `compose`:
- While `pipe` processes functions **left-to-right**, `compose` processes them **right-to-left**.  
- Example:
  ```javascript
  const compose = (...fns) => (arg) => fns.reduceRight((acc, fn) => fn(acc), arg);
  ```

  **Pipe Example:**
  ```javascript
  const result = pipe(a, b, c)(x); // c(b(a(x)))
  ```

  **Compose Example:**
  ```javascript
  const result = compose(c, b, a)(x); // c(b(a(x)))
  ```

---

### Summary:
The `pipe` function is a powerful utility for creating flexible, composable, and readable code pipelines. It is particularly useful for processing transformations in a predictable and maintainable manner.