export const hasDuplicateKeys = (obj: Object) => {
  const seenKeys = new Set();
  const conflictedFields = [];
  const messages = [];

  for (const key in obj) {
    if (seenKeys.has(key)) {
      conflictedFields.push(key);
      messages.push(`Duplicate key found: ${key}`);
    }
    seenKeys.add(key);
  }

  return {
    isError: conflictedFields.length > 0,
    conflictedFields,
    messages,
  };
};

export const camelCaseToTitleCase = (str: string) => {
  if (!str) return "";
  return (
    str
      // Add a space before each uppercase letter
      .replace(/([A-Z])/g, " $1")
      // Capitalize the first letter of each word
      .replace(/^./, (firstLetter) => firstLetter.toUpperCase())
      .trim()
  );
};

export const isNonEmptyArray = (input: unknown) => {
  return input && Array.isArray(input) && input.length > 0;
};
