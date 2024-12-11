import { useState } from "react";
import { Button } from "../Button";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <label>Count: {count}</label>
      <br />
      <Button onClick={() => setCount((prev) => prev + 1)}>Click me</Button>
    </div>
  );
}
