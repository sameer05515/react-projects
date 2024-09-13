import React, { useCallback, useState } from "react";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

interface ApiResponse<T> {
  status: "SUCCESS" | "VALIDATION_ERROR" | "DATABASE_ERROR" | "ERROR";
  messages: string[];
  data: T | null;
  statusCode: number;
  timeStamp: string;
}

// Type for Tweet data coming from the API
interface TweetData {
  _id: string;
  content: string;
  author: string;
}

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
};

function getRandomNumberBetween0andGivenNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

// Extract reusable async operation logic
function performAsyncOperation<T extends string | number>(
  url: string, 
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResult: React.Dispatch<React.SetStateAction<ApiResponse<T | null> | null>>,
  options?: FetchOptions,
) {
  setLoading(true);
  setError(null);

  const fetchData = async () => {
    setLoading(true);
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
  };

  fetchData();

}


const BaseURL = "http://127.0.0.1:3003/tweets/v2";

const AppWithCustomAPIHookV1_0_3 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main },
  } = useGlobalStyles();

  const [result, setResult] = useState<ApiResponse<
    string | number | null
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Array of actions to trigger different async operations
  const actions = [
    () => performAsyncOperation(BaseURL, setError, setLoading, setResult),
    // () => performAsyncOperation(3, setError, setLoading, setResult),
    () => performAsyncOperation(`${BaseURL}/${'66ea7f008d5baf3f7cd22b10'}`, setError, setLoading, setResult),
  ];

  const handleClick = () => {
    actions[getRandomNumberBetween0andGivenNumber(actions.length)]();
  };

  return (
    <div className={`${main}`}>
      <h1>AppWithCustomAPIHookV1_0_3</h1>

      <button onClick={handleClick} disabled={loading}>
        {loading ? "Processing..." : "Execute"}
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

export default AppWithCustomAPIHookV1_0_3;
