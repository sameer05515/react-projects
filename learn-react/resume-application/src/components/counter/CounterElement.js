import React, { useState } from 'react';
import Card from '../UI/Card';

function CounterElement() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <Card>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    </Card>
  );
}

export default CounterElement;