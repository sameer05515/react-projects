import { BACKEND_APPLICATION_BASE_URL } from "../../../constants/globalConstants";
import useConsolidated from "../releases/v400";
import { apiRequest } from "../apiClient";

// Base URL for CGPT API requests
const BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/cgpt`;

// Endpoint Constants
const ENDPOINTS = {
  FETCH_FILES: "/f",
  FETCH_FILE_FOR_UNIQUE_ID: (fileUid) => `/f/${fileUid}`,
  FETCH_FILE_FOR_UID_AND_CONV_UID: (fileUid, convUid) =>
    `/f/${fileUid}/c/${convUid}`,
  FETCH_FILE_FOR_UID_CONV_UID_AND_MSG_UID: (fileUid, convUid, msgUid) =>
    `/f/${fileUid}/c/${convUid}/m/${msgUid}`,
};

/**
 * Utility to validate inputs and throw errors if invalid
 * @param {Array} inputs - Array of objects with `key`, `value`, and `type`.
 */
const validateInputs = (inputs) => {
  inputs.forEach(({ key, value, type }) => {
    if (!value || typeof value !== type) {
      throw new Error(`Invalid ${key}: '${value}' provided. Expected ${type}.`);
    }
  });
};

/**
 * Hook for CGPT API operations
 */
const useCGPTApis = () => {
  const { executeApiRequest } = useConsolidated();

  const fetchAllCGPTFiles = () => {
    const apiRequestPromise = () =>
      apiRequest({
        url: `${BASE_URL}${ENDPOINTS.FETCH_FILES}`,
        method: "get",
      });
    const validator = () => true;

    const messages = {
      loadingMessage: "Fetching all CGPT files...",
      successMessage: "All CGPT files fetched successfully!",
      failureMessage: "Failed to fetch CGPT files.",
    };

    return executeApiRequest(apiRequestPromise, validator, messages);
  };
  const fetchCGPTFileForGivenUniqueId = (fileUid) => {
    const apiRequestPromise = () =>
      apiRequest({
        url: `${BASE_URL}${ENDPOINTS.FETCH_FILE_FOR_UNIQUE_ID(fileUid)}`,
        method: "get",
      });

    const validator = () => {
      validateInputs([{ key: "fileUid", value: fileUid, type: "string" }]);
      return true;
    };

    const messages = {
      loadingMessage: `Fetching CGPT file for ID: ${fileUid}...`,
      successMessage: "CGPT file fetched successfully!",
      failureMessage: `Failed to fetch CGPT file for ID: ${fileUid}.`,
    };

    return executeApiRequest(apiRequestPromise, validator, messages);
  };

  const fetchCGPTFileForUIDAndConvUID = (fileUid, convUid) => {
    const apiRequestPromise = () =>
      apiRequest({
        url: `${BASE_URL}${ENDPOINTS.FETCH_FILE_FOR_UID_AND_CONV_UID(
          fileUid,
          convUid
        )}`,
        method: "get",
      });

    const validator = () => {
      validateInputs([
        { key: "fileUid", value: fileUid, type: "string" },
        { key: "convUid", value: convUid, type: "string" },
      ]);
      return true;
    };

    const messages = {
      loadingMessage: `Fetching CGPT file for fileUid: ${fileUid}, convUid: ${convUid}...`,
      successMessage: "CGPT file fetched successfully!",
      failureMessage: `Failed to fetch CGPT file for fileUid: ${fileUid}, convUid: ${convUid}.`,
    };

    return executeApiRequest(apiRequestPromise, validator, messages);
  };

  const fetchCGPTFileForUIDAndConvUIDAndMsgUID = (fileUid, convUid, msgUid) => {
    const apiRequestPromise = () =>
      apiRequest({
        url: `${BASE_URL}${ENDPOINTS.FETCH_FILE_FOR_UID_CONV_UID_AND_MSG_UID(
          fileUid,
          convUid,
          msgUid
        )}`,
        method: "get",
      });

    const validator = () => {
      validateInputs([
        { key: "fileUid", value: fileUid, type: "string" },
        { key: "convUid", value: convUid, type: "string" },
        { key: "msgUid", value: msgUid, type: "string" },
      ]);

      return true;
    };

    const messages = {
      loadingMessage: `Fetching CGPT file for fileUid: ${fileUid}, convUid: ${convUid}, msgUid: ${msgUid}...`,
      successMessage: "CGPT file fetched successfully!",
      failureMessage: `Failed to fetch CGPT file for fileUid: ${fileUid}, convUid: ${convUid}, msgUid: ${msgUid}.`,
    };

    return executeApiRequest(apiRequestPromise, validator, messages);
  };

  return {
    fetchAllCGPTFiles,
    fetchCGPTFileForGivenUniqueId,
    fetchCGPTFileForUIDAndConvUID,
    fetchCGPTFileForUIDAndConvUIDAndMsgUID,
  };
};

export default useCGPTApis;
