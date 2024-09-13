import { useState, useCallback } from "react";
import OverlayModal from "@/components/common/central-message-error-overlay/OverlayModal"; // Assuming you saved the modal as OverlayModal

interface ApiResponse<T> {
  status: "SUCCESS" | "VALIDATION_ERROR" | "DATABASE_ERROR" | "ERROR";
  messages: string[];
  data: T | null;
  statusCode: number;
  timeStamp: string;
}

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
};

export const useApiRequest = <T extends string | number>(
  url: string,
  options?: FetchOptions
) => {
  const [result, setResult] = useState<ApiResponse<T | null> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: options?.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      const responseJson: ApiResponse<T> = await response.json();

      if (response.ok && responseJson.status === "SUCCESS") {
        setResult(responseJson);
      } else {
        setError(responseJson.messages.join(", "));
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { result, error, loading, fetchData };
};
