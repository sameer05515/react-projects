import React, { useMemo } from "react";

export const LoaderStates = {
  spinner: "spinner",
  error: "error",
  warning: "warning",
  success: "success",
};

const defaultMessages = {
  [LoaderStates.spinner]: "Loading...",
  [LoaderStates.error]: "Error occurred!",
  [LoaderStates.warning]: "Warning!",
  [LoaderStates.success]: "Success!",
};

/**
 * Validates the given state and falls back to "spinner" if invalid.
 * @param {string} state - The current state of the loader.
 * @returns {string} - A valid state value.
 */
const getValidState = (state) =>
  typeof state === "string" && Object.values(LoaderStates).includes(state)
    ? state
    : LoaderStates.spinner;

/**
 * Derives CSS class and display title from the given state and title.
 * @param {string} state - The current state of the loader.
 * @param {string} title - Custom title.
 * @returns {{stateClass: string, displayTitle: string}} - Object containing CSS class and display title.
 */
const getClassAndTitleFromGivenState = (state, title) => {
  const validState = getValidState(state);
  return {
    stateClass: validState,
    displayTitle: title || defaultMessages[validState],
  };
};

const LoaderWithTitle = ({
  title, // Custom title
  state = LoaderStates.spinner, // Default state is "spinner"
}) => {
  // Memoize derived values to avoid recalculations on every render
  const { stateClass, displayTitle } = useMemo(
    () => getClassAndTitleFromGivenState(state, title),
    [state, title]
  );

  const spinnerColor =
    stateClass === LoaderStates.error
      ? "text-red-500"
      : stateClass === LoaderStates.warning
      ? "text-yellow-500"
      : stateClass === LoaderStates.success
      ? "text-green-500"
      : "text-blue-500";

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <svg
        className={`h-10 w-10 animate-spin ${spinnerColor}`}
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
      <div className="mt-4 text-base text-gray-800">{displayTitle}</div>
    </div>
  );
};

export default LoaderWithTitle;
