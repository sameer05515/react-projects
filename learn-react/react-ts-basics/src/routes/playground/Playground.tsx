import { useState, useMemo, ChangeEvent } from "react";
import {
  componentOptions,
  getComponentDetails,
  getNextNthOption,
  labelStyle,
} from "./playground-component-constants";
import classes from './combined-v4.module.css';
// import '../../../combined-v4.css';

function Playground() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  // Handle dropdown change
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.target.value || null);
  };

  const { DisplayComponent, displayLabel, majorRelease, moduleName, expCAPLI } =
    useMemo(() => {
      const comp = getComponentDetails(selectedComponent || "");
      const DisplayComponent = comp?.element || null;
      const displayLabel = comp?.purpose || "";
      const majorRelease = comp?.majorRelease || false;
      const moduleName = comp?.module || null;
      const expCAPLI =
        comp?.experimentalComponentAsPerLearningImplementation || false;

      return {
        DisplayComponent,
        displayLabel,
        majorRelease,
        moduleName,
        expCAPLI,
      };
    }, [selectedComponent]);

  return (
    <div className={classes.playgroundContainer}>
      <label htmlFor="outputType" style={labelStyle}>
        Select a component:
      </label>
      <select value={selectedComponent || ""} onChange={handleChange}>
        <option value="" disabled>
          Select a component
        </option>
        {componentOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label.replace(/_/g, " ")}
          </option>
        ))}
      </select>
      {selectedComponent && (
        <span style={{ padding: "10px", fontWeight: "bolder" }}>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            title="Previous Component"
            onClick={() => {
              setSelectedComponent(
                (prev) => getNextNthOption(prev || "", -1)?.value || null
              );
            }}
          >
            {"<<"}
          </span>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            title="Next Component"
            onClick={() => {
              setSelectedComponent(
                (prev) => getNextNthOption(prev || "", 1)?.value || null
              );
            }}
          >
            {">>"}
          </span>
        </span>
      )}
      {selectedComponent && (
        <div style={{ whiteSpace: "pre-wrap" }}>
          Module:{" "}
          <b
            style={{
              paddingRight: "15px",
              fontSize: "15px",
              textTransform: "uppercase",
            }}
          >
            {moduleName ? moduleName : "Missing Module name"}
          </b> <br />
          Experimental Component: {expCAPLI ? "Yes " : "No "} <br />
          <b
            style={{
              paddingRight: "10px",
              fontSize: "15px",
              textTransform: "uppercase",
            }}
          >
            {majorRelease ? "Major Release" : "Minor Release"}
          </b> <br />
          {displayLabel ||
            `Display label missing for selected component: ${selectedComponent}`}
        </div>
      )}

      {/* Render the selected component */}
      {DisplayComponent && <DisplayComponent />}
    </div>
  );
}

export default Playground;
