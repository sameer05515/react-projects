import { useGlobalStyles } from "@/common/hooks/useGlobalStyles";
import React, { useCallback, useState } from "react";
import Form, {
  type CustomFormV6Handle,
} from "@/components/common/custom-form/CustomFormV4.2";
import Input from "@/components/common/custom-input/CustomInputV3";

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

const ActualLogicComp = () => {
  //className={postModuleForm} ref={customFormRef}

  const [input1, setInput1] = useState<string | number>("");
  const [input2, setInput2] = useState<string | number>("");
  const [shouldError, setShouldError] = useState(false);
  const [isNumber, setIsNumber] = useState<boolean>(true);

  // Using the utility hook
  const { result, error, loading, addValues } = useAsyncAdd(
    isNumber ? Number(input1) : input1,
    isNumber ? Number(input2) : input2,
    2000, // Delay in milliseconds for simulation
    shouldError // Whether to simulate an error
  );

  // const handleSubmit = (rawData: unknown) => {
  //   console.log(rawData);
  // };

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
    <div>
      <h1>TestComponentV3 - Hooks and Generics</h1>

      <Input
        type="checkbox"
        checked={!isNumber}
        onChange={toggleType}
        id="input-id-3"
        label="Treat inputs as strings (concatenation): "
        name="checkedToggleTypeValue"
      />

      <Input
        type="checkbox"
        checked={shouldError}
        onChange={toggleErrorSimulation}
        id="input-id-4"
        label="Simulate Error: "
        name="checkedSimulationValue"
      />

      <Input
        type={isNumber ? "number" : "text"}
        id="input-id-1"
        label="Input 1:"
        name="input1"
        placeholder={isNumber ? "Enter a number" : "Enter a string"}        
        value={input1}
        onChange={handleInput1Change}
      />
      <Input
        type={isNumber ? "number" : "text"}
        id="input-id-2"
        label="Input 2:"
        name="input2"
        placeholder={isNumber ? "Enter a number" : "Enter a string"}        
        value={input2}
        onChange={handleInput2Change}
      />

      <button onClick={addValues} disabled={loading}>
        {loading ? "Processing..." : "Add/Concatenate"}
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && !loading && !error && <p>Result: {result}</p>}
    </div>
  );
};

const TestComponentV3 = () => {
  const {
    GLOBAL_APPLICATION_STYLES: { main, testComponentV2 },
  } = useGlobalStyles();
  return (
    <div className={`${main}`}>
      <ActualLogicComp />
    </div>
  );
};

export default TestComponentV3;
