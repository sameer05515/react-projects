export const toJsonString = (json = {}, pretty = false) => {
  try {
    return json ? JSON.stringify(json, null, pretty ? 2 : 0) : null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to convert to JSON string:", errorMessage);
    return null; // Or handle the fallback based on your needs
  }
};
