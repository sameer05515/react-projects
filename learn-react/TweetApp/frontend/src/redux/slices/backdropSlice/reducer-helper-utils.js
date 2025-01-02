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

  // Trim and truncate the string if it exceeds max length
  const trimmedValue = newValue.trim();
  let calcMaxLength = getMaxInteger(0, maxLength);
  return calcMaxLength && trimmedValue.length > calcMaxLength
    ? trimmedValue.substring(0, calcMaxLength)
    : trimmedValue;
};
