// Default messages for API requests
const defaultMessages = {
  loadingMessage: "Loading, please wait...",
  successMessage: "Operation completed successfully!",
  failureMessage: "Operation failed. Please try again.",
  unexpectedErrorMessage: "An unexpected error occurred. Please contact support.",
};

// Utility: Prepare message or fallback to default
const prepareMessage = (message, defaultMessage) =>
  typeof message === "string" && message.trim() ? message : defaultMessage;

// Utility: Prepare error message from various input types
const prepareErrorMessage = (error, defaultMessage = "Something unexpected occurred!") => {
  if (!error) return defaultMessage;
  if (typeof error === "string" && error.trim()) return error;
  if (error.message && typeof error.message === "string" && error.message.trim()) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return defaultMessage;
  }
};

export { defaultMessages, prepareMessage, prepareErrorMessage };
