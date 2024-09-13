import { useState, useCallback } from "react";

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

// Hook is not generic, `fetchData` is generic
export const useApiRequest = (initialUrl?: string, initialOptions?: FetchOptions) => {
  const [result, setResult] = useState<ApiResponse<any> | null>(null); // Use 'any' initially
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(initialUrl || "");
  const [options, setOptions] = useState<FetchOptions | undefined>(initialOptions);

  const fetchData = useCallback(
    async <T,>(customUrl?: string, customOptions?: FetchOptions) => {
      setLoading(true);
      setError(null);
      const finalUrl = customUrl || url;
      const finalOptions = customOptions || options;

      try {
        const response = await fetch(finalUrl, {
          method: finalOptions?.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...finalOptions?.headers,
          },
          body: finalOptions?.body ? JSON.stringify(finalOptions.body) : undefined,
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
    },
    [url, options]
  );

  // Allow changing URL or options dynamically
  const setFetchUrlAndOptions = (newUrl: string, newOptions?: FetchOptions) => {
    setUrl(newUrl);
    setOptions(newOptions);
  };

  return { result, error, loading, fetchData, setFetchUrlAndOptions };
};
