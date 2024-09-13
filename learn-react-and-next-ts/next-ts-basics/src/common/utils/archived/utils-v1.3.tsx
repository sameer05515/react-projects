import styles from "../styles/combined-v5.module.css";

// Helper function to convert kebab-case to camelCase
const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
};

// Dynamically convert the styles object keys to camelCase and return the modified object
const getCamelCasedStyles = () => {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    const camelCasedKey = toCamelCase(key);
    acc[camelCasedKey] = value;
    return acc;
  }, {} as Record<string, string>);
};

const getCamelCasedStylesKeys = () => {
    return Object.entries(styles).reduce((acc, [key, value]) => {
      const camelCasedKey = toCamelCase(key);
      acc[camelCasedKey] = key;
      return acc;
    }, {} as Record<string, string>);
  };

// Infer type dynamically based on camelCase keys
const GLOBAL_APPLICATION_STYLES = getCamelCasedStyles();
const GLOBAL_APPLICATION_STYLES_Keys = getCamelCasedStylesKeys();

// Create a type based on the keys of the camel-cased styles object
type GlobalApplicationStylesType = typeof GLOBAL_APPLICATION_STYLES;

// Example usage: TypeScript will infer the keys as camelCase
const getStyleClass = (key: keyof GlobalApplicationStylesType): string => {
  return GLOBAL_APPLICATION_STYLES[key];
};

// Log for demonstration
console.log("CamelCased Styles =>", GLOBAL_APPLICATION_STYLES);
console.log("GLOBAL_APPLICATION_STYLES_Keys Styles =>", JSON.stringify(GLOBAL_APPLICATION_STYLES_Keys));

export {
  GLOBAL_APPLICATION_STYLES as GLOBAL_APPLICATION_STYLES_UTILS_1_3,
  GLOBAL_APPLICATION_STYLES_Keys,
  getStyleClass,
  type GlobalApplicationStylesType,
};
