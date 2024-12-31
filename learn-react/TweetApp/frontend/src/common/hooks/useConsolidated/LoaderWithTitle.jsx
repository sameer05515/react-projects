import React, { useMemo } from "react";
import styles from "./LoaderWithTitle.module.css";

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
    stateClass: styles[validState] || "", // Fallback to empty string if style is missing
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

  return (
    <div className={styles.loaderContainer}>
      <div className={stateClass}></div>
      <div className={styles.title}>{displayTitle}</div>
    </div>
  );
};

export default LoaderWithTitle;
