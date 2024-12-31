import { memo } from "react";
import { FallbackStrategies } from "../../../common/best-practices/FallbackStrategies";

// List of available tester components
const Testers = {
  CompA: () => <div>Component A</div>,
  CompB: () => <div>Component B</div>,
};

const error = { color: "red" };

// Default fallback component
const DefaultComponent = memo(({ invalidName }) => (
  <div>
    <strong>Component Not Found: </strong>
    <span style={error}>
      The tester component with the name <strong>{invalidName}</strong> could
      not be located.
    </span>
  </div>
));

// Act according to the specified strategy
const actAccordingToStrategy = (strategy, invalidName) => {
  switch (strategy) {
    case FallbackStrategies.RETURN_DEFAULT_COMPONENT:
      return () => <DefaultComponent invalidName={invalidName} />;
    case FallbackStrategies.RETURN_NULL:
      return null;
    case FallbackStrategies.RETURN_UNDEFINED:
      return undefined;
    default:
      console.warn(
        `Unknown strategy: ${strategy}. Falling back to RETURN_DEFAULT_COMPONENT.`
      );
      return () => <DefaultComponent invalidName={invalidName} />;
  }
};



// Generate tester names
export const testerNames = Object.keys(Testers).map((keyName, idx) => ({
  id: `tester_no_${idx + 1}`,
  name: keyName,
}));

// Get tester component with fallback logic
export const getTesterComponent = (
  name = "",
  strategy = FallbackStrategies.RETURN_DEFAULT_COMPONENT
) => Testers[name] || actAccordingToStrategy(strategy, name);
