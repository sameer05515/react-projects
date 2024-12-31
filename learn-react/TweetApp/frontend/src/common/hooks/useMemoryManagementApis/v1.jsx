import { useCallback } from "react";
import { BACKEND_APPLICATION_BASE_URL } from "../../constants/globalConstants";
import { apiRequest } from "../../service/apiClient/v1";
import { validateInputs } from "../../service/apiRequestValidation";
// import useConsolidated from "../useConsolidated/releases/v400";
import useConsolidated from "../useConsolidated/v4";

// Base URL for Interview Management API requests
const MEMORY_MAPS_MGMT_BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/memory-maps`;

const API_ENDPOINTS = {
  MEMORY_MAP_BY_UID: (uniqueId) => `/${uniqueId}`,
};

const getUrl = (endpoint) => {
  if (!endpoint) {
    console.trace(`endpoint: '${endpoint}'`);
    return null;
  }
  return `${MEMORY_MAPS_MGMT_BASE_URL}${endpoint}`;
};

const useMemoryManagementApis = () => {
  const { executeApiRequest } = useConsolidated();

  const getMemoryMap = useCallback(
    (uniqueId) => {
      const apiRequestPromise = () =>
        apiRequest({
          url: getUrl(API_ENDPOINTS.MEMORY_MAP_BY_UID(uniqueId)),
          method: "GET",
        });

      const validateRequest = () => {
        validateInputs([
          {
            key: "uniqueId",
            value: uniqueId,
            type: "string",
          },
        ]);
        return true;
      };

      const messages = {
        //   loadingMessage: "Updating question details...",
        //   successMessage: "Question updated successfully!",
        //   failureMessage: `Failed to update question for unique ID: ${uniqueId}`,
      };

      return executeApiRequest(apiRequestPromise, validateRequest, messages);
    },
    [executeApiRequest]
  );

  return { getMemoryMap };
};

export default useMemoryManagementApis;
