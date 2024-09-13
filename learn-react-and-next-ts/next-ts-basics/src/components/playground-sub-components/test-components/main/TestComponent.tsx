import { useGlobalStyles } from '@/common/hooks/useGlobalStyles'; 
import React from "react";
// import styles from '../../common/combined-v5.module.css';
// import { GLOBAL_APPLICATION_STYLES as styles } from "@/common/utils/util";
// import { GLOBAL_APPLICATION_STYLES as styles } from "@/common/utils/utils-v1.0";

const TestComponent = () => {
  const {GLOBAL_APPLICATION_STYLES:styles, rawStyles}= useGlobalStyles();
  return (
    <div className={styles["main"]}>
      styles' props
      <pre>{JSON.stringify(styles, null, 2)}</pre>

      rawStyles
      <pre>{JSON.stringify(rawStyles, null, 2)}</pre>
    </div>
  );
};

export default TestComponent;
