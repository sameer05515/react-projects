import React, { useCallback, useState } from "react";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

interface ApiResponse<T> {
  status: "SUCCESS" | "VALIDATION_ERROR" | "DATABASE_ERROR" | "ERROR";
  messages: string[];
  data: T | null;
  statusCode: number;
  timeStamp: string;
}

const default_Delay_In_MS = 300;

function getRandomNumberBetween0andGivenNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

// Helper function to create the ApiResponse object
function getApiResponse<T>(
  status: ApiResponse<T>["status"],
  message: string,
  data: T | null,
  statusCode: number
): ApiResponse<T> {
  return {
    status,
    messages: [message],
    data,
    statusCode,
    timeStamp: new Date().toISOString(),
  };
}

// Extract reusable async operation logic
function performAsyncOperation<T extends string | number>(
  requestObjectType: string | number,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResult: React.Dispatch<React.SetStateAction<ApiResponse<T | null> | null>>,
  delay: number = default_Delay_In_MS,
  shouldError: boolean = false
) {
  setLoading(true);
  setError(null);

  const computedDelay =
    delay >= default_Delay_In_MS ? delay : default_Delay_In_MS;

  setTimeout(() => {
    if (shouldError) {
      const res = "An error occurred while computing value";
      setError(res);
      setLoading(false);
      setResult(getApiResponse("ERROR", res, null, 500));
    } else {
      const validationFailed = !requestObjectType;
      const responseMessage = requestObjectType
        ? `Response for given requestObjectType: '${requestObjectType}', after ${computedDelay} milliseconds`
        : "Unable to perform action, as null or empty value provided";
      const data = (
        typeof requestObjectType === "string" ? "India is great!!" : 2024
      ) as T;
      setLoading(false);
      setResult(
        getApiResponse(
          validationFailed ? "VALIDATION_ERROR" : "SUCCESS",
          responseMessage,
          validationFailed ? null : data,
          validationFailed ? 404 : 200
        )
      );
    }
  }, computedDelay);
}

const AppWithCustomAPIHookV1_0_2 = () => {
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
    () => performAsyncOperation("String", setError, setLoading, setResult),
    () => performAsyncOperation(3, setError, setLoading, setResult),
    () => performAsyncOperation("", setError, setLoading, setResult),
  ];

  const handleClick = () => {
    actions[getRandomNumberBetween0andGivenNumber(actions.length)]();
  };

  return (
    <div className={`${main}`}>
      <h1>AppWithCustomAPIHookV1_0_2</h1>

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

export default AppWithCustomAPIHookV1_0_2;
