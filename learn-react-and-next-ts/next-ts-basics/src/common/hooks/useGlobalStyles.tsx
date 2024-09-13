import rawStyles from "../styles/combined-v5.module.css";

export type GlobalStyleProps = {
  "component-selection-section": string;
  "custom-select": string;
  "nav-button": string;
  main: string;
  // header: string;
  // img: string;
  // ul: string;
  // label: string;
  // input: string;
  // button: string;
  // form: string;
  infobox: string;
  "infobox-hint": string;
  "infobox-display-label": string;
  "infobox-warning": string;
  "warning--low": string;
  "warning--medium": string;
  "warning--high": string;
  //"add-timer": string;
  //"blog-posts": string;
  //"loading-fallback": string;
  //error: string;
  // select: string;
  "post-item-card": string;
  "post-item-card-author": string;
  "post-item-card-body": string;
  "post-list-container": string;
  "post-module-form": string;
  "post-module-form-actions": string;
  backdrop: string;
  modal: string;
  modalCloseButton: string;
  "main-header": string;
  "main-header-logo": string;
  "main-header-button": string;
  testComponentV2: string;
  "projectDashboard-CompanyCard": string;
  "projectDashboard-CompanyCard-CompanyTitle": string;
  "projectDashboard-CompanyCard-CompanyDetails": string;
  "projectDashboard-CompanyCard-aboutCompany": string;
  "projectDashboard-CompanyCard-companyWebsite": string;
};

// Function to assert that the rawStyles object matches the GlobalStyleProps type
const getStyles = (): GlobalStyleProps => {
  const requiredFields: Array<keyof GlobalStyleProps> = [
    "component-selection-section",
    "nav-button",
    "custom-select",
    "main",
    // "header",
    // "img",
    // "ul",
    // "label",
    // "input",
    // "button",
    // "form",
    "infobox",
    "infobox-hint",
    "infobox-display-label",
    "infobox-warning",
    "warning--low",
    "warning--medium",
    "warning--high",
    // "add-timer",
    // "blog-posts",
    // "loading-fallback",
    // "error",

    // "select",
    // "info-box",
    // "info-box-detail",
    "post-item-card",
    "post-item-card-author",
    "post-item-card-body",
    "post-list-container",
    "post-module-form",
    "post-module-form-actions",
    "backdrop",
    "modal",
    "modalCloseButton",
    "main-header",
    "main-header-logo",
    "main-header-button",
    "testComponentV2",

    "projectDashboard-CompanyCard",
    "projectDashboard-CompanyCard-CompanyTitle",
    "projectDashboard-CompanyCard-CompanyDetails",
    "projectDashboard-CompanyCard-aboutCompany",
    "projectDashboard-CompanyCard-companyWebsite",
  ];

  // Check if all required fields exist in rawStyles
  const missingFields = requiredFields.filter((field) => !(field in rawStyles));

  if (missingFields.length > 0) {
    throw new Error(`Missing fields in rawStyles: ${missingFields.join(", ")}`);
  }

  return rawStyles as GlobalStyleProps;
};

// Hook to return the global styles and the raw styles
export const useGlobalStyles = () => {
  const GLOBAL_APPLICATION_STYLES = getStyles();
  return {
    GLOBAL_APPLICATION_STYLES,
    rawStyles,
  };
};
