export const transformString = (input: string): string => {
  // Step 1: Replace '_' with ' '
  const replaced = input.replace(/_/g, " ");

  // Step 2: Tokenize by ' ' and capitalize each word
  const capitalized = replaced
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Step 3: Return the transformed string
  return capitalized;
};
