import { useState, useCallback, useRef } from "react"; // ✅ Removed unused useMemo
import { fetchFnWrapper, prepareErrorMessage } from "./utils";

const useDataFetching = ({ url, options = {}, source = "" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // ✅ Use ref to store latest options to avoid recreating fetchData
  const optionsRef = useRef(options);
  const sourceRef = useRef(source);
  const urlRef = useRef(url);
  
  // Update refs when values change
  optionsRef.current = options;
  sourceRef.current = source;
  urlRef.current = url;

  const fetchData = useCallback(async () => {
    if (process.env.NODE_ENV === 'development') {
      console.trace("Trace: From fetchData callback");
    }
    try {
      setLoading(true);
      setData(null);
      setError(null);
      const { data, message } = await fetchFnWrapper({
        url: urlRef.current,
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
      if (process.env.NODE_ENV === 'development') {
        console.trace(
          errorMessage,
          sourceRef.current ? "Source could be: " + sourceRef.current : "",
          error
        );
      }
    } finally {
      setLoading(false);
    }
  }, []); // ✅ Empty dependency array - use refs for latest values

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
