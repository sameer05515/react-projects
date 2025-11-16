/**
 * Utility to validate inputs and throw errors if invalid
 * @param {Array} inputs - Array of objects with `key`, `value`, and `type`.
 */
export const validateInputs = (inputs) => {
  inputs.forEach(({ key, value, type }) => {
    if (!value || typeof value !== type) {
      throw new Error(`Invalid ${key}: '${value}' provided. Expected ${type}.`);
    }
  });
};
