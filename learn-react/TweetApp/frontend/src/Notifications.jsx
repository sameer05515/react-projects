import React, { useCallback, useEffect, useState } from "react";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "./common/components/smart-editor/SmartEditorV3";
import useMemoryManagementApis from "./common/hooks/useMemoryManagementApis/v1";
import { useDispatch, useSelector } from "react-redux";
import {
  hideBackdrop,
  selectIsBackdropActive,
  showBackdrop,
} from "./redux/slices/backdropSlice";
import { getRandomNumberWithToastNotifications as getRandomNumber } from "./components/apna-playground/sample-promises";

const Notifications = ({ id = memoryMapId }) => {
  const isDarkMode = false;
  const [apiResponse, setApiResponse] = useState({
    data: null,
    isError: false,
    message: "",
  });

  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const loading = useSelector(selectIsBackdropActive);

  const { getMemoryMap } = useMemoryManagementApis();

  const fetchMemoryMap = useCallback(async () => {
    try {
      // setLoading(true);
      const { data, isError, message } = await getMemoryMap(id);
      // if (isMounted) {
      setApiResponse({
        data,
        isError,
        message: message || "No message available",
      });

      // }
    } catch (error) {
      // if (isMounted) {
      setApiResponse({
        data: null,
        isError: true,
        message: "An unexpected error occurred.",
      });
      // }
    } finally {
      // setLoading(false);
    }
  }, [getMemoryMap, id]);

  const handleRandomNumber = useCallback(async () => {
    dispatch(showBackdrop());
    const response = await getRandomNumber();
    console.log("getRandomNumber response: ", response);
    dispatch(hideBackdrop());
  }, [dispatch]);

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

      <div>
        <button onClick={handleRandomNumber}>handleRandomNumber</button>
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
