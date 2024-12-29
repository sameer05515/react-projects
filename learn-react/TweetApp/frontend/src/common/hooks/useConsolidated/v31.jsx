/**
 * v31 - Initial Raw Version of the useConsolidated Hook
 *
 * Overview:
 * v31 represents the foundational iteration of the `useConsolidated` hook. It was the first conceptual draft of what
 * later evolved into the refined `useConsolidated` hook in its v400 release. This version has been preserved for
 * reference purposes, enabling developers to understand the journey of improvement, refinements, and optimizations
 * that shaped the final design.
 *
 * Purpose:
 * The v31 version was designed with the intent of centralizing API request handling logic, reducing boilerplate
 * code, and standardizing the way loading states, success notifications, and error handling were implemented
 * across various API interactions in a React-based application.
 *
 * Key Features in v31:
 * 1. **Centralized Request Handling**:
 *    - The `executeApiRequest` function served as a unified handler for performing API calls with standardized
 *      behavior for handling loading states, success notifications, and error responses.
 *
 * 2. **Notification Management**:
 *    - Integrated toast notifications (via the `notify` and `updateNotification` utilities) to display user feedback
 *      during different stages of the API call lifecycle (loading, success, and failure).
 *
 * 3. **Loading State Management**:
 *    - Interacted with Redux actions (`showBackdrop` and `hideBackdrop`) to manage global loading indicators,
 *      ensuring a consistent user experience.
 *
 * 4. **Error Handling**:
 *    - Provided a structured approach for handling and displaying error messages, including custom and unexpected
 *      errors.
 *
 * 5. **Flexibility**:
 *    - Allowed custom messages (loading, success, failure, and unexpected error) to be passed as parameters,
 *      enabling tailored user feedback for different API requests.
 *
 * Limitations of v31:
 * 1. **Validator Function Constraints**:
 *    - The validator function was tightly coupled with the API request logic, making it less reusable and
 *      potentially redundant in simple use cases.
 *
 * 2. **Reduced Scalability**:
 *    - Limited support for complex API scenarios such as parallel requests, batching, or handling varying
 *      response structures.
 *
 * 3. **Verbose Implementation**:
 *    - The API required additional boilerplate for input validation and response structure validation, which
 *      increased code complexity.
 *
 * Evolution to v400:
 * 1. **Separation of Concerns**:
 *    - The updated `useConsolidated` (v400) version introduced a cleaner separation between request logic
 *      (`apiRequest`) and validation logic (`validatorFn`), promoting reusability and modularity.
 *
 * 2. **Enhanced Error Handling**:
 *    - Support for more sophisticated error-handling mechanisms, including better distinction between network
 *      errors, server-side errors, and unexpected issues.
 *
 * 3. **Streamlined API**:
 *    - Reduced boilerplate by automating common patterns, such as response validation, loading state management,
 *      and default message handling.
 *
 * 4. **Improved Flexibility**:
 *    - Enabled better handling of diverse API scenarios and allowed for custom implementations of
 *      loading states and error notifications when needed.
 *
 * Why Keep v31:
 * - v31 serves as a historical reference for understanding the evolution of the `useConsolidated` hook. By
 *   examining the initial version, developers can appreciate the thought process and design decisions that led to
 *   the more polished v400 release.
 *
 * - It provides a practical example for teams looking to build their own utilities, emphasizing the importance
 *   of iterative improvement.
 *
 * Usage Note:
 * While v31 is preserved for reference, it is not recommended for use in production environments. For a more
 * robust and scalable implementation, always use the latest `useConsolidated` hook (e.g., v400 or later).
 *
 */

import { LoaderStates } from "./LoaderWithTitle";
import { notify, updateNotification } from "./toast-utils";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../redux/slices/backdropSlice";

const isFunction = (argument, name) => {
  if (typeof argument !== "function") {
    console.error(`Provided ${name || "argument"} is not a function`);
    throw new Error(`Provided ${name || "argument"} is not a function`);
  }
  return true;
};

const isPromise = (argument, name) => {
  if (!(argument instanceof Promise)) {
    throw new Error(`provided ${name || ""} Function must return a Promise`);
  }
  return true;
};

const validBooleanResult = (result) => {
  if (typeof result !== "boolean") {
    throw new Error("Validator function must return a boolean result");
  }
};

const validPromiseResult = (result, promiseObjectName) => {
  if (
    typeof result !== "object" ||
    result === null ||
    !("data" in result) ||
    !("isError" in result) ||
    !("message" in result)
  ) {
    throw new Error("Promise must resolve to the expected structure");
  }
  return true;
};

const defaultMessages = {
  loadingMessage: "Loading, please wait...",
  successMessage: "Operation completed successfully!",
  failureMessage: "Operation failed. Please try again.",
  unexpectedErrorMessage:
    "An unexpected error occurred. Please contact support.",
};

const prepareMessage = (message, defaultMessage) => {
  if (message && typeof message === "string" && message.trim().length > 0) {
    return message;
  }
  return defaultMessage;
};

// Utility to prepare error messages
const prepareErrorMessage = (error, defaultMessage) => {
  if (!error) return defaultMessage;
  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  } else if (
    typeof error === "object" &&
    error.message &&
    typeof error.message === "string" &&
    error.message.trim().length > 0
  ) {
    return error.message;
  } else {
    try {
      return JSON.stringify(error);
    } catch {
      return defaultMessage;
    }
  }
};

const useConsolidated = () => {
  const dispatch = useDispatch();

  // Fetch task details for a given ID
  const executeApiRequest = async (
    apiRequest,
    validatorFn,
    {
      loadingMessage = "",
      successMessage = "",
      failureMessage = "",
      unexpectedErrorMessage = "",
    }
  ) => {
    let toastId = null;

    try {
      isFunction(apiRequest, "apiRequest");
      isFunction(validatorFn, "validatorFn");

      const apiRequestPromise = apiRequest();
      isPromise(apiRequestPromise, "apiRequest");

      toastId = notify(
        prepareMessage(loadingMessage, defaultMessages.loadingMessage)
      );
      dispatch(showBackdrop());

      const valid = validatorFn();
      validBooleanResult(valid);

      const result = await apiRequestPromise;

      validPromiseResult(result, "apiRequest");

      const { data, isError, message } = result;

      updateNotification(
        toastId,
        isError
          ? prepareMessage(failureMessage, defaultMessages.failureMessage)
          : prepareMessage(successMessage, defaultMessages.successMessage),
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      const errorMessage = prepareErrorMessage(
        error,
        prepareMessage(
          unexpectedErrorMessage,
          defaultMessages.unexpectedErrorMessage
        )
      );

      updateNotification(toastId, errorMessage, LoaderStates.error);
      console.error("API Request Error:", { error });
      return { data: null, isError: true, message: errorMessage };
    } finally {
      dispatch(hideBackdrop());
    }
  };

  return {
    executeApiRequest,
  };
};

export default useConsolidated;
