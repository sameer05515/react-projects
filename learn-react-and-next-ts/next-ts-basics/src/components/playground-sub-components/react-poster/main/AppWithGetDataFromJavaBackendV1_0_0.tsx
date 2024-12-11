import React, { useState, useEffect } from "react";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import { fetchGeneric } from "@/common/utils/fetch-from-server/fetchGenericV1_0_1";
import { ApiResponse } from "@/common/hooks/useTweetsAPIFetch";
import JSONDataViewer from "@/components/common/JSONDataViewer";

interface User {
  name: string;
  email: string;
  age: number;
}

const BaseURL = "http://127.0.0.1:8080/success";

const AppWithGetDataFromJavaBackendV1_0_0: React.FC = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();

  const [result, setResult] = useState<
  ApiResponse<number[] | null> | number[] | null
>(null);




  const reload = () => {
    setResult(() => null);
    // fetchData(
    //   { url: urls[getRandomNumberBetween0andGivenNumber(urls.length)] },
    //   (resp) => {
    //     console.log("Success Response: ", resp);
    //     setResult(() => resp as ApiResponse<TweetData[] | null>);
    //   },
    //   (resp) => {
    //     console.log("Error Response: ", resp);
    //     setResult(() => resp as ApiResponse<TweetData[] | null>);
    //   },
    //   false
    // );

    fetchGeneric<ApiResponse<unknown>>(
      BaseURL
    )
      .then((resp) => {
        console.log("Success Response: ", resp);
        setResult(() => resp as ApiResponse<number[] | null>);
      })
      .catch((err) =>
        console.log("Error occurred: ", JSON.stringify(err, null, 2))
      );
  };

  // if (loading) return <div>Loading users...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${main}`}>
      <h1>AppWithFetchGenericUtil_V_1_0_1</h1>

      <button onClick={reload}>{"Fetch All Tweets"}</button>

      <JSONDataViewer
        metadata={{ result }}
        title="AppWithFetchGenericUtil_V_1_0_1: Data X-ray"
      />
    </div>
  );
};

export default AppWithGetDataFromJavaBackendV1_0_0;
