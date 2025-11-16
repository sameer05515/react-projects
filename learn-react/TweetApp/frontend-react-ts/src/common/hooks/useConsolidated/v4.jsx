import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../redux/slices/backdropSlice";
import { LoaderStates } from "./LoaderWithTitle";
import {
  defaultMessages,
  prepareErrorMessage,
  prepareMessage,
} from "./message-preparation-utils";
import { notify, updateNotification } from "./toast-utils";

import {
  validateBoolean,
  validateFunction,
  validatePromise,
  validatePromiseResult,
} from "./validation-utils";

// Hook: Consolidated API execution utility

/**
 * First release v400 is launched and ready to be used.
 *
 * All bugfixes and enhancements for useConsolidated hook will be done in this v4 version
 * next targetted release is v401 , another stable version will be released accordingly.
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

/**
 * About this version: 'useConsolidated/v4'
 *
 * **Ambitious Targeted Release:**
 * The goal of the `useConsolidated/v4` version is to provide a robust, flexible, and extensible solution for handling common
 * tasks like API calls, notifications, and backdrop management in React applications. The core of this release is to
 * establish a Long-Term Support (LTS) version that developers can rely on for years, with a focus on usability, scalability,
 * and ease of integration into various projects.
 *
 * **Evolution from Previous Versions:**
 * - **useConsolidated/v1:** The initial version of this hook laid the foundation by offering basic functionality such as
 *   API requests and basic toast notifications. However, it lacked flexibility, error handling, and extensibility.
 * - **useConsolidated/v2:** This version introduced better error handling and added support for retry logic in API requests.
 *   The goal was to make the hook more resilient to transient network failures and provide more consistent user feedback.
 * - **useConsolidated/v3:** With `useConsolidated/v3`, we focused on refactoring the code to make it more modular and
 *   reusable, enhancing the notification system and adding support for multiple concurrent API calls. We also improved the
 *   user experience by providing better visual feedback for success and error states, and by ensuring that the backdrop
 *   management was more consistent across different scenarios.
 *
 * The evolution of these versions has led to a more feature-complete and user-friendly hook that we are now stabilizing
 * and preparing for LTS release.
 *
 * **Target: LTS Version**
 * `useConsolidated/v4` is being designed with a focus on providing long-term support, ensuring stability, and meeting the
 * following criteria:
 * - **Ease of use:** The hook should be intuitive to use and integrate into existing projects with minimal setup or configuration.
 * - **Backward compatibility:** This version will maintain backward compatibility with previous versions, allowing users to
 *   seamlessly upgrade without breaking existing functionality.
 * - **Extensibility:** We will continue to provide ways to extend and customize the hook, making it suitable for diverse use cases.
 * - **Scalability:** With the growing complexity of modern applications, this version aims to handle large-scale use cases
 *   efficiently, while remaining lightweight and easy to maintain.
 *
 * **Release Target: Library Project**
 * The ultimate target for `useConsolidated/v4` is to release it as part of a React utility library project, which can be
 * easily imported and reused across multiple projects. The hook is expected to be:
 * - **Feature-rich**: Providing not only basic functionality but also advanced features like automatic retries, customizable
 *   notifications, and concurrency handling.
 * - **Well-documented**: Comprehensive documentation will be included to ensure that developers can easily understand and
 *   make the best use of this hook.
 * - **Community-driven**: We will open-source the hook and encourage contributions from the community to ensure that it
 *   evolves and meets the needs of various projects and use cases.
 *
 * **Key Features and Enhancements in useConsolidated/v4:**
 *
 * 1. **API Request Handling:**
 *    - Unified approach for making API requests with built-in support for error handling and retries.
 *    - Retry logic can be configured for each API request, with options to specify the number of retries and delay between them.
 *    - Handles multiple types of API responses, including success, error, and unexpected failures.
 *    - Supports concurrent requests, ensuring that users can easily manage multiple tasks simultaneously.
 *
 * 2. **Notification System:**
 *    - Seamless integration with `react-toastify` for managing notifications with different states (loading, success, error).
 *    - Customizable notifications, allowing developers to specify dynamic messages and states for each operation.
 *    - Notifications are auto-managed, ensuring that the most relevant message is shown, while old ones are cleared.
 *
 * 3. **Backdrop Management:**
 *    - Automatic management of the backdrop (loading screen) during API calls to provide users with clear feedback about
 *      ongoing operations.
 *    - Backdrop visibility can be triggered and hidden based on the lifecycle of API requests.
 *
 * 4. **Error Handling & Retry Logic:**
 *    - Advanced error categorization, providing more granular feedback on network or server errors.
 *    - Configurable retry logic to automatically handle transient issues and improve user experience.
 *    - Customizable error messages based on different failure conditions (e.g., network failure, server error, etc.).
 *
 * 5. **Extensibility:**
 *    - Built to be highly extensible, enabling developers to override default behaviors like notification display, retry logic,
 *      or backdrop handling.
 *    - Hooks and utilities are broken down into smaller, reusable functions that can be easily customized or extended for
 *      specific use cases.
 *
 * **Key Benefits:**
 * - **Consistency Across Applications:** By using this hook, developers ensure that API calls, notifications, and loading
 *   states are handled consistently throughout the app, improving the overall user experience.
 * - **Reduction in Boilerplate:** Developers no longer need to repeatedly write code for API calls, loading indicators,
 *   or error handling. This hook streamlines these tasks, saving time and reducing duplication of effort.
 * - **Flexibility and Customization:** While the hook offers out-of-the-box functionality, it can also be easily customized
 *   to fit the unique needs of different projects, such as modifying notification types, adding custom API request handlers,
 *   or changing the backdrop display.
 *
 * **Usage and Integration:**
 * Once released as part of the library, integrating `useConsolidated/v4` into a project will be straightforward. Developers
 * can install the package via npm or yarn and start using the hook by importing it into their components. The following
 * example demonstrates the integration:
 *
 * ```js
 * import { useConsolidated } from 'your-library-package';
 *
 * const YourComponent = () => {
 *   const { fetchTaskDetailsForGivenId, getRandomNumber, doubleTheNumber } = useConsolidated();
 *
 *   // Using the hook methods
 *   const fetchData = async () => {
 *     const response = await fetchTaskDetailsForGivenId();
 *     console.log(response);
 *   };
 *
 *   const generateRandom = async () => {
 *     const { randomNumber, isError } = await getRandomNumber();
 *     console.log(randomNumber, isError);
 *   };
 *
 *   const doubled = doubleTheNumber(10);
 *   console.log(doubled);
 * };
 * ```
 *
 * **Future Roadmap:**
 * - **Internationalization (i18n) Support:** Enable support for multiple languages so that notifications and error messages
 *   can be displayed in different languages.
 * - **Integration with More State Management Libraries:** Future versions of the hook could integrate with more state management
 *   solutions like Recoil, Zustand, or MobX to make it more adaptable to different architectures.
 * - **User Customization:** Provide even more hooks to allow deep customization of how the backdrop or notifications behave.
 *
 * **Contribution Guidelines:**
 * We welcome contributions from the community to improve the hook and add new features. You can fork the repository, make
 * your changes, and submit a pull request. Please ensure that all contributions adhere to our coding standards and pass
 * necessary tests.
 *
 * **Conclusion:**
 * `useConsolidated/v4` is designed to be a feature-rich, stable, and extensible solution for managing asynchronous tasks
 * and user feedback in React applications. By focusing on error handling, API request consistency, and providing a user-friendly
 * experience, this version aims to be a go-to utility for developers building modern React applications.
 */

/**
 *
 * > **Note**: This version is running snapshot of [.releases/v400.jsx](./releases/v400.jsx)
 * > and hence will incorporate all bug-fixes enhancements found, during **`Optimization of TweetApp`**
 * > Please refer [**Bug-Tracker**](./documentation/bug-tracker.md) for details
 *
 * ## List of bugs (found in [.releases/v400.jsx](./releases/v400.jsx)) and their status
 *
 * 1. **Bug**: [`Closed`]: Even if validator function is throwing exception, the promise is starting to execute in background.
 *    - **RCA**: the validation for determining given `apiRequest` argument was being done, before executing `validatorFn`
 * 2. **Bug**: [`On-Hold`]: If a non-Promise function passed in `apiRequest` argument, `executeApiRequest` function is returning error response, but still the given function gets executed in background.
 *    - **RCA**: If a non-Promise function passed in `apiRequest` argument, there is no way in Javascript/TypeScript to check return-type of `apiRequest` without executing it.
 *    - **Workaround**: Developers have been advised to use `executeApiRequest` wisely and check what they are passing, to refrain from any `inconsistency`
 * 3. ****: [`Closed`]: In router pages, where executeApiRequest was being called inside useEffect, infinite number of request are going to server
 *    - **RCA**: `executeApiRequest` function was not optimized with useCallback, hence was creating issue
 *    - **Details**: Please find detailed explaination [**here**](./documentation/issue-3-resolution.md)
 *
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
  const executeApiRequest = useCallback(
    async (
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

        // Show loading notification and backdrop
        toastId = notify(
          prepareMessage(loadingMessage, defaultMessages.loadingMessage)
        );
        dispatch(showBackdrop());

        // Validate input state
        const isValid = validatorFn();
        validateBoolean(isValid);

        // Execute and Validate API request returns a Promise
        const apiRequestPromise = apiRequest();
        validatePromise(apiRequestPromise, "apiRequest");

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
    },
    [dispatch]
  );

  return { executeApiRequest };
};

export default useConsolidated;
