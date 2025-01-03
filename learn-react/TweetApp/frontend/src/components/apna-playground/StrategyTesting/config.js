import { memo } from "react";

export const FallbackStrategies = {
  RETURN_DEFAULT_COMPONENT: "RETURN_DEFAULT_COMPONENT",
  RETURN_NULL: "RETURN_NULL",
  RETURN_UNDEFINED: "RETURN_UNDEFINED",
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

const actAccordingToStrategy = (strategy, invalidName) => {
  if (!strategy) return () => <DefaultComponent invalidName={invalidName} />;

  switch (strategy) {
    case FallbackStrategies.RETURN_DEFAULT_COMPONENT:
      return () => <DefaultComponent invalidName={invalidName} />;

    case FallbackStrategies.RETURN_NULL:
      return null;

    case FallbackStrategies.RETURN_UNDEFINED:
      return undefined;

    default:
      console.warn(
        `Unknown strategy: ${strategy}. Falling back to default component.`
      );
      return DefaultComponent;
  }
};

const Testers = {
  CompA: () => <div>Component A</div>,
  CompB: () => <div>Component B</div>,
};

export const testerNames = Object.keys(Testers).map((keyName, idx) => ({
  id: `tester_no_${idx + 1}`,
  name: keyName,
}));

// Return default fallback component when name is not found
export const getTesterComponent = (
  name = "",
  strategy = FallbackStrategies.RETURN_DEFAULT_COMPONENT
) => Testers[name] || actAccordingToStrategy(strategy, name);
