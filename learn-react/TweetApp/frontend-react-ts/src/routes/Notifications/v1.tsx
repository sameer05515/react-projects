import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  SmartPreviewer,
  availableOutputTypes as SupportedTextFormats,
} from "../../common/components/Smart/Editor/v3";
import useMemoryManagementApis from "../../common/hooks/useMemoryManagementApis/v1";
import { selectIsBackdropActive } from "../../redux/slices/backdropSlice";

type MemoryMapItem = {
  name?: string;
  skeleton?: string;
};

type ApiResponse = {
  data: MemoryMapItem | null;
  isError: boolean;
  message: string;
};

type NotificationsProps = {
  id?: string;
};

const Notifications: React.FC<NotificationsProps> = ({ id = memoryMapId }) => {
  const isDarkMode = false;
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
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
        data: data as MemoryMapItem,
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
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} px-6 py-1`}>
      <div className="mb-4 p-4 rounded-lg border border-gray-200">
        <div className="mb-2">
          <strong className="text-lg">Status:</strong>{" "}
          <span className={isError ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
            {isError ? "Error Occurred" : "Success"}
          </span>
        </div>
        <div>
          <strong className="text-lg">Message:</strong>{" "}
          <span className="text-gray-700">{message}</span>
        </div>
      </div>

      <div className="mb-4">
        <SmartPreviewer
          data={{
            content: data?.name || "No content available",
            textOutputType: SupportedTextFormats.MARKDOWN,
            textInputType: "TextArea",
          }}
          markdownStyles={{ fontSize: "25px" }}
        />
      </div>

      <div className="mb-4">
        <SmartPreviewer
          data={{
            content: data?.skeleton || "No skeleton available",
            textOutputType: SupportedTextFormats.SKELETON,
            textInputType: "TextArea",
          }}
        />
      </div>
    </div>
  );
};

const memoryMapId = "cd6bb190-0e56-4e3a-8f01-748c8d05d9d4";

export default React.memo(Notifications);
