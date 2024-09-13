import React from "react";
import { useApiRequest } from "@/common/hooks/api-requests/useApiRequestV2"; // Path where hook is saved
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

const BaseURL = "http://127.0.0.1:3003/tweets/v2";

const AppWithCustomAPIHookV1_0_5 = () => {
    const {
        GLOBAL_APPLICATION_STYLES: { main },
      } = useGlobalStyles();
  const { result, error, loading, fetchData, setFetchUrlAndOptions } = useApiRequest();

  const handleFetchTweets = () => {
    fetchData<{ tweets: string[] }>(BaseURL);
  };

  const handleFetchSpecificTweet = () => {
    fetchData<{ tweet: string }>(`${BaseURL}/66ea7f008d5baf3f7cd22b10`);
  };

  return (
    <div className={`${main}`}>
      <h1>AppWithCustomAPIHookV1_0_5</h1>

      <button onClick={handleFetchTweets} disabled={loading}>
        {loading ? "Fetching Tweets..." : "Fetch All Tweets"}
      </button>

      <button onClick={handleFetchSpecificTweet} disabled={loading}>
        {loading ? "Fetching Tweet..." : "Fetch Specific Tweet"}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && !loading && !error && (
        <p>
          Result: {result.statusCode}, <br />
          Messages: {result.messages.join(", ")}, <br />
          ApiResponse data: {JSON.stringify(result.data)}, <br />
          type of ApiResponse data: {typeof result.data}
          <br />
        </p>
      )}
    </div>
  );
};

export default AppWithCustomAPIHookV1_0_5;
