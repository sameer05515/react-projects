import React, { useEffect, useState } from "react";
import { useApiRequest } from "@/common/hooks/api-requests/useApiRequestV6"; // Path where hook is saved
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import { ApiResponse } from "@/common/hooks/useTweetsAPIFetch";
import JSONDataViewer from "@/components/common/JSONDataViewer";

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

const AppWithCustomAPIHookV1_0_9 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();
  const { fetchData, overlayModal } = useApiRequest();
  const [result, setResult] = useState<ApiResponse<TweetData[] | null> | null>(
    null
  );

  useEffect(() => {
    reload();
  }, [fetchData]);

  const reload = () => {
    setResult(() => null);
    fetchData(
      { url: urls[getRandomNumberBetween0andGivenNumber(urls.length)] },
      (resp) => {
        console.log("Success Response: ", resp);
        setResult(() => resp as ApiResponse<TweetData[] | null>);
      },
      (resp) => {
        console.log("Error Response: ", resp);
        setResult(() => resp as ApiResponse<TweetData[] | null>);
      },
      false
    );
  };

  return (
    <div className={`${main}`}>
      <h1>AppWithCustomAPIHookV1_0_9</h1>

      {/* Overlay modal will automatically render */}
      {overlayModal}

      <button onClick={reload}>{"Fetch All Tweets"}</button>

      <JSONDataViewer
        metadata={{ result }}
        title="AppWithCustomAPIHookV1_0_9: Data X-ray"
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

export default AppWithCustomAPIHookV1_0_9;
