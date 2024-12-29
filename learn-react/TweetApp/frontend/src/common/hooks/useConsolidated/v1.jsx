import { apiRequest } from "./apiClient";
import { BACKEND_APPLICATION_BASE_URL } from "../../constants/globalConstants";
import LoaderWithTitle, { LoaderStates } from "./LoaderWithTitle";
import { toast } from "react-toastify";

/**
 * 📌 **Notice: Development in v1 is now closed.**
 * 
 * 🚀 **Next Steps:**
 * - Please migrate to **v2** for improved functionality and performance.
 * - If you encounter any issues or bugs in **v2**, kindly report them promptly.
 * 
 * 🔗 **Why Switch to v2?**
 * - v2 includes bug fixes, optimizations, and enhanced features not available in v1.
 * 
 * 🛑 **Note:** This version (v1) is retained for historical reference and backward compatibility, 
 * but it is no longer actively maintained.
 */


const useConsolidated = () => {
  // Clear existing notifications
  const clearPreviousNotifications = () => toast.dismiss();

  // Display a notification
  const notify = (title = "Processing your request...") => {
    clearPreviousNotifications();
    return toast(
      <LoaderWithTitle title={title} state={LoaderStates.spinner} />,
    //   { autoClose: false }
    );
  };

  // Update an existing notification
  const updateNotification = (toastId, message, state) => {
    if (toastId) {
      toast.update(toastId, {
        type: toast.TYPE.INFO,
        render: <LoaderWithTitle title={message} state={state} />,
      });
    }
  };

  // Fetch task details for a given ID
  const fetchTaskDetailsForGivenId = async (/** id */) => {
    const toastId = notify("Fetching Task Details");
    try {
      const { data, isError, message } = await apiRequest({
        method: "get",
        url: `${BACKEND_APPLICATION_BASE_URL}/tags`,
      });

      updateNotification(
        toastId,
        isError ? "Failed to fetch task details." : "Task details fetched successfully!",
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      updateNotification(toastId, "An error occurred", LoaderStates.error);
      return { data: null, isError: true, message: error.message };
    }
  };

  // Generate a random number
  const getRandomNumber = () => {
    const toastId = notify("Generating a random number...");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        if (randomNumber > 0) {
          resolve({ randomNumber, isError: false, message: "" });
          updateNotification(toastId, "Random number generated!", LoaderStates.success);
        } else {
          reject({
            randomNumber: null,
            isError: true,
            message: "Error generating random number",
          });
          updateNotification(toastId, "Error generating number", LoaderStates.error);
        }
      }, 3000); // 3-second delay
    });
  };

  // Double the given number
  const doubleTheNumber = (number) => {
    const toastId = notify("Doubling the number...");
    if (!Number.isInteger(number)) {
      updateNotification(toastId, "Input is not a valid number!", LoaderStates.error);
      return 0;
    }
    updateNotification(toastId, "Number doubled successfully!", LoaderStates.success);
    return number * 2;
  };

  return {
    fetchTaskDetailsForGivenId,
    getRandomNumber,
    doubleTheNumber,
    clearPreviousNotifications,
  };
};

export default useConsolidated;
