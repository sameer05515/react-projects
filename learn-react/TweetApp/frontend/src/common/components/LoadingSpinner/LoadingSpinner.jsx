import React from 'react';
import './LoadingSpinner.css';

/**
 * Reusable loading spinner component for Suspense fallbacks
 * and general loading states throughout the application
 */
const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeClass = `spinner-${size}`;
  const containerClass = fullScreen ? 'loading-spinner-fullscreen' : 'loading-spinner-container';

  return (
    <div className={containerClass}>
      <div className={`spinner-border ${sizeClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

