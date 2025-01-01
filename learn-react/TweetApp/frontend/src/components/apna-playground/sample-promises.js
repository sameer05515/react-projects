import { LoaderStates } from "../../common/hooks/useConsolidated/LoaderWithTitle";
import {
  notify,
  updateNotification,
} from "../../common/hooks/useConsolidated/toast-utils";

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
      throw new Error(`Provided delay is null or undefined. Please provide a valid integer.`);
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
