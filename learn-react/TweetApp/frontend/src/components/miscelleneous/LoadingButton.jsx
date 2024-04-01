import React, { useState } from 'react';
import './loading-button.css'

function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Click Me
      </button>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoadingButton;
