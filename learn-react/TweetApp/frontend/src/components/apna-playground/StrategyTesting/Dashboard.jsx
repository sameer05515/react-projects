import React from "react";
import { VALID_INVALID_SEGGREGATION } from "./utils";

const StrategyTestingDashboard = () => {
  const withMapApproachForSanitizedRender =
    VALID_INVALID_SEGGREGATION.defaultStrategy;
  const withForEachApproach = VALID_INVALID_SEGGREGATION.returnNullStrategy;
  const withReduceApproach = VALID_INVALID_SEGGREGATION.returnUndefinedStrategy;

  return (
    <div>
      <h1>StrategyTestingDashboard</h1>

      <StrategyOutputDisplay
        title="With Default Strategy"
        apprachData={withMapApproachForSanitizedRender}
      />
      {Separator}
      <StrategyOutputDisplay
        title="With Return Null strategy"
        apprachData={withForEachApproach}
      />
      {Separator}
      <StrategyOutputDisplay
        title="With Return Undefined strategy"
        apprachData={withReduceApproach}
      />
      {Separator}
    </div>
  );
};

const StrategyOutputDisplay = ({
  apprachData = {
    validComponents: [],
    invalidComponents: { count: 0, names: [] },
  },
  title = "",
}) => {
  const {
    validComponents,
    invalidComponents: { count, names },
  } = apprachData;
  return (
    <div>
      <h2>{title}</h2>
      <div>
        {validComponents}
        {count > 0 && (
          <p style={error}>
            Total invalid names: {count} : [{names.map((n) => n)}]
          </p>
        )}
      </div>
    </div>
  );
};

const error = { color: "red" };

// Separator for visual distinction
export const Separator = (
  <div style={{ margin: "20px 0", borderTop: "2px solid black" }} />
);

export default StrategyTestingDashboard;
