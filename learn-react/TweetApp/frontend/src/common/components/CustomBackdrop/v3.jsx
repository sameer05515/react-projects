import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { selectIsCustomBackdropV3Active } from "../../../redux/slices/backdropSlice";

// const FallbackDuration = 10000; // Fallback duration in ms

/**
 * This component `CustomBackdropV3` is currently in testing phase
 *
 * All enhancements and bug-fixes related to [v2.jsx](./v2.jsx) will be done here.
 *
 * - Note: For now fallback logic for auto-closing backdrop is removed here, so that developers can add their best creativity. Later we will optimize the component, post adaquate groomed and functionality and design approved by business.
 *
 */



const CustomBackdropV3 = () => {
  const isActive = useSelector(selectIsCustomBackdropV3Active);

  if (!isActive) return null;

  return <div className={styles.backdrop}></div>;
};

export default CustomBackdropV3;
