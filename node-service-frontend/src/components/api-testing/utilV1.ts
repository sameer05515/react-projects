import axios from "axios";
import { apiRequest } from "../../common/utils/apiClient";
import { type APISubmitResponseProps } from "./APIRequestCreationForms";

export const getDetailsWithAxios = async ({
  method,
  url,
}: APISubmitResponseProps): Promise<{ data: unknown; error: unknown }> => {
  try {
    const response = await axios({
      method: method, // Ensure method is lowercase for Axios
      url: `${url}`,
    });

    const contentType = response.headers["content-type"];

    let responseData;
    if (contentType && contentType.includes("application/json")) {
      responseData = response.data; // Axios parses JSON responses automatically
    } else {
      responseData = response.data; // Fallback for other content types
    }

    console.log("Request URL:", `${url}`, "Response Data:", responseData);
    return {
      data: { responseData, response },
      error: null,
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      data: null,
      error: err,
    };
  }
};

export const getDetailsWithApiClient = async ({
  method,
  url,
}: APISubmitResponseProps): Promise<{ data: unknown; error: unknown }> => {
  try {
    const response = await apiRequest({
      method: method, // Ensure method is lowercase for Axios
      url: `${url}`,
    });

    console.log("Request URL:", `${url}`, "Response Data:", response.data);
    return {
      data: {
        apiClientResponseData: response.data,
        apiClientResponse: response,
      },
      error: {
        errorMessage: response.error,
        isError: response.isError,
        errorResponse: response.error,
      },
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      data: null,
      error: err,
    };
  }
};

export const getDetailsWithFetch = async ({
  method,
  url,
}: APISubmitResponseProps): Promise<{ data: unknown; error: unknown }> => {
  try {
    const response = await fetch(`${url}`, { method });
    const contentType = response.headers.get("Content-Type");

    let responseData;
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text(); // Fallback for plain text or other responses
    }

    console.log("Request URL:", `${url}`, "Response Data:", responseData);
    return {
      data: responseData,
      error: null,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      data: null,
      error: error,
    };
  }
};
