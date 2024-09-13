import React, { useEffect } from "react";
import { useApiRequest } from "@/common/hooks/api-requests/useApiRequestV5"; // Path where hook is saved

const BaseURL = "http://127.0.0.1:3003/tweets/v2";

const AppWithCustomAPIHookV1_0_8 = () => {
  const { result, fetchData, overlayModal } = useApiRequest(BaseURL);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h1>AppWithCustomAPIHookV1_0_8</h1>

      {/* Overlay modal will automatically render */}
      {overlayModal}

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

export default AppWithCustomAPIHookV1_0_8;
