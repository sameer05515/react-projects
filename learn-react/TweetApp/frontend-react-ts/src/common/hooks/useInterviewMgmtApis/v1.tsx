import { BACKEND_APPLICATION_BASE_URL } from "../../constants/globalConstants";
import { apiRequest } from "../../service/apiClient/v1";
import { validateInputs } from "../../service/apiRequestValidation";
// import useConsolidated from "../useConsolidated/releases/v400";
import useConsolidated from "../useConsolidated/v4";

// Base URL for Interview Management API requests
const INTERVIEW_MGMT_BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2`;

const API_ENDPOINTS = {
  PATCH_QUESTION_BY_UID: (uniqueId) => `/questions/${uniqueId}`,
  QUESTIONS: "/questions",
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

  const createQuestion = (questionData) => {
    const apiRequestPromise = () =>
      apiRequest({
        url: `${INTERVIEW_MGMT_BASE_URL}${API_ENDPOINTS.QUESTIONS}`,
        method: "POST",
        data: questionData,
      });

    const validateRequest = () => {
      //validateInputs([{ key: "uniqueId", value: uniqueId, type: "string" }]);
      if (!questionData) throw new Error("Invalid questionData passed!");
      return true;
    };

    const messages = {
      // loadingMessage: "Updating question details...",
      // successMessage: "Question updated successfully!",
      // failureMessage: `Failed to update question for unique ID: ${uniqueId}`,
    };

    return executeApiRequest(apiRequestPromise, validateRequest, messages);
  };

  const updateQuestion = (questionData) => {
    const apiRequestPromise = () =>
      apiRequest({
        url: `${INTERVIEW_MGMT_BASE_URL}${API_ENDPOINTS.PATCH_QUESTION_BY_UID(
          questionData.uniqueId
        )}`,
        method: "PUT",
        data: questionData,
      });

    const validateRequest = () => {
      // validateInputs([{ key: "uniqueId", value: uniqueId, type: "string" }]);
      if (!questionData) throw new Error("Invalid questionData passed!");
      return true;
    };

    const messages = {
      loadingMessage: "Updating question details...",
      successMessage: "Question updated successfully!",
      failureMessage: `Failed to update question for unique ID: ${questionData.uniqueId}`,
    };

    return executeApiRequest(apiRequestPromise, validateRequest, messages);
  };

  return { partialUpdateQuestionByUniqueId, createQuestion, updateQuestion };
};

export default useInterviewManagementAPIs;
