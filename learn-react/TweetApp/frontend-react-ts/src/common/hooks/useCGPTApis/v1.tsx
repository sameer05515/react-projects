import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../../redux/slices/backdropSlice";
import { BACKEND_APPLICATION_BASE_URL } from "../../../constants/globalConstants";
import { apiRequest } from "../apiClient";
import { LoaderStates } from "../LoaderWithTitle";
import prepareErrorMessage from "../prepareErrorMessage";
import { notify, updateNotification } from "../toast-utils";

// Base URL for CGPT API requests
const BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/cgpt`;

// Endpoint Constants
const ENDPOINTS = {
  FETCH_FILES: "/f",
  FETCH_FILE_FOR_UNIQUE_ID: (fileUid) => `/f/${fileUid}`,
  FETCH_FILE_FOR_UID_AND_CONV_UID: (fileUid, convUID) =>
    `/f/${fileUid}/c/${convUID}`,
  FETCH_FILE_FOR_UID_CONV_UID_AND_MSG_UID: (fileUid, convUID, msgUID) =>
    `/f/${fileUid}/c/${convUID}/m/${msgUID}`,
};

// Hook for CGPT API operations
const useCGPTApis = () => {
  const dispatch = useDispatch();

  /**
   * Fetch all CGPT files (without conversation or message info).
   * @returns {Promise<{data: any, isError: boolean, message: string}>}
   */
  const fetchAllCGPTFiles = async () => {
    const toastId = notify("Fetching All CGPT Files...");
    dispatch(showBackdrop());

    try {
      const { data, isError, message } = await apiRequest({
        method: "get",
        url: `${BASE_URL}${ENDPOINTS.FETCH_FILES}`,
      });

      updateNotification(
        toastId,
        isError
          ? "Failed to fetch All CGPT Files."
          : "All CGPT Files fetched successfully!",
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      const errorMessage = prepareErrorMessage(
        error,
        "An unexpected error occurred while fetching All CGPT Files."
      );

      updateNotification(toastId, errorMessage, LoaderStates.error);

      // Optionally log error details for debugging
      console.error("Fetch All CGPT Files Error:", error);

      return { data: null, isError: true, message: errorMessage };
    } finally {
      dispatch(hideBackdrop());
    }
  };

  /**
   * Get a cgpt-file for a given uniqueId
   * @returns {Promise<{data: any, isError: boolean, message: string}>}
   */
  const fetchCGPTFileForGivenUniqueId = async (fileUid) => {
    const toastId = notify(
      `Fetching CGPT File details for given id: ${fileUid} ...`
    );
    dispatch(showBackdrop());

    try {
      if (!fileUid || typeof fileUid !== "string") {
        throw new Error(`invalid uniqueId provided: '${fileUid}'`);
      }
      const { data, isError, message } = await apiRequest({
        method: "get",
        url: `${BASE_URL}${ENDPOINTS.FETCH_FILE_FOR_UNIQUE_ID(fileUid)}`,
      });

      updateNotification(
        toastId,
        isError
          ? "Failed to fetch All CGPT Files."
          : "All CGPT Files fetched successfully!",
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      const errorMessage = prepareErrorMessage(
        error,
        "An unexpected error occurred while fetching All CGPT Files."
      );

      updateNotification(toastId, errorMessage, LoaderStates.error);

      // Optionally log error details for debugging
      console.error("Fetch All CGPT Files Error:", error);

      return { data: null, isError: true, message: errorMessage };
    } finally {
      dispatch(hideBackdrop());
    }
  };

  /**
   * Get a cgpt-file for a given uniqueId and convUID
   * @returns {Promise<{data: any, isError: boolean, message: string}>}
   */
  const fetchCGPTFileForUIDAndConvUID = async (fileUid, convUID) => {
    const toastId = notify(
      `Fetching CGPT File details for given fileUid: '${fileUid}' and convUID: '${convUID}' ...`
    );
    dispatch(showBackdrop());

    try {
      if (
        !fileUid ||
        !convUID ||
        typeof fileUid !== "string" ||
        typeof convUID !== "string"
      ) {
        throw new Error(
          `invalid fileUid: '${fileUid}', or convUID: '${convUID}' provided.`
        );
      }
      const { data, isError, message } = await apiRequest({
        method: "get",
        url: `${BASE_URL}${ENDPOINTS.FETCH_FILE_FOR_UID_AND_CONV_UID(
          fileUid,
          convUID
        )}`,
      });

      updateNotification(
        toastId,
        isError
          ? "Failed to fetch All CGPT Files."
          : "All CGPT Files fetched successfully!",
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      const errorMessage = prepareErrorMessage(
        error,
        "An unexpected error occurred while fetching All CGPT Files."
      );

      updateNotification(toastId, errorMessage, LoaderStates.error);

      // Optionally log error details for debugging
      console.error("Fetch All CGPT Files Error:", error);

      return { data: null, isError: true, message: errorMessage };
    } finally {
      dispatch(hideBackdrop());
    }
  };

  /**
   * Get a cgpt-file for a given uniqueId and convUID
   * @returns {Promise<{data: any, isError: boolean, message: string}>}
   */
  const fetchCGPTFileForUIDAndConvUIDAndMsgUID = async (
    fileUid,
    convUID,
    msgUID
  ) => {
    const toastId = notify(
      `Fetching CGPT File details for given fileUid: '${fileUid}' , convUID: '${convUID}' and msgUID: '${msgUID}' ...`
    );
    dispatch(showBackdrop());

    try {
      if (
        !fileUid ||
        !convUID ||
        !msgUID ||
        typeof fileUid !== "string" ||
        typeof convUID !== "string" ||
        typeof msgUID != "string"
      ) {
        throw new Error(
          `invalid fileUid: '${fileUid}', or convUID: '${convUID}' provided.`
        );
      }
      const { data, isError, message } = await apiRequest({
        method: "get",
        url: `${BASE_URL}${ENDPOINTS.FETCH_FILE_FOR_UID_CONV_UID_AND_MSG_UID(
          fileUid,
          convUID,
          msgUID
        )}`,
      });

      updateNotification(
        toastId,
        isError
          ? "Failed to fetch All CGPT Files."
          : "All CGPT Files fetched successfully!",
        isError ? LoaderStates.error : LoaderStates.success
      );

      return { data, isError, message };
    } catch (error) {
      const errorMessage = prepareErrorMessage(
        error,
        "An unexpected error occurred while fetching All CGPT Files."
      );

      updateNotification(toastId, errorMessage, LoaderStates.error);

      // Optionally log error details for debugging
      console.error("Fetch All CGPT Files Error:", error);

      return { data: null, isError: true, message: errorMessage };
    } finally {
      dispatch(hideBackdrop());
    }
  };

  return {
    fetchAllCGPTFiles,
    fetchCGPTFileForGivenUniqueId,
    fetchCGPTFileForUIDAndConvUID,
    fetchCGPTFileForUIDAndConvUIDAndMsgUID,
  };
};

export default useCGPTApis;
