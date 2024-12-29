// Utility to prepare error messages
const prepareErrorMessage = (error, defaultMessage) => {
  if (!error) return defaultMessage;
  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  } else if (
    typeof error === "object" &&
    error.message &&
    typeof error.message === "string" &&
    error.message.trim().length > 0
  ) {
    return error.message;
  } else {
    try {
      return JSON.stringify(error);
    } catch {
      return defaultMessage;
    }
  }
};

export default prepareErrorMessage;
