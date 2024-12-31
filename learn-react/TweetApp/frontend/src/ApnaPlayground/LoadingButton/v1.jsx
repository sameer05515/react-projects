import React, { useState } from 'react';
import styles from './styles.module.css'

function LoadingButtonV1() {
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
        <div className={styles["loading-overlay"]}>
          <div className={styles["loading-content"]}>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoadingButtonV1;
