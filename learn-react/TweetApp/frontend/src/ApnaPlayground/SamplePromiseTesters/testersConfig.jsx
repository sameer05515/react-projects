import { memo } from "react";
import UsingCustomBackdropV3 from "./testers/UsingCustomBackdropV3";
import UsingEarlierVersionsOfBackdrops from "./testers/UsingEarlierVersionsOfBackdrops";
import { FallbackStrategies } from "../../common/best-practices/FallbackStrategies";

// Default fallback component
const DefaultTesterComponent = memo(({ invalidName }) => (
  <div>
    <h2>Component Not Found</h2>
    <p>
      The tester component with the name <strong>{invalidName}</strong> could
      not be located.
    </p>
  </div>
));


const actAccordingToStrategy = (strategy, invalidName) => {
  if (!strategy) return DefaultTesterComponent;

  switch (strategy) {
    case FallbackStrategies.RETURN_DEFAULT_COMPONENT:
      return DefaultTesterComponent;

    case FallbackStrategies.RETURN_NULL:
      return null;

    case FallbackStrategies.RETURN_UNDEFINED:
      return undefined;

    default:
      console.warn(
        `Unknown strategy: ${strategy}. Falling back to default component.`
      );
      return DefaultTesterComponent;
  }
};

const Testers = {
  UsingCustomBackdropV3,
  UsingEarlierVersionsOfBackdrops,
};

export const testerNames = Object.keys(Testers).map((keyName, idx) => ({
  id: `tester_no_${idx + 1}`,
  name: keyName,
}));

// Return default fallback component when name is not found
export const getTesterComponent = (
  name = "",
  strategy = FallbackStrategies.RETURN_DEFAULT_COMPONENT
) => Testers[name] || actAccordingToStrategy(strategy);
