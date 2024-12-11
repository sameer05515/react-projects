import rawStyles from "../styles/combined-v5.module.css";

// type GlobalStyleProps = {
//   "component-selection-section": string;
//   main: string;
//   label: string;
//   select: string;
//   "nav-button": string;

// };

type GlobalStyleProps = {
  "component-selection-section": string;
  main: string;
  header: string;
  img: string;
  ul: string;
  label: string;
  input: string;
  button: string;
  form: string;
  infobox: string;
  "infobox-hint": string;
  "infobox-warning": string;
  "warning--low": string;
  "warning--medium": string;
  "warning--high": string;
  "add-timer": string;
  "blog-posts": string;
  "loading-fallback": string;
  error: string;
  "nav-button": string;
  select: string;
  "info-box": string;
  "info-box-detail": string;
  posts: string;
};

const getStyles = () => {
  // console.log("styles=> ", JSON.stringify(styles, null, 2));
  // return Object.fromEntries(styles);
  const styles= rawStyles as GlobalStyleProps;

  return {styles};
};

const {styles} = getStyles();

export {rawStyles, styles as GLOBAL_APPLICATION_STYLES_UTILS_1_0 };
