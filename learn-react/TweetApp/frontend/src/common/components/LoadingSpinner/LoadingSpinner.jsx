import React from 'react';

/**
 * Reusable loading spinner component for Suspense fallbacks
 * and general loading states throughout the application
 */
const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeMap = {
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };
  const dim = sizeMap[size] || sizeMap.medium;

  return (
    <div className={fullScreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/60' : 'flex items-center justify-center'}>
      <svg
        className={`${dim} animate-spin text-blue-600`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label="Loading"
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
    </div>
  );
};

export default LoadingSpinner;

