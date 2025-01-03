import UsingCustomBackdropV3 from "./testers/UsingCustomBackdropV3";
import UsingEarlierVersionsOfBackdrops from "./testers/UsingEarlierVersionsOfBackdrops";

const Testers = {
  UsingCustomBackdropV3,
  UsingEarlierVersionsOfBackdrops,
};

export const testerNames = Object.keys(Testers).map((keyName, idx) => ({
  id: `tester_no_${idx + 1}`,
  name: keyName,
}));

export const getTesterComponent = (name = "") => Testers[name] || null;
