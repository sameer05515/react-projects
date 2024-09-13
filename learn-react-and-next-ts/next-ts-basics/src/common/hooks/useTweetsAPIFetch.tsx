import { useState, useEffect } from "react";

export interface ApiResponse<T> {
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

export const useTweetsAPIFetch = <T,>(url: string, options?: FetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
          setData(responseJson.data);
        } else {
          setError(responseJson.messages.join(", "));
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};
