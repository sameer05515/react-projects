import React from "react";
import { VALID_INVALID_SEGGREGATION } from "./utils";
import styles from "./styles.module.css";

const StrategyTestingDashboard = () => {
  const {
    defaultStrategy: withMapApproachForSanitizedRender,
    returnNullStrategy: withForEachApproach,
    returnUndefinedStrategy: withReduceApproach,
  } = VALID_INVALID_SEGGREGATION;

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.header}>Strategy Testing Dashboard</h1>

      <StrategyOutputDisplay
        title="With Default Strategy"
        approachData={withMapApproachForSanitizedRender}
      />
      <Separator />
      <StrategyOutputDisplay
        title="With Return Null Strategy"
        approachData={withForEachApproach}
      />
      <Separator />
      <StrategyOutputDisplay
        title="With Return Undefined Strategy"
        approachData={withReduceApproach}
      />
    </div>
  );
};

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
            Total invalid names: {count} : [{names.map((n) => n)}]
          </p>
        )}
      </div>
    </div>
  );
};

const Separator = () => <div className={styles.separator} />;

export default StrategyTestingDashboard;
