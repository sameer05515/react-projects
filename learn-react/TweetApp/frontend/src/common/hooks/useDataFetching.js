import { useState, useEffect, useCallback } from "react";

const prepareErrorMessage = (error, defaultMessage) => {
  if (!error) return defaultMessage;
  if (typeof error === "string" && error.trim()) return error;
  if (
    error.message &&
    typeof error.message === "string" &&
    error.message.trim()
  )
    return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return defaultMessage;
  }
};

const fetchFnWrapper = async ({ url, options }) => {
  console.log(`url: ${url}, ${new Date()}`);

  try {
    if (!url) {
      return {
        data: null,
        isError: true,
        message: `Url should not be null or undefined. Provided url is: '${url}'`,
      };
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data : Response Status: ${response.status}`
      );
    }
    const result = await response.json();
    return { data: result, isError: false, message: "" };
  } catch (error) {
    return {
      data: null,
      isError: true,
      message: prepareErrorMessage(error, "Something bad happenned!!"),
    };
  }
};

const useDataFetching = ({
  url,
  options = {},
  // fetchInitially = true,
  source = "",
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async () => {
      console.trace("Trace: From fetchData callback");
      try {
        setLoading(true);
        const { data, message } = await fetchFnWrapper({
          url,
          options,
        });
        setData(data);
        setError(message);
      } catch (error) {
        console.error("Some unexpected happened");
        setError("Some unexpected happened");
        console.trace(
          source ? "Source could be: " + source : "",
          "An error occurred: ",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    [options, source, url]
  );

  // useEffect(() => {
  //   if (url && loading && fetchInitially && fetchInitially === true) {
  //     console.log("From use effect");
  //     // console.log(`fetching Initially`, `url: ${url}`);
  //     fetchData(url, options);
  //   }
  // }, [fetchData, fetchInitially, loading, options, url]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setData(null);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useDataFetching;

// const options = {
//     method: 'POST', // Specify the HTTP method
//     headers: {
//       'Content-Type': 'application/json', // Set the content type of the request body
//       // Add any additional headers as needed
//       'Authorization': 'Bearer your_access_token', // Example: Authorization header for authentication
//     },
//     body: JSON.stringify({
//       // Include the data to be sent in the request body
//       // This object will be converted to JSON format using JSON.stringify
//       key1: 'value1',
//       key2: 'value2',
//       // Add any other data fields as needed
//     }),
//   };
