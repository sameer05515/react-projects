import { apiRequest } from "../../../service/apiClient/v1";
import { BACKEND_APPLICATION_BASE_URL } from "../../../constants/globalConstants";
import LoaderWithTitle, { LoaderStates } from "../LoaderWithTitle";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../../redux/slices/backdropSlice";

/**
 * 📌 **Notice: Development in v2 is now closed.**
 * 
 * 🚀 **Next Steps:**
 * - Please migrate to **v400** for improved functionality and performance.
 * - If you encounter any issues or bugs in **v400**, kindly report them promptly. We will incorporate them in next release **v401**
 * - Note: **v3**, and **v4** contains only reference code and never used for development
 * 
 * 🔗 **Why Switch to v400?**
 * - v400 includes bug fixes, optimizations, and enhanced features not available in previous versions.
 * 
 * 🛑 **Note:** This version (v2) is retained for historical reference and backward compatibility, 
 * but it is no longer actively maintained.
 */

const useConsolidated = () => {
  const dispatch = useDispatch();

  // Utility to clear previous notifications
  const clearPreviousNotifications = () => {
    toast.dismiss();
    toast.clearWaitingQueue();
  };

  // Utility to show a notification
  const notify = (message = "Processing your request...") => {
    clearPreviousNotifications();
    return toast(
      <LoaderWithTitle title={message} state={LoaderStates.spinner} />
    );
  };

  // Utility to update an existing notification
  const updateNotification = (
    toastId,
    message,
    state = LoaderStates.spinner
  ) => {
    if (toastId) {
      toast.update(toastId, {
        type: toast.TYPE.INFO,
        render: <LoaderWithTitle title={message} state={state} />,
      });
    }
  };

  // Fetch task details for a given ID
  const fetchTaskDetailsForGivenId = async () => {
    const toastId = notify("Fetching Task Details...");
    dispatch(showBackdrop());
    try {
      const { data, isError, message } = await apiRequest({
        method: "get",
        url: `${BACKEND_APPLICATION_BASE_URL}/tags`,
      });

      updateNotification(
        toastId,
        isError
          ? "Failed to fetch task details."
          : "Task details fetched successfully!",
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      updateNotification(
        toastId,
        "An error occurred while fetching data.",
        LoaderStates.error
      );
      return { data: null, isError: true, message: error.message };
    } finally {
      dispatch(hideBackdrop());
    }
  };

  // Generate a random number
  const getRandomNumber = () => {
    const toastId = notify("Generating a random number...");
    dispatch(showBackdrop());
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 10) + 1;

        if (randomNumber > 0) {
          updateNotification(
            toastId,
            "Random number generated!",
            LoaderStates.success
          );
          resolve({ randomNumber, isError: false, message: "" });
        } else {
          updateNotification(
            toastId,
            "Error generating number.",
            LoaderStates.error
          );
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

  // Double the given number
  const doubleTheNumber = (number) => {
    const toastId = notify("Doubling the number...");
    dispatch(showBackdrop());

    if (!Number.isInteger(number)) {
      updateNotification(
        toastId,
        "Input is not a valid number!",
        LoaderStates.error
      );
      dispatch(hideBackdrop());
      return 0;
    }

    const result = number * 2;
    updateNotification(
      toastId,
      "Number doubled successfully!",
      LoaderStates.success
    );
    dispatch(hideBackdrop());
    return result;
  };

  // Passing undefined apiconfig
  const fetchAPIRequestWithUndefinedConfig = async () => {
    const toastId = notify("Fetching Task Details...");
    dispatch(showBackdrop());
    try {
      const { data, isError, message } = await apiRequest(undefined);

      updateNotification(
        toastId,
        isError
          ? "Failed to fetch task details."
          : "Task details fetched successfully!",
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      updateNotification(
        toastId,
        "An error occurred while fetching data.",
        LoaderStates.error
      );
      return { data: null, isError: true, message: error.message };
    } finally {
      dispatch(hideBackdrop());
    }
  };

  return {
    fetchTaskDetailsForGivenId,
    getRandomNumber,
    doubleTheNumber,
    clearPreviousNotifications,
    fetchAPIRequestWithUndefinedConfig,
  };
};

export default useConsolidated;
