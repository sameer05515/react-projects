import React from "react";
import styles from "./styles.module.css";

const StrategyOutputDisplay = ({
  approachData = {
    validComponents: [],
    invalidComponents: { count: 0, names: [] },
  },
  title = "",
}) => {
  const { validComponents, invalidComponents } = approachData;
  const { count, names } = invalidComponents;

  return (
    <div className={styles.strategyContainer}>
      <h2 className={styles.subHeader}>{title}</h2>
      <div className={styles.outputContainer}>
        {validComponents}
        {count > 0 && (
          <p className={styles.errorText}>
            Total invalid names: {count} : [{names.join(", ")}]
          </p>
        )}
      </div>
    </div>
  );
};

export default StrategyOutputDisplay;
