// Theme Toggle Component
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, selectIsDarkMode } from "../../../redux/slices/themeSlice";
import CustomButton from "../custom-button/CustomButton";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: "icon" | "button" | "text";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  showLabel = true,
  variant = "button",
}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  // Icon variant - just shows icon
  if (variant === "icon") {
    return (
      <button
        onClick={handleToggle}
        className={`p-2 rounded-lg transition-colors duration-200 ${className} ${
          isDarkMode
            ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          // Sun icon for dark mode (to switch to light)
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          // Moon icon for light mode (to switch to dark)
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    );
  }

  // Text variant - just shows text
  if (variant === "text") {
    return (
      <button
        onClick={handleToggle}
        className={`px-3 py-1 rounded-lg transition-colors duration-200 text-sm font-medium ${className} ${
          isDarkMode
            ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    );
  }

  // Button variant - shows button with icon and optional label (default)
  return (
    <CustomButton
      onClick={handleToggle}
      variant={isDarkMode ? "warning" : "secondary"}
      className={className}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          {showLabel && "Light Mode"}
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          {showLabel && "Dark Mode"}
        </>
      )}
    </CustomButton>
  );
};

export default ThemeToggle;

