import React, { useCallback, useState } from "react";
import Input from "@/components/common/custom-input/CustomInputV3";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

interface ApiResponse<T> {
  status: "SUCCESS" | "VALIDATION_ERROR" | "DATABASE_ERROR" | "ERROR";
  messages: string[];
  data: T | null;
  statusCode: number;
  timeStamp: string;
}

// Type for Response Tweet data coming from the API
interface TweetData {
  _id: string;
  content: string;
  author: string;
}

const default_Delay_In_MS = 300;

function getRandomNumberBetween0andGivenNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

const AppWithCustomAPIHookV1_0_1 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main, testComponentV2 },
  } = useGlobalStyles();

  const [result, setResult] = useState<ApiResponse<string | number> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const performAsyncOperation = <T extends string | number>(
    requestObjectType: string|number,
    delay: number = 300,
    shouldError: boolean = false
  ) => {
    setLoading(true);
    setError(null);

    const [computedDelay, usedDefaultDelay] =
      delay >= default_Delay_In_MS
        ? [delay, false]
        : [default_Delay_In_MS, true];

    setTimeout(() => {
      if (shouldError) {
        const res = "An error occurred while computing value";
        setError(res);
        setLoading(false);
        setResult({
          status: "SUCCESS",
          messages: [res],
          statusCode: 200,
          timeStamp: new Date().toISOString(),
          data: null,
        });
      } else {
        const [responseMessage, validationFailed] = requestObjectType
          ? [
              `Response for given requestObjectType: '${requestObjectType}', after ${computedDelay} milliseconds of ${
                usedDefaultDelay ? "DEFAULT" : "User-Provided"
              } delay !!`,
              false,
            ]
          : [`Unable to perform action, as null or empty value provided`, true];
        const data = (
          typeof requestObjectType === "string" ? "India is great!!" : 2024
        ) as T;
        setLoading(false);
        setResult({
          status: validationFailed ? "VALIDATION_ERROR" : "SUCCESS",
          messages: [responseMessage],
          statusCode: validationFailed ? 404 : 200,
          timeStamp: new Date().toISOString(),
          data: data,
        });
      }
    }, computedDelay);
  };

  const actions = [
    () => performAsyncOperation<string>("String"),
    () => performAsyncOperation<number>("Number"),
    () => performAsyncOperation<number>(""),
    () => performAsyncOperation<number>(3),
    // () =>
    //   performAsyncOperation(
    //     `Some value: ${new Date().toUTCString()}`,
    //     Math.random() < 0.7 ? 400 : 100,
    //     Math.random() < 0.7
    //   ),
  ];

  const handleClick = () => {
    actions[getRandomNumberBetween0andGivenNumber(actions.length)]();
  };

  return (
    <div className={`${main}`}>
      <h1>AppWithCustomAPIHookV1_0_1</h1>

      <button onClick={handleClick} disabled={loading}>
        {loading ? "Processing..." : "Add/Concatenate"}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && !loading && !error && (
        <p>
          Result: {result.statusCode}, {result.messages.join(", ")},{" "}
          {JSON.stringify(result.data)}
        </p>
      )}
    </div>
  );
};

export default AppWithCustomAPIHookV1_0_1;
