import React from "react";
import styles from "./styles.module.css";
import useSPPNavigation from "../../hooks/useSPPNavigation";

const UnderConstruction = ({ title = "", showBackButton, showHomeButton }) => {
  const { goBack, goToHome } = useSPPNavigation();
  const handleGoBack = () => {
    // window.history.back();
    goBack();
  };

  const handleGoToHome = () => {
    // window.location.href = "/";
    goToHome();
  };

  return (
    <div className={styles.container}>
      {title && <h1>{title}</h1>}
      <h2 className={styles.message}>
        This view is currently under construction. Please contact your admin
        team for the expected date, when this will be resumed to be functional
        again.
      </h2>
      <div className={styles.buttonContainer}>
        {showBackButton && (
          <button className={styles.button} onClick={handleGoBack}>
            Go Back
          </button>
        )}
        {showHomeButton && (
          <button className={styles.button} onClick={handleGoToHome}>
            Go to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default UnderConstruction;
