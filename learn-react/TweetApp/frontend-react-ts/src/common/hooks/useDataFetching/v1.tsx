import { useState, useCallback } from "react";
import { fetchFnWrapper, prepareErrorMessage } from "./utils";

const useDataFetching = ({ url, options = {}, source = "" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  

  const fetchData = useCallback(async () => {
    console.trace("Trace: From fetchData callback");
    try {
      setLoading(true);
      setData(null);
      setError(null);
      const { data, message } = await fetchFnWrapper({
        url,
        options,
      });
      setData(data);
      setError(message);
    } catch (error) {
      const errorMessage = prepareErrorMessage(
        error,
        "Some unexpected happened"
      );
      // console.error(errorMessage);
      setError(errorMessage);
      console.trace(
        errorMessage,
        source ? "Source could be: " + source : "",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [options, source, url]);

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
