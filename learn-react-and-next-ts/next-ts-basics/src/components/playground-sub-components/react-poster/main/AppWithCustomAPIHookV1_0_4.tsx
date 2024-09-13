import React from "react";
import { useApiRequest } from "@/common/hooks/api-requests/useApiRequest"; // Path where hook is saved
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

const BaseURL = "http://127.0.0.1:3003/tweets/v2";

const AppWithCustomAPIHookV1_0_4 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();

  const {
    result: result1,
    error: error1,
    loading: loading1,
    fetchData: fetchData1,
  } = useApiRequest<string>(BaseURL);

  const {
    result: result2,
    error: error2,
    loading: loading2,
    fetchData: fetchData2,
  } = useApiRequest<string>(`${BaseURL}/66ea7f008d5baf3f7cd22b10`);

  const actions = [fetchData1, fetchData2];

  const handleClick = () => {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    randomAction();
  };

  return (
    <div className={`${main}`}>
      <h1>AppWithCustomAPIHookV1_0_4</h1>

      <button onClick={handleClick} disabled={loading1 || loading2}>
        {(loading1 || loading2) ? "Processing..." : "Execute"}
      </button>

      {(loading1 || loading2) && <p>Loading...</p>}

      {error1 && <p style={{ color: "red" }}>Error: {error1}</p>}
      {result1 && !loading1 && !error1 && (
        <p>
          Result: {result1.statusCode}, <br />
          Messages: {result1.messages.join(", ")}, <br />
          ApiResponse data: {JSON.stringify(result1.data)}, <br />
          type of ApiResponse data: {typeof result1.data}
        </p>
      )}

      {error2 && <p style={{ color: "red" }}>Error: {error2}</p>}
      {result2 && !loading2 && !error2 && (
        <p>
          Result: {result2.statusCode}, <br />
          Messages: {result2.messages.join(", ")}, <br />
          ApiResponse data: {JSON.stringify(result2.data)}, <br />
          type of ApiResponse data: {typeof result2.data}
        </p>
      )}
    </div>
  );
};

export default AppWithCustomAPIHookV1_0_4;
