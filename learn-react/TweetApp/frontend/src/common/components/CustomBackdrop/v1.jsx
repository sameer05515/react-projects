import React, { useMemo } from "react";
import styles from "./styles.module.css";

const CustomBackdropV1 = ({ shouldActive = "no" }) => {
  const isVisible = useMemo(() => {
    return shouldActive === "yes";
  }, [shouldActive]);

  if (!isVisible) return null;

  return <div className={styles.backdrop}></div>;
};

export default CustomBackdropV1;
