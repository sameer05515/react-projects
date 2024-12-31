import { BACKEND_APPLICATION_BASE_URL } from "../../constants/globalConstants";
import { apiRequest } from "../../service/apiClient/v1";
import { validateInputs } from "../../service/apiRequestValidation";
// import useConsolidated from "../useConsolidated/releases/v400";
import useConsolidated from "../useConsolidated/v4";

// Base URL for Interview Management API requests
const INTERVIEW_MGMT_BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2`;

const API_ENDPOINTS = {
  PATCH_QUESTION_BY_UID: (uniqueId) => `/questions/${uniqueId}`,
};

const useInterviewManagementAPIs = () => {
  const { executeApiRequest } = useConsolidated();

  const partialUpdateQuestionByUniqueId = (uniqueId) => {
    const apiRequestPromise = () =>
      apiRequest({
        url: `${INTERVIEW_MGMT_BASE_URL}${API_ENDPOINTS.PATCH_QUESTION_BY_UID(
          uniqueId
        )}`,
        method: "PATCH",
      });

    const validateRequest = () => {
      validateInputs([{ key: "uniqueId", value: uniqueId, type: "string" }]);
      return true;
    };

    const messages = {
      loadingMessage: "Updating question details...",
      successMessage: "Question updated successfully!",
      failureMessage: `Failed to update question for unique ID: ${uniqueId}`,
    };

    return executeApiRequest(apiRequestPromise, validateRequest, messages);
  };

  return { partialUpdateQuestionByUniqueId };
};

export default useInterviewManagementAPIs;
