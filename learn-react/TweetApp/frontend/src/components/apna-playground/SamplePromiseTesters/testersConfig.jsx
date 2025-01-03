import UsingCustomBackdropV3 from "./testers/UsingCustomBackdropV3";
import UsingEarlierVersionsOfBackdrops from "./testers/UsingEarlierVersionsOfBackdrops";

// Default fallback component
const DefaultTesterComponent = () => (
  <div>
    <h2>Component Not Found</h2>
    <p>The requested tester component could not be located.</p>
  </div>
);

const Testers = {
  UsingCustomBackdropV3,
  UsingEarlierVersionsOfBackdrops,
};

export const testerNames = Object.keys(Testers).map((keyName, idx) => ({
  id: `tester_no_${idx + 1}`,
  name: keyName,
}));

// Return default fallback component when name is not found
export const getTesterComponent = (name = "") =>
  Testers[name] || DefaultTesterComponent;
