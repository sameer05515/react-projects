import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { selectIsBackdropActive } from "../../../redux/slices/backdropSlice";

const FallbackDuration = 10000; // Fallback duration in ms

/**
 * Note: This component {`CustomBackdropV2`} is currently being used in production
 * 
 * Please do not modify code of this component.
 * 
 * All enhancement and bug-fixes are being taken care in [v3.jsx](./v3.jsx)
 * 
*/

/**
 * ## CustomBackdropV2 Component Documentation
 *
 * ### Overview:
 * `CustomBackdropV2` is a critical component actively utilized in production environments.
 * It is designed to provide a consistent and reliable backdrop experience across various 
 * parts of the application. This component ensures stability and optimal performance 
 * in high-traffic usage scenarios.
 *
 * ### **Important Guidelines:**
 * - **Do Not Modify:** Direct modifications to this component's code are strictly discouraged.
 *   Any changes might inadvertently introduce bugs or disrupt the user experience in production.
 * - **Enhancements and Bug Fixes:** All improvements, optimizations, and bug resolutions 
 *   are managed in the upgraded version of this component, located in the file 
 *   [`v3.jsx`](./v3.jsx). Developers should direct their efforts to this version for any 
 *   future enhancements or fixes.
 *
 * ### **Why This Approach?**
 * Maintaining a stable version (`CustomBackdropV2`) for production use minimizes 
 * the risk of unexpected regressions or downtime. At the same time, developing 
 * improvements in [`v3.jsx`](./v3.jsx) allows for thorough testing and validation 
 * before deployment.
 *
 * ### **How to Proceed for Enhancements?**
 * 1. Review the code in `CustomBackdropV2` to understand its behavior and dependencies.
 * 2. Implement your changes in the `v3.jsx` file.
 * 3. Perform comprehensive testing in staging or development environments.
 * 4. Coordinate with the QA team to validate changes before releasing them to production.
 *
 * ### Note to Developers:
 * - This separation of concerns ensures the production environment remains unaffected 
 *   during development cycles.
 * - If you find any critical issues that need immediate attention in `CustomBackdropV2`, 
 *   escalate the matter to the team lead or manager for further assessment.
 */


const CustomBackdropV2 = () => {
  const isActive = useSelector(selectIsBackdropActive);

  useEffect(() => {
    let timer;

    if (isActive) {
      // Set a fallback timer to auto-hide the backdrop after 10 seconds
      timer = setTimeout(() => {
        console.warn("Fallback: Backdrop should auto-hide here if active");
      }, FallbackDuration);
    }

    return () => {
      if (!timer) return;
    //   console.log("duniya walon ram ram: " + timer);
      clearTimeout(timer);
    };
  }, [isActive]);

  if (!isActive) return null;

  return <div className={styles.backdrop}></div>;
};

export default CustomBackdropV2;
