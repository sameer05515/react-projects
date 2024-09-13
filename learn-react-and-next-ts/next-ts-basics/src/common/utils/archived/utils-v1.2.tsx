import styles from "../styles/combined-v5.module.css";

// Helper function to convert kebab-case to camelCase
const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
};

const getCamelCasedStyles = () => {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    const camelCasedKey = toCamelCase(key);
    acc[camelCasedKey] = value;
    return acc;
  }, {} as Record<string, string>);  // The accumulator is an object of key-value pairs
};

const GLOBAL_APPLICATION_STYLES = getCamelCasedStyles();

console.log("CamelCased Styles =>", GLOBAL_APPLICATION_STYLES);

export { GLOBAL_APPLICATION_STYLES as GLOBAL_APPLICATION_STYLES_UTILS_1_2 };
