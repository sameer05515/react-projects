import { useState, useEffect } from "react";

const useDataFetching = (url, options = {}, fetchInitially=true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      //console.log(`fetchData: `, new Date() , url);  
      setLoading(true);    
      const response = await fetch(url, options);
      if (!response.ok) {
        // throw new Error("Failed to fetch data");
        throw new Error(`Failed to fetch data : Response Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(fetchInitially && fetchInitially===true){
      // console.log(`fetching Initially`)
      fetchData();
    }    
  }, []);

  const refetch = () => {
    // console.log(`refetch`)
    setLoading(true);
    setError(null);
    setData(null);
    fetchData();
  };

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
