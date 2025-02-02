import { apiRequest } from "../../../../common/service/apiClient/v1";
import { prepareErrorMessage } from "../../../../common/hooks/useConsolidated/message-preparation-utils";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";

const BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/think-tank/v1`;

const ENDPOINTS = {
  BASE: () => "/",
  WITH_THINK_TANK_UID: (uniqueId = "") => `/${uniqueId}`,
  //   FETCH_SECTIONS_V2: "/api/sections/v1/fetch-sections-v2",
  //   FETCH_SECTIONS_V3: "/api/sections/v1/fetch-sections-v3",
  //   FETCH_SECTIONS_V4: "/api/sections/v1/fetch-sections-v4",
  //   FETCH_SECTIONS_V5: "/api/sections/v1/fetch-sections-v5",
  //   FETCH_SECTIONS_V6: "/api/sections/v1/fetch-sections-v6",
  //   FETCH_SECTIONS_V7: "/api/sections/v1/fetch-sections-v7",
  //   FETCH_SECTION_DETAILS_V1: "/api/sections/v1/fetch-section-details-v1",
  //   FETCH_SECTION_DETAILS_V2: "/api/sections/v1/fetch-section-details-v2",
};

const prepareErrorResponse = (error = "", defaultMessage = "") => {
  const errorMessage = prepareErrorMessage(error, defaultMessage || "Unexpected Error occurred!");
  console.error(errorMessage, error);
  return { data: null, isError: true, message: errorMessage };
};
// possible values of method: "get" | "put" | "post" | "patch" | "delete" | "patch"
/**
 * Generic function to fetch data from a given endpoint.
 * @param {string} endpointUrl - API endpoint URL.
 * @param {string} queryParameterObject - Query Parameters as Object.
 * @returns {Promise<{data: any, isError: boolean, message: string}>}
 */
const interactWithApi = async ({ method = "get", endpointUrl = "", queryParameterObject = {} }) => {
  try {
    const { data, isError, message } = await apiRequest({
      method: method,
      url: endpointUrl,
      params: queryParameterObject || {},
    });
    return { data, isError, message };
  } catch (error) {
    return prepareErrorResponse(
      error,
      `An unexpected error occurred while fetching data from endpoint: ${endpointUrl}`
    );
  }
};

export const fetchThinkTankItems = (queryParameterObject = {}) => {
  try {
    return interactWithApi({ method: "get", endpointUrl: `${BASE_URL}${ENDPOINTS.BASE()}`, queryParameterObject });
  } catch (error) {
    return prepareErrorResponse(error, `An unexpected error occurred while fetching ThinkTankItems`);
  }
};


