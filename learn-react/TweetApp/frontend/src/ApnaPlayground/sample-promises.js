import { LoaderStates } from "../common/hooks/useConsolidated/LoaderWithTitle";
import {
  notify,
  updateNotification,
} from "../common/hooks/useConsolidated/toast-utils";

// Generate a random number
export const getRandomNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      if (randomNumber > 0) {
        resolve({ randomNumber, isError: false, message: "" });
      } else {
        reject({
          randomNumber: null,
          isError: true,
          message: "Error generating random number",
        });
      }
    }, 7000); // 7-second delay
  });
};

// Generate a random number with Toast notifications
export const getRandomNumberWithToastNotifications = () => {
  const toastId = notify("Generating a random number...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      if (randomNumber > 0) {
        resolve({ randomNumber, isError: false, message: "" });
        updateNotification(
          toastId,
          "Random number generated!",
          LoaderStates.success
        );
      } else {
        reject({
          randomNumber: null,
          isError: true,
          message: "Error generating random number",
        });
        updateNotification(
          toastId,
          "Error generating number",
          LoaderStates.error
        );
      }
    }, 7000); // 7-second delay
  });
};

/**
 * Creates a delay for the specified number of milliseconds.
 *
 * @param {number} delay - The delay duration in milliseconds. Defaults to 100ms if not provided.
 *                         Must be an integer between 100 (min) and 15000 (max).
 * @returns {Promise<string>} A promise that resolves with the string "success" after the delay.
 *
 * @throws {Error} If the `delay` is not an integer or is outside the allowed range.
 * @example
 * // Basic usage:
 * await delayForMS(500); // Waits for 500ms and resolves with "success".
 */
export const delayForMS = (delay = 100) => {
  const DEFAULT_DELAY = { min: 100, max: 15000 };

  // Validate the delay parameter
  if (delay == null) {
    throw new Error(
      `Provided delay is null or undefined. Please provide a valid integer.`
    );
  }
  if (!Number.isInteger(delay)) {
    throw new Error(`Provided delay is not an integer: '${delay}'`);
  }
  if (delay < DEFAULT_DELAY.min || delay > DEFAULT_DELAY.max) {
    throw new Error(
      `Provided delay: '${delay}' is outside the allowed range {min: ${DEFAULT_DELAY.min}, max: ${DEFAULT_DELAY.max}}`
    );
  }

  // Return a promise that resolves after the calculated delay
  return new Promise((resolve) => setTimeout(() => resolve("success"), delay));
};

/**
 * A utility function to create a Promise-based `setInterval`.
 * This allows developers to execute a callback function at regular intervals for a specified number of iterations
 * and resolve or reject the Promise upon completion or error.
 *
 * @param {Function} callback - The function to execute at each interval.
 *                              Ensure this function does not have side effects or throw unhandled errors.
 * @param {number} intervalMs - The duration of the interval in milliseconds. Must be a positive integer.
 * @param {number} iterations - The number of times the `callback` function should execute. Must be a positive integer.
 *
 * @returns {Promise<string>} - A Promise that resolves with a success message after the specified number of iterations
 *                              or rejects if an error occurs in the callback during execution.
 *
 * @throws {Error} - Throws an error if:
 *                   - `callback` is not a function.
 *                   - `intervalMs` is not a positive integer.
 *                   - `iterations` is not a positive integer.
 *
 * @example
 * // Basic Usage:
 * createIntervalPromise(() => console.log("Executing..."), 1000, 5)
 *   .then((message) => console.log(message))
 *   .catch((error) => console.error(error));
 *
 * @example
 * // Using with async/await:
 * (async () => {
 *   try {
 *     const result = await createIntervalPromise(() => console.log("Hello!"), 2000, 3);
 *     console.log(result); // "Completed 3 iterations"
 *   } catch (error) {
 *     console.error("Error occurred during execution:", error);
 *   }
 * })();
 *
 * @description
 * - The `callback` function is executed every `intervalMs` milliseconds.
 * - After `iterations` executions, the interval is cleared, and the Promise resolves.
 * - If the `callback` function throws an error during any execution, the interval is cleared, and the Promise rejects.
 * - This is particularly useful when you need controlled periodic execution with error handling in an asynchronous flow.
 *
 * @note
 * - The function is synchronous, but the returned Promise allows integration into asynchronous workflows.
 * - Be cautious about memory leaks if the `callback` has unintended side effects.
 * - Use this utility when you need deterministic control over interval-based asynchronous execution.
 */

export const createIntervalPromise = (callback, intervalMs, iterations) => {
  if (typeof callback !== "function") {
    throw new Error("Callback must be a function");
  }
  if (!Number.isInteger(intervalMs) || intervalMs <= 0) {
    throw new Error("Interval must be a positive integer");
  }
  if (!Number.isInteger(iterations) || iterations <= 0) {
    throw new Error("Iterations must be a positive integer");
  }

  return new Promise((resolve, reject) => {
    let count = 0;
    const intervalId = setInterval(() => {
      try {
        callback();
        count++;
        if (count >= iterations) {
          clearInterval(intervalId);
          resolve(`Completed ${iterations} iterations`);
        }
      } catch (error) {
        clearInterval(intervalId);
        reject(error);
      }
    }, intervalMs);
  });
};
