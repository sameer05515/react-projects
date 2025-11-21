import React, { useState } from 'react';

function LoadingButtonV1() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
          isLoading
            ? 'cursor-not-allowed bg-gray-300 text-gray-600'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        title="Start loading for 5 seconds"
      >
        {isLoading ? 'Loading…' : 'Click Me'}
      </button>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-black/20">
          <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-gray-700 shadow">
            <svg
              className="h-4 w-4 animate-spin text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span>Processing…</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoadingButtonV1;
