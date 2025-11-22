import { useState, useCallback, useRef, useEffect } from "react";
import { fetchFnWrapper, prepareErrorMessage } from "./utils";

const useDataFetching = ({ url, options = {}, source = "" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setData(null);
      setError(null);
      const { data, message } = await fetchFnWrapper({
        url,
        options: optionsRef.current,
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
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn("[useFetchByUrl]", source || "fetch", errorMessage, error);
      }
    } finally {
      setLoading(false);
    }
  }, [url, source]);

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
