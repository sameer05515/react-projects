import { LoaderStates } from "../LoaderWithTitle";
import { notify, updateNotification } from "../toast-utils";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../../redux/slices/backdropSlice";
import {
  defaultMessages,
  prepareMessage,
  prepareErrorMessage,
} from "../message-preparation-utils";

import {
  validateFunction,
  validatePromise,
  validateBoolean,
  validatePromiseResult,
} from "../validation-utils";

// Hook: Consolidated API execution utility

/**
 * This is initial release of useConsolidated hook.
 *
 * Note: All enhancements and bug-fixes should be performed in v4.jsx and new stable release named v401 should be released
 *
 */

/**
 * **useConsolidated Hook: First Stable Release (v400)**
 *
 * The first stable release of the `useConsolidated` hook (v400) is officially launched and ready for use.
 * This version brings a robust, well-tested implementation designed to streamline API request handling,
 * enhance error management, and improve user feedback mechanisms.
 *
 * v400 serves as the foundation for all upcoming iterations of the hook. Any bug fixes, performance
 * improvements, or feature enhancements will be implemented within the v4 series. This ensures
 * backward compatibility and a smooth upgrade path for developers using this version.
 *
 * Key features of v400 include:
 * - Centralized API request handling with customizable loading, success, and failure messages.
 * - Built-in error handling for both expected and unexpected errors.
 * - Seamless integration with notification and loading state management utilities.
 *
 * The next targeted release, v401, will focus on delivering another stable iteration, incorporating
 * feedback and additional improvements based on v400's usage.
 *
 * Developers are encouraged to adopt v400 for a reliable and scalable experience while staying updated
 * with subsequent versions for continuous enhancements.
 */

const useConsolidated = () => {
  const dispatch = useDispatch();

  /**
   * Execute an API request with validation, loading, and error handling.
   * @param {Function} apiRequest - Function that returns a Promise for the API request.
   * @param {Function} validatorFn - Function to validate input parameters or state.
   * @param {Object} messages - Custom messages for loading, success, failure, and error states.
   * @returns {Promise<{data: any, isError: boolean, message: string}>}
   */
  const executeApiRequest = async (
    apiRequest,
    validatorFn,
    {
      loadingMessage = "",
      successMessage = "",
      failureMessage = "",
      unexpectedErrorMessage = "",
    } = {}
  ) => {
    let toastId = null;

    try {
      // Validate input functions
      validateFunction(apiRequest, "apiRequest");
      validateFunction(validatorFn, "validatorFn");

      // Validate API request returns a Promise
      const apiRequestPromise = apiRequest();
      validatePromise(apiRequestPromise, "apiRequest");

      // Show loading notification and backdrop
      toastId = notify(
        prepareMessage(loadingMessage, defaultMessages.loadingMessage)
      );
      dispatch(showBackdrop());

      // Validate input state
      const isValid = validatorFn();
      validateBoolean(isValid);

      // Await API response
      const result = await apiRequestPromise;
      validatePromiseResult(result);

      // Destructure result
      const { data, isError, message } = result;

      // Update notification based on success or failure
      updateNotification(
        toastId,
        isError
          ? prepareMessage(failureMessage, defaultMessages.failureMessage)
          : prepareMessage(successMessage, defaultMessages.successMessage),
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      // Handle unexpected errors
      const errorMessage = prepareErrorMessage(
        error,
        prepareMessage(
          unexpectedErrorMessage,
          defaultMessages.unexpectedErrorMessage
        )
      );

      updateNotification(toastId, errorMessage, LoaderStates.error);
      console.error("API Request Error:", error);

      return { data: null, isError: true, message: errorMessage };
    } finally {
      // Hide backdrop
      dispatch(hideBackdrop());
    }
  };

  return { executeApiRequest };
};

export default useConsolidated;
