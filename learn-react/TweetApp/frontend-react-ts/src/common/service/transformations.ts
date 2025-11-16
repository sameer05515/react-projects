export const toJsonString = (json = {}, pretty = false) => {
  try {
    return json ? JSON.stringify(json, null, pretty ? 2 : 0) : null;
  } catch (error) {
    console.error("Failed to convert to JSON string:", error.message);
    return null; // Or handle the fallback based on your needs
  }
};
