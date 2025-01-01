import { BACKEND_APPLICATION_BASE_URL } from "../../constants/globalConstants";
import { apiRequest } from "../../service/apiClient/v1";
import { validateInputs } from "../../service/apiRequestValidation";
// import useConsolidated from "../useConsolidated/releases/v400";
import useConsolidated from "../useConsolidated/v4";

// Base URL for Topic Management API requests
const TOPIC_MGMT_BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/topics`;

const API_ENDPOINTS = {
  SECTION: (linkedTopicUniqueId, uniqueId) =>
    `/${linkedTopicUniqueId}/sections/${uniqueId}`,
  //   QUESTIONS: "/questions",
};

const getUrl = (endpoint) => {
  if (!endpoint) {
    console.trace(`endpoint: '${endpoint}'`);
    return null;
  }
  return `${TOPIC_MGMT_BASE_URL}${endpoint}`;
};

const useTopicManagementApis = () => {
  const { executeApiRequest } = useConsolidated();

  const getSectionData = (linkedTopicUniqueId, sectionUniqueId) => {
    const apiRequestPromise = () =>
      apiRequest({
        url: getUrl(
          API_ENDPOINTS.SECTION(
            linkedTopicUniqueId,
            sectionUniqueId
          )
        ),
        method: "GET",
      });

    const validateRequest = () => {
      validateInputs([
        {
          key: "linkedTopicUniqueId",
          value: linkedTopicUniqueId,
          type: "string",
        },
        { key: "sectionUniqueId", value: sectionUniqueId, type: "string" },
      ]);
      return true;
    };

    const messages = {
      //   loadingMessage: "Updating question details...",
      //   successMessage: "Question updated successfully!",
      //   failureMessage: `Failed to update question for unique ID: ${uniqueId}`,
    };

    return executeApiRequest(apiRequestPromise, validateRequest, messages);
  };

  return { getSectionData };
};

export default useTopicManagementApis;
