import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

const FallbackDuration = 10000; // Fallback duration in ms

const CustomBackdropV2 = () => {
  const isActive = useSelector((state) => state.backdrop.active);

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
