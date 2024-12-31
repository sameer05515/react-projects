
/**
 * ===================================================================
 * **Please note: ** - 
 * This version is just copied as-it-is from ChatGPT. Although it is working, but later versions could be more stable.
 * 
 * This version is kept as reference for future enhancements, which should be incorporated in `useConsolidated` hook
 * 
 * ===================================================================
 * 
 * 
 * `useConsolidated` Hook Documentation 
 * 
 * **Purpose:**
 * The `useConsolidated` hook is designed to handle a variety of tasks related to API calls, uniform notification management, 
 * and backdrop visibility during asynchronous operations. This hook serves as a central utility for making API requests, 
 * displaying notifications during processing, and managing UI elements like the backdrop (e.g., loading screens). 
 * It ensures consistency across the application when interacting with APIs, providing features such as retry logic, error handling, 
 * and streamlined feedback to the user.
 *
 * **Main Features:**
 * - **Centralized API Requests:** The hook facilitates making API requests using a uniform approach, encapsulating network logic 
 *   and providing support for retries and error handling.
 * - **Uniform Notifications:** Notifications are displayed consistently across various requests, indicating the loading state, 
 *   success, or failure of the request. A custom `LoaderWithTitle` component is used to display these notifications with dynamic titles.
 * - **Backdrop Management:** While API calls are in progress, the hook automatically controls the backdrop to provide feedback 
 *   that the system is processing requests.
 * - **Retry Logic:** Provides a retry mechanism for failed API requests to handle transient issues and improve the user experience.
 * - **Multiple Request Handling:** Supports processing multiple API calls sequentially and displays feedback for each operation.
 * 
 * **Methods Available in the Hook:**
 * 
 * 1. **clearPreviousNotifications:** Clears any previously displayed notifications from the toast container to avoid overlap 
 *    and ensure the user sees only the most relevant message.
 * 
 * 2. **notify:** Displays a loading notification (spinner) indicating that an action is being processed. The notification 
 *    is customizable, allowing the caller to pass a dynamic title message.
 * 
 * 3. **updateNotification:** Updates an existing notification with a new message and state (e.g., success, error, or spinner).
 *    This helps in modifying the notification to reflect the current progress or result of an ongoing task.
 * 
 * 4. **apiRequestWithRetry:** A wrapper around the `apiRequest` function that implements retry logic for failed API calls. 
 *    This function attempts the request a specified number of times before throwing an error, making the app more resilient to 
 *    transient failures (e.g., network issues).
 * 
 * 5. **fetchTaskDetailsForGivenId:** Example method that demonstrates how to fetch task details from an API endpoint, 
 *    using the `apiRequestWithRetry` function for making the actual API request. It updates the notification based on the 
 *    success or failure of the request and ensures the backdrop is managed appropriately.
 * 
 * 6. **generateRandomNumber:** A sample method for demonstrating an asynchronous operation (in this case, generating 
 *    a random number) and showing the appropriate notifications during the process. It uses the backdrop and notification 
 *    system to inform the user about the operation’s success or failure.
 * 
 * 7. **doubleNumber:** A utility function that performs a simple mathematical operation (doubling a number). The function 
 *    ensures that the input is a valid number before performing the operation and displays appropriate notifications.
 * 
 * 8. **fetchData:** A general-purpose method for making flexible API requests. It supports retries and error handling, 
 *    allowing it to be reused across various components for different API endpoints.
 * 
 * 9. **fetchMultipleData:** This method is useful when multiple API requests need to be made sequentially, processing 
 *    each request in turn. It ensures the user receives feedback after each API call and hides the backdrop once all requests 
 *    are completed.
 * 
 * **How It Works:**
 * - When an API request is made, the hook shows a loading spinner via the `notify` method to inform the user that the system 
 *   is working on their request.
 * - The backdrop is displayed using the `showBackdrop` action to indicate that an operation is in progress.
 * - Depending on the outcome of the request (success, failure, or retry), the hook updates the notification to provide the 
 *   user with real-time feedback.
 * - Upon completion of the task, the backdrop is hidden with the `hideBackdrop` action, and the notification is updated 
 *   to reflect the final status (e.g., success or error).
 * - Retry logic is implemented for failed API calls to handle intermittent issues automatically, without user intervention.
 * 
 * **Usage Example:**
 * ```js
 * const { fetchTaskDetailsForGivenId, getRandomNumber, doubleTheNumber } = useConsolidated();
 * 
 * // Fetching task details
 * const fetchTask = async () => {
 *   const response = await fetchTaskDetailsForGivenId();
 *   if (response.isError) {
 *     console.error(response.message);
 *   }
 * };
 * 
 * // Generating random number
 * const generateRandom = async () => {
 *   const { randomNumber, isError } = await getRandomNumber();
 *   if (isError) {
 *     console.error("Error generating random number");
 *   } else {
 *     console.log("Generated random number:", randomNumber);
 *   }
 * };
 * 
 * // Doubling a number
 * const doubledValue = doubleTheNumber(5);
 * console.log(doubledValue); // 10
 * ```
 * 
 * **Future Improvements:**
 * - **Customizable Retry Logic:** Currently, the retry mechanism is hardcoded. We could allow more fine-grained control 
 *   over the number of retries and delay between retries.
 * - **Custom Backdrop Types:** The backdrop could be customized further to support different types of loading indicators.
 * - **Error Categorization:** We could extend the error handling to categorize errors based on the type of API failure 
 *   (e.g., network error, authentication failure).
 * - **Internationalization (i18n):** The hook could be extended to support multiple languages for the notification messages.
 * 
 * **Important Notes:**
 * - The hook relies on Redux for managing the backdrop visibility. The `showBackdrop` and `hideBackdrop` actions 
 *   should be properly defined in the Redux slice to ensure the backdrop is correctly displayed during API operations.
 * - Notifications are displayed using `react-toastify`, so it's essential that the `ToastContainer` component is rendered 
 *   somewhere in the root of your app to handle the display of notifications.
 * 
 * This hook provides a robust and flexible solution for managing API calls and user feedback, making it a key tool for 
 * handling asynchronous tasks in your application with minimal boilerplate.
 */


import { apiRequest } from "./apiClient";
import { BACKEND_APPLICATION_BASE_URL } from "../../constants/globalConstants";
import LoaderWithTitle, { LoaderStates } from "./LoaderWithTitle";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideBackdrop, showBackdrop } from "../../../redux/slices/backdropSlice";

// Utility Functions

// Clears existing notifications
export const clearPreviousNotifications = () => {
  toast.dismiss();
  toast.clearWaitingQueue();
};

// Shows a new notification with a loading spinner
export const notify = (message = "Processing your request...") => {
  clearPreviousNotifications();
  return toast(<LoaderWithTitle title={message} state={LoaderStates.spinner} />);
};

// Updates an existing notification
export const updateNotification = (toastId, message, state = LoaderStates.spinner) => {
  if (toastId) {
    toast.update(toastId, {
      type: toast.TYPE.INFO,
      render: <LoaderWithTitle title={message} state={state} />,
    });
  }
};

// API request wrapper that can handle retries and fallback errors
export const apiRequestWithRetry = async (
  dispatch,
  method,
  url,
  retries = 3,
  data = null
) => {
  let attempts = 0;
  let result = null;
  
  // Retry logic with exponential backoff
  while (attempts < retries) {
    try {
      result = await apiRequest({ method, url, data });
      return result;
    } catch (error) {
      if (attempts >= retries - 1) {
        throw error;
      }
      attempts++;
      // Optionally implement a delay here for exponential backoff
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempts)); 
    }
  }
  return result;
};

// Async API request to fetch task details for a given ID
export const fetchTaskDetails = async (dispatch, toastId) => {
  dispatch(showBackdrop());
  try {
    const { data, isError, message } = await apiRequestWithRetry(
      dispatch,
      "get",
      `${BACKEND_APPLICATION_BASE_URL}/tags`
    );

    updateNotification(
      toastId,
      isError ? "Failed to fetch task details." : "Task details fetched successfully!",
      isError ? LoaderStates.error : LoaderStates.success
    );

    return { data, isError, message };
  } catch (error) {
    updateNotification(toastId, "An error occurred while fetching data.", LoaderStates.error);
    return { data: null, isError: true, message: error.message };
  } finally {
    dispatch(hideBackdrop());
  }
};

// Utility to generate a random number with notification
export const generateRandomNumber = (dispatch) => {
  const toastId = notify("Generating a random number...");
  dispatch(showBackdrop());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 10) + 1;

      if (randomNumber > 0) {
        updateNotification(toastId, "Random number generated!", LoaderStates.success);
        resolve({ randomNumber, isError: false, message: "" });
      } else {
        updateNotification(toastId, "Error generating number.", LoaderStates.error);
        reject({
          randomNumber: null,
          isError: true,
          message: "Error generating random number.",
        });
      }
    }, 3000); // 3-second delay
  }).finally(() => {
    dispatch(hideBackdrop());
  });
};

// Utility to double a number
export const doubleNumber = (dispatch, number) => {
  const toastId = notify("Doubling the number...");
  dispatch(showBackdrop());

  if (!Number.isInteger(number)) {
    updateNotification(toastId, "Input is not a valid number!", LoaderStates.error);
    dispatch(hideBackdrop());
    return 0;
  }

  const result = number * 2;
  updateNotification(toastId, "Number doubled successfully!", LoaderStates.success);
  dispatch(hideBackdrop());
  return result;
};

// Custom Hook: Consolidated logic using utility functions
const useConsolidated = () => {
  const dispatch = useDispatch();

  // Fetch task details for a given ID
  const fetchTaskDetailsForGivenId = async () => {
    const toastId = notify("Fetching Task Details...");
    return fetchTaskDetails(dispatch, toastId);
  };

  // Generate random number
  const getRandomNumber = () => {
    return generateRandomNumber(dispatch);
  };

  // Double the given number
  const doubleTheNumber = (number) => {
    return doubleNumber(dispatch, number);
  };

  // Fetch API data (with retry support) for a general purpose
  const fetchData = async (method, url, data = null, retries = 3) => {
    const toastId = notify("Fetching data...");
    try {
      const { data: responseData, isError, message } = await apiRequestWithRetry(
        dispatch,
        method,
        url,
        retries,
        data
      );
      updateNotification(
        toastId,
        isError ? `Error: ${message}` : `Data fetched successfully!`,
        isError ? LoaderStates.error : LoaderStates.success
      );
      return { responseData, isError, message };
    } catch (error) {
      updateNotification(toastId, "Request failed after retries.", LoaderStates.error);
      return { responseData: null, isError: true, message: error.message };
    }
  };

  // Utility for handling multiple API requests
  const fetchMultipleData = async (requests) => {
    const results = [];
    const toastId = notify("Processing multiple requests...");
    dispatch(showBackdrop());

    for (let i = 0; i < requests.length; i++) {
      const { method, url, data, retries = 3 } = requests[i];
      const { responseData, isError, message } = await fetchData(
        method,
        url,
        data,
        retries
      );
      results.push({ responseData, isError, message });
    }

    updateNotification(toastId, "Multiple requests processed!", LoaderStates.success);
    dispatch(hideBackdrop());
    return results;
  };

  return {
    fetchTaskDetailsForGivenId,
    getRandomNumber,
    doubleTheNumber,
    clearPreviousNotifications,
    fetchData,
    fetchMultipleData,
  };
};

export default useConsolidated;
