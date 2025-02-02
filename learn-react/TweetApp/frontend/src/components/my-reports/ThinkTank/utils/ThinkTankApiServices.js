import { apiRequest } from "../../../../common/service/apiClient/v1";
import { prepareErrorMessage } from "../../../../common/hooks/useConsolidated/message-preparation-utils";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";

const BASE_URL = `${BACKEND_APPLICATION_BASE_URL}/think-tank/v1`;

const ENDPOINTS = {
  BASE: () => "/",
  WITH_THINK_TANK_UID: (uniqueId = "") => `/${uniqueId}`,
};

const prepareErrorResponse = (error = "", defaultMessage = "") => {
  const errorMessage = prepareErrorMessage(error, defaultMessage || "Unexpected Error occurred!");
  //   console.error(errorMessage, error);
  return { data: null, isError: true, message: errorMessage };
};
// possible values of method: "get" | "put" | "post" | "patch" | "delete" | "patch"
/**
 * Generic function to fetch data from a given endpoint.
 * @param {string} endpointUrl - API endpoint URL.
 * @param {string} queryParameterObject - Query Parameters as Object.
 * @returns {Promise<{data: any, isError: boolean, message: string}>}
 */
const interactWithApi = async ({ method = "get", endpointUrl = "", queryParameterObject = {}, body = {} }) => {
  try {
    const { data, isError, message } = await apiRequest({
      method: method,
      url: endpointUrl,
      params: queryParameterObject || {},
      data: body || {},
    });
    return { data, isError, message };
  } catch (error) {
    return prepareErrorResponse(
      error,
      `An unexpected error occurred while fetching data from endpoint: ${endpointUrl}`
    );
  }
};

export const fetchThinkTankItems = async (queryParameterObject = {}) => {
  try {
    return interactWithApi({ method: "get", endpointUrl: `${BASE_URL}${ENDPOINTS.BASE()}`, queryParameterObject });
  } catch (error) {
    return prepareErrorResponse(error, `An unexpected error occurred while fetching ThinkTankItems`);
  }
};

export const saveThinkTankItem = async (
  data = { smartContent: { textOutputType: "", content: "", textInputType: "" }, itemType: "" }
) => {
  try {
    if (!data || !data?.smartContent || !data.smartContent.content) {
      throw new Error("Invalid data");
    }
    return interactWithApi({ method: "post", endpointUrl: `${BASE_URL}${ENDPOINTS.BASE()}`, body: data });
  } catch (error) {
    return prepareErrorResponse(error, `An unexpected error occurred while fetching ThinkTankItems`);
  }
};

export const updateThinkTankItem = async (uniqueId = "", data) => {
  try {
    if (!data || !uniqueId) {
      throw new Error("Invalid data");
    }

    return interactWithApi({
      method: "post",
      endpointUrl: `${BASE_URL}${ENDPOINTS.WITH_THINK_TANK_UID(uniqueId)}`,
      body: data,
    });
  } catch (error) {
    return prepareErrorResponse(error, `An unexpected error occurred while fetching ThinkTankItems`);
  }
};
