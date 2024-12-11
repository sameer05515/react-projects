// "use client";

import { useState, useMemo, ChangeEvent } from "react";
import {
  componentOptions,
  getComponentDetails,
  getNextNthOption,
} from "../../common/utils/app-component-constants";
import { useGlobalStyles } from "../../common/hooks/useGlobalStyles";
import ToggleablePanel from "../common/ToggleablePanel";

function PlaygroundBaseClientComponent() {
  const {
    GLOBAL_APPLICATION_STYLES: {
      "component-selection-section": componentSelectionSection,
      "custom-select": customSelect,
      // label,
      // select,
      "nav-button": navButton,
      infobox,
      "infobox-hint": infoBoxHint,
      "infobox-display-label": infoboxDisplayLabel,
    },
  } = useGlobalStyles();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  // Handle dropdown change
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.target.value || null);
  };

  const {
    DisplayComponent,
    displayLabel,
    majorRelease,
    moduleName,
    expCAPLI,
    componentLabel,
  } = useMemo(() => {
    const comp = getComponentDetails(selectedComponent || "");
    const DisplayComponent = comp?.element || null;
    const displayLabel = comp?.purpose || "";
    const majorRelease = comp?.majorRelease || false;
    const moduleName = comp?.module || null;
    const expCAPLI =
      comp?.experimentalComponentAsPerLearningImplementation || false;
    const componentLabel = comp?.componentLabel || "";

    return {
      DisplayComponent,
      displayLabel,
      majorRelease,
      moduleName,
      expCAPLI,
      componentLabel,
    };
  }, [selectedComponent]);

  return (
    <>
      <div className={componentSelectionSection}>
        <p>
          {selectedComponent && (
            <span
              className={navButton}
              title="Previous Component"
              onClick={() => {
                setSelectedComponent(
                  (prev) => getNextNthOption(prev || "", -1)?.value || null
                );
              }}
            >
              {"<<"}
            </span>
          )}
          {selectedComponent && (
            <span
              className={navButton}
              title="Next Component"
              onClick={() => {
                setSelectedComponent(
                  (prev) => getNextNthOption(prev || "", 1)?.value || null
                );
              }}
            >
              {">>"}
            </span>
          )}
        </p>
        <ToggleablePanel
          title={componentLabel || "No selection"}
          showContent={true}
        >
          <div style={{ marginBottom: "10px" }}>
            <p>
              Selected Component: <b>{componentLabel || "No selection"}</b>
            </p>

            <div>
              <label htmlFor="outputType">Select a component:</label>
              <select
                className={customSelect}
                value={selectedComponent || ""}
                onChange={handleChange}
                title={componentLabel}
              >
                <option value="" disabled>
                  Select a component
                </option>
                {componentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ToggleablePanel title="Details" showContent={true}>
            <>
              {selectedComponent && (
                <div className={infobox}>
                  Module:{" "}
                  <b className={infoBoxHint}>
                    {moduleName ? moduleName : "Missing Module name"}
                  </b>{" "}
                  <br />
                  Experimental Component: {expCAPLI ? "Yes " : "No "} <br />
                  <b className={infoBoxHint}>
                    {majorRelease ? "Major Release" : "Minor Release"}
                  </b>{" "}
                  <br />
                  <div className={infoboxDisplayLabel}>
                    {displayLabel ||
                      `Display label missing for selected component: ${selectedComponent}`}
                  </div>
                </div>
              )}
            </>
          </ToggleablePanel>
        </ToggleablePanel>
      </div>
      {/* Render the selected component */}
      {DisplayComponent && <DisplayComponent />}
    </>
  );
}

export default PlaygroundBaseClientComponent;
