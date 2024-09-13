import styles from "../styles/combined-v5.module.css";

// Dynamically infer the type from the imported styles
type GlobalStyleProps = typeof styles;

const getStyles = () => {
  console.log("styles=> ", JSON.stringify(styles, null, 2));
  return styles as GlobalStyleProps; // Type inference based on CSS module
};

const GLOBAL_APPLICATION_STYLES = getStyles();

export {
  GLOBAL_APPLICATION_STYLES as GLOBAL_APPLICATION_STYLES_UTILS_1_1,
  type GlobalStyleProps,
};
