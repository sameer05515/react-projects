import initialState from "./initialState";

export const toJsonString = (json, pretty = false) => {
  if (!json) return null;
  if (!pretty) return JSON.stringify(json);
  return JSON.stringify(json, null, 2);
};

const customBackdropV3InitialState = initialState.customBackdrop.v3;

export const reset = (prev, payload) => {
  console.log(
    "prev: ",
    toJsonString(prev),
    "\n payload: ",
    toJsonString(payload),
    "\n customBackdropV3InitialState: ",
    toJsonString(customBackdropV3InitialState)
  );
  // return{
  //     ...prev,
  //     ...customBackdropV3InitialState,
  //     ...payload
  // }
  return prev;
};

export const safelyUpdateInteger = (existing = 0, newValue = 0) => {
  // Check if newValue is a valid integer
  if (!Number.isInteger(newValue)) {
    return existing; // Return existing if invalid
  }

  return newValue;
};

export const getMinInteger = (existing = 0, newValue = 0) => {
  // Validate that newValue is a valid integer
  if (!Number.isInteger(newValue)) {
    return existing; // Return existing if newValue is invalid
  }

  // Return the smaller of the two values
  return Math.min(existing, newValue);
};

export const getMaxInteger = (existing = 0, newValue = 0) => {
  // Validate that newValue is a valid integer
  if (!Number.isInteger(newValue)) {
    return existing; // Return existing if newValue is invalid
  }

  // Return the smaller of the two values
  return Math.min(existing, newValue);
};

export const safelyUpdateString = (
  existing = "",
  newValue = "",
  maxLength = 0
) => {
  // Check if newValue is a non-empty string
  if (typeof newValue !== "string" || !newValue.trim()) {
    return existing; // Return existing if invalid
  }

  return newValue;
};

const safelyTruncateString = (value = "", maxLength = 0) => {
  const sanitizedString = safelyUpdateString("", value);
  if (!sanitizedString) {
    return "";
  }

  // Trim and truncate the string if it exceeds max length
  const trimmedValue = value.trim();
  let calcMaxLength = getMaxInteger(0, maxLength);
  return calcMaxLength && trimmedValue.length > calcMaxLength
    ? trimmedValue.substring(0, calcMaxLength)
    : trimmedValue;
};

export const safelyUpdateObject = (existing = {}, newValue = {}) => {
  return newValue && typeof newValue === "object" && !Array.isArray(newValue)
    ? newValue
    : existing;
};

export const safelyUpdateArray = (existing = [], newValue = []) => {
  return Array.isArray(newValue) ? newValue : existing;
};

export const safelyUpdateNullable = (existing = null, newValue = null) => {
  return newValue === null || newValue === undefined ? existing : newValue;
};

export const safelyUpdateNumber = (existing = 0, newValue = 0) => {
  return typeof newValue === "number" && !isNaN(newValue) ? newValue : existing;
};

export const safelyUpdateBoolean = (existing = false, newValue = false) => {
  return typeof newValue === "boolean" ? newValue : existing;
};
