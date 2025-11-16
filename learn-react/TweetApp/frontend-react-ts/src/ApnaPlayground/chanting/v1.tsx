import React, { useState } from 'react';

const ChantingV1 = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-sm p-4">
        <h1 className="mb-4 text-primary">Chanting Counter</h1>
        
        <h2 className="mb-3">{count}</h2>
        
        <button 
          className="btn btn-success btn-lg"
          onClick={() => setCount(prev => prev + 1)}
        >
          Click Me
        </button>
      </div>
    </div>
  );
};

export default ChantingV1;
