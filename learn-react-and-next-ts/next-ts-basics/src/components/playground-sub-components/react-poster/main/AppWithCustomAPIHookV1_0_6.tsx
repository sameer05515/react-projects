import React, { useEffect } from "react";
import { useApiRequest } from "@/common/hooks/api-requests/useApiRequestV3"; // Path where hook is saved
import OverlayModal from "@/components/common/central-message-error-overlay/OverlayModal";

const BaseURL = "http://127.0.0.1:3003/tweets/v2";

const AppWithCustomAPIHookV1_0_6 = () => {
  const { result, error, loading, fetchData } = useApiRequest(BaseURL);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h1>AppWithCustomAPIHookV1_0_6</h1>
      
      {/* Overlay modal for loading and error */}
      <OverlayModal loading={loading} error={error} />

      {result && !loading && !error && (
        <p>
          Result: {result.statusCode}, <br />
          Messages: {result.messages.join(", ")}, <br />
          ApiResponse data: {JSON.stringify(result.data)}, <br />
          Type of ApiResponse data: {typeof result.data}
          <br />
        </p>
      )}
    </div>
  );
};

export default AppWithCustomAPIHookV1_0_6;
