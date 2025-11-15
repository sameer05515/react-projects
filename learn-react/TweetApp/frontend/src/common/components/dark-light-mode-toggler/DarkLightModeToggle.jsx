import React, { useState } from "react";

const DarkLightModeToggle = ({ children, className = "" }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      } ${className}`}
    >
      <div className="flex items-center justify-end gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <span className="text-sm font-medium">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        <button
          type="button"
          onClick={toggleMode}
          className={`relative flex h-6 w-12 items-center rounded-full transition ${
            isDarkMode ? "bg-gray-600" : "bg-gray-300"
          }`}
          aria-label="Toggle theme"
        >
          <span
            className={`absolute left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
};

export default DarkLightModeToggle;
