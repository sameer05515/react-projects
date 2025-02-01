import React from "react";
import { VALID_INVALID_SEGGREGATION } from "./helpers/utils";
import styles from "./helpers/styles.module.css";
import StrategyOutputDisplay from "./helpers/StrategyOutputDisplay";
import Separator from "../../common/components/Separator/v1";

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

export default StrategyTestingDashboard;
