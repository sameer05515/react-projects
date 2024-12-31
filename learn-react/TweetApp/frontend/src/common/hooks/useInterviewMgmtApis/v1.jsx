import { BACKEND_APPLICATION_BASE_URL } from "../../constants/globalConstants";
import { apiRequest } from "../../service/apiClient/v1";
import { validateInputs } from "../../service/apiRequestValidation";
// import useConsolidated from "../useConsolidated/releases/v400";
import useConsolidated from "../useConsolidated/v4";

// Base URL for CGPT API requests
const BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2`;

const ENDPOINTS = {
  PATCH_QUESTION_FOR_UID: (uid) => `/questions/${uid}`,
};

const useInterviewMgmtApis = () => {
  const { executeApiRequest } = useConsolidated();

  const patchQuesionForUID = (uniqueId) => {
    const apiRequestPromise = () =>
      apiRequest({
        url: `${BASE_URL}${ENDPOINTS.PATCH_QUESTION_FOR_UID(uniqueId)}`,
        method: "patch",
      });
    const validator = () => {
        validateInputs([{ key: "uniqueId", value: undefined, type: "string" }]);
        return true;
    };

    const messages = {
      loadingMessage: "Sending patch request for question",
      //   successMessage: "All CGPT files fetched successfully!",
      //   failureMessage: `Failed to patch question for uniqueId: ${uniqueId}`,
    };

    return executeApiRequest(apiRequestPromise, validator, messages);
  };

  return { patchQuesionForUID };
};

export default useInterviewMgmtApis;
