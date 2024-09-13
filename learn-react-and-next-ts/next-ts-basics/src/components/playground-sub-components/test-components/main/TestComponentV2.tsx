import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import React, { useState, useCallback } from "react";

// Utility hook to simulate asynchronous behavior and handle random errors
const useAsyncAdd = <T extends number | string>(
  value1: T,
  value2: T,
  delay: number,
  shouldError: boolean
) => {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addValues = useCallback(() => {
    setLoading(true);
    setError(null);
    setResult(null);

    setTimeout(() => {
      if (shouldError) {
        setError("An error occurred while adding values");
        setLoading(false);
      } else {
        const res =
          typeof value1 === "number" && typeof value2 === "number"
            ? (((value1 as number) + (value2 as number)) as T)
            : (`${value1}${value2}` as T);
        setResult(res);
        setLoading(false);
      }
    }, delay);
  }, [value1, value2, delay, shouldError]);

  return { result, error, loading, addValues };
};

// Main component
const ActualLogic: React.FC = () => {
  const [input1, setInput1] = useState<string | number>("");
  const [input2, setInput2] = useState<string | number>("");
  const [isNumber, setIsNumber] = useState<boolean>(true);
  const [shouldError, setShouldError] = useState(false);

  // Using the utility hook
  const { result, error, loading, addValues } = useAsyncAdd(
    isNumber ? Number(input1) : input1,
    isNumber ? Number(input2) : input2,
    2000, // Delay in milliseconds for simulation
    shouldError // Whether to simulate an error
  );

  // Handlers
  const handleInput1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput2(e.target.value);
  };

  const toggleType = () => {
    setIsNumber((prev) => !prev);
  };

  const toggleErrorSimulation = () => {
    setShouldError((prev) => !prev);
  };

  return (
    <div className="testComponentV2">
      <h1>TestComponentV2 - Hooks and Generics</h1>

      <label>
        Input 1:{" "}
        <input
          type="text"
          value={input1}
          onChange={handleInput1Change}
          placeholder={isNumber ? "Enter a number" : "Enter a string"}
        />
      </label>
      <br />
      <label>
        Input 2:{" "}
        <input
          type="text"
          value={input2}
          onChange={handleInput2Change}
          placeholder={isNumber ? "Enter a number" : "Enter a string"}
        />
      </label>
      <br />

      <button onClick={addValues} disabled={loading}>
        {loading ? "Processing..." : "Add/Concatenate"}
      </button>

      <div>
        <label>
          <input type="checkbox" checked={!isNumber} onChange={toggleType} />{" "}
          Treat inputs as strings (concatenation)
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={shouldError}
            onChange={toggleErrorSimulation}
          />{" "}
          Simulate Error
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && !loading && !error && <p>Result: {result}</p>}
    </div>
  );
};

const TestComponentV2 = () => {
  const { GLOBAL_APPLICATION_STYLES: {
    main, testComponentV2
  } } = useGlobalStyles();
  return (
    <div className={`${main} ${testComponentV2}`}>
      <ActualLogic />
    </div>
  );
};

export default TestComponentV2;
