import React from "react";
import { VALID_INVALID_SEGGREGATION, Separator } from "./utils";

const StrategyTestingDashboard = () => {
  const withMapApproachForSanitizedRender =
    VALID_INVALID_SEGGREGATION.withDefaultStrategy;
  const withForEachApproach = VALID_INVALID_SEGGREGATION.withReturnNullStrategy;
  const withReduceApproach =
    VALID_INVALID_SEGGREGATION.withReturnUndefinedStrategy;

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
  apprachData = { validComponents: [], invalidNames: { count: 0, names: [] } },
  title = "",
}) => {
  const {
    validComponents,
    invalidNames: { count, names },
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

export default StrategyTestingDashboard;
