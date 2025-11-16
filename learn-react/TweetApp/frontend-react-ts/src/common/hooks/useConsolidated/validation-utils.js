// Utility: Validate if the argument is a function
const validateFunction = (fn, name = "argument") => {
  if (typeof fn !== "function") {
    throw new Error(`Provided ${name} is not a function`);
  }
};

// Utility: Validate if the argument is a Promise
const validatePromise = (promise, name = "Promise") => {
  if (!(promise instanceof Promise)) {
    throw new Error(`Provided ${name} must return a Promise`);
  }
};

// Utility: Validate if the result is a boolean
const validateBoolean = (result) => {
  if (typeof result !== "boolean") {
    throw new Error("Validator function must return a boolean result");
  }
};

// Utility: Validate if the promise resolves to the expected structure
const validatePromiseResult = (result) => {
  if (
    typeof result !== "object" ||
    result === null ||
    !("data" in result) ||
    !("isError" in result) ||
    !("message" in result)
  ) {
    throw new Error("Promise must resolve to the expected structure");
  }
};

export {
  validateFunction,
  validatePromise,
  validateBoolean,
  validatePromiseResult,
};
