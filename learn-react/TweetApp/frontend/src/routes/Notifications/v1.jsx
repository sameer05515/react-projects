import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../common/components/Smart/Editor/v3";
import useMemoryManagementApis from "../../common/hooks/useMemoryManagementApis/v1";
import { selectIsBackdropActive } from "../../redux/slices/backdropSlice";

const Notifications = ({ id = memoryMapId }) => {
  const isDarkMode = false;
  const [apiResponse, setApiResponse] = useState({
    data: null,
    isError: false,
    message: "",
  });

  // const [loading, setLoading] = useState(false);
  const loading = useSelector(selectIsBackdropActive);

  const { getMemoryMap } = useMemoryManagementApis();

  const fetchMemoryMap = useCallback(async () => {
    try {
      const { data, isError, message } = await getMemoryMap(id);

      setApiResponse({
        data,
        isError,
        message: message || "No message available",
      });
    } catch (error) {
      setApiResponse({
        data: null,
        isError: true,
        message: "An unexpected error occurred.",
      });
    } finally {
      console.log("Operation completed. Do any cleanup work here.");
    }
  }, [getMemoryMap, id]);

  useEffect(() => {
    fetchMemoryMap();
  }, [fetchMemoryMap, getMemoryMap, id]); // Ensure these dependencies are stable

  const { data, isError, message } = apiResponse;

  if (loading) {
    return <span>Loading</span>;
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "black" : "white",
        color: isDarkMode ? "white" : "black",
        padding: "5px 25px",
      }}
    >
      <div>
        <strong>Status:</strong> {isError ? "Error Occurred" : "Success"}
        <br />
        <strong>Message:</strong> {message}
      </div>

      <SmartPreviewer
        data={{
          content: data?.name || "No content available",
          textOutputType: SupportedTextFormats.MARKDOWN,
        }}
        markdownStyles={{ fontSize: "25px" }}
      />

      <SmartPreviewer
        data={{
          content: data?.skeleton || "No skeleton available",
          textOutputType: SupportedTextFormats.SKELETON,
        }}
      />
    </div>
  );
};

const memoryMapId = "cd6bb190-0e56-4e3a-8f01-748c8d05d9d4";

export default React.memo(Notifications);
