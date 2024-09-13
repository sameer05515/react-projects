import React, { useEffect, useState } from "react";
// import { useApiRequest } from "@/common/hooks/api-requests/useApiRequestV6"; // Path where hook is saved
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import { ApiResponse } from "@/common/hooks/useTweetsAPIFetch";
import JSONDataViewer from "@/components/common/JSONDataViewer";
import { fetchGeneric } from "@/common/utils/fetch-from-server/fetchGenericV1_0_0";

const BaseURL = "http://127.0.0.1:3003/tweets/v2";

const urls = [
  BaseURL,
  `${BaseURL}/66ea7f008d5baf3f7cd22b10`,
  `${BaseURL}/66ea7f008d5baf3f7cd22b99`,
];
function getRandomNumberBetween0andGivenNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

interface TweetData {
  _id: string;
  content: string;
  author: string;
}

const AppWithFetchGenericUtil_V_1_0_0 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();
  //   const { fetchData, overlayModal } = useApiRequest();
  const [result, setResult] = useState<ApiResponse<TweetData[] | null> | null>(
    null
  );

  //   useEffect(() => {
  //     reload();
  //   }, [fetchData]);

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
      urls[getRandomNumberBetween0andGivenNumber(urls.length)]
    )
      .then((resp) => {
        console.log("Success Response: ", resp);
        setResult(() => resp as ApiResponse<TweetData[] | null>);
      })
      .catch((err) =>
        console.log("Error occurred: ", JSON.stringify(err, null, 2))
      );
  };

  return (
    <div className={`${main}`}>
      <h1>AppWithFetchGenericUtil_V_1_0_0</h1>

      {/* Overlay modal will automatically render */}
      {/* {overlayModal} */}

      <button onClick={reload}>{"Fetch All Tweets"}</button>

      <JSONDataViewer
        metadata={{ result }}
        title="AppWithFetchGenericUtil_V_1_0_0: Data X-ray"
      />

      {result && (
        <p>
          Result: {result.statusCode}, <br />
          Messages: {result.messages.join(", ")}, <br />
          ApiResponse data: {JSON.stringify(result.data)}, <br />
          Type of ApiResponse data: {typeof result.data}
        </p>
      )}
    </div>
  );
};

export default AppWithFetchGenericUtil_V_1_0_0;
