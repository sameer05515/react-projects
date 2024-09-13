import React, { useCallback, useState } from "react";
import Input from "@/components/common/custom-input/CustomInputV3";
import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";

const default_Delay_In_MS = 300;

export const useCustomHookWithOneAsyncSetTimeOutMethod = () => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const performAsyncOperation = useCallback(
    (
      requestObject: string,
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
          setError("An error occurred while computing value");
          setLoading(false);
        } else {
          const res =
            requestObject && requestObject.trim()
              ? `Response for given requestObject: '${requestObject}', after ${computedDelay} milliseconds of ${
                  usedDefaultDelay ? "DEFAULT" : "User-Provided"
                } delay !!`
              : `Unable to perform action, as null or empty value provided`;
          setLoading(false);
          setResult(res);
        }
      }, computedDelay);
    },
    []
  );

  return { result, error, loading, performAsyncOperation };
};

const AppWithCustomAPIHookV1_0_0 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main, testComponentV2 },
  } = useGlobalStyles();
  const [inputValue, setInputValue] = useState<string>("");
  const [delay, setDelay] = useState<number>(0);
  const [shouldError, setShouldError] = useState(false);

  const { result, error, loading, performAsyncOperation } =
    useCustomHookWithOneAsyncSetTimeOutMethod();

  const handleInput1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(+e.target.value);
  };

  const toggleErrorSimulation = () => {
    setShouldError((prev) => !prev);
  };

  const actions = [
    () => performAsyncOperation(""),
    () =>
      performAsyncOperation(
        `Some value: ${new Date().toUTCString()}`,
        Math.random() < 0.7 ? 400 : 100,
        Math.random() < 0.7
      ),
  ];

  const handleClick = () => {
    // performAsyncOperation("");
    // performAsyncOperation(
    //   `Some value: ${new Date().toUTCString()}`,
    //   Math.random() < 0.7 ? 400 : 100,
    //   Math.random() < 0.7
    // );
    actions[Math.random() < 0.7 ? 0 : 1]();
  };

  return (
    <div className={`${main}`}>
      <h1>AppWithCustomAPIHookV1_0_0</h1>

      <Input
        type="checkbox"
        checked={shouldError}
        onChange={toggleErrorSimulation}
        id="input-id-4"
        label="Simulate Error: "
        name="checkedSimulationValue"
      />

      <Input
        type={"text"}
        id="input-id-1"
        label="Input 1:"
        name="input1"
        placeholder={"Enter a string value"}
        value={inputValue}
        onChange={handleInput1Change}
      />
      <Input
        type={"number"}
        id="input-id-2"
        label="Input 2:"
        name="input2"
        placeholder={"Enter delay in milliseconds"}
        value={delay}
        onChange={handleInput2Change}
      />

      <button onClick={handleClick} disabled={loading}>
        {loading ? "Processing..." : "Add/Concatenate"}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && !loading && !error && <p>Result: {result}</p>}
    </div>
  );
};

export default AppWithCustomAPIHookV1_0_0;
