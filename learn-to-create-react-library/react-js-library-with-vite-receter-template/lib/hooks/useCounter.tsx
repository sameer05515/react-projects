import { useState } from "react";

export function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState(initialValue);

  const increase = () => setCounter((prev) => prev + 1);
  const decrease = () => setCounter((prev) => prev - 1);
  return {
    counter,
    increase,
    decrease,
  };
}

// export default useCounter;
