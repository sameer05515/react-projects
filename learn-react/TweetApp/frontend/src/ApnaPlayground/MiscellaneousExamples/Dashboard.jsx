import React, { useMemo, useState } from "react";
import Select from "react-select";
import {
  componentOptions,
  getComponentDetails,
  getNextNthOption,
} from "./utils";
import ButtonGroup from "../../common/components/button-group/ButtonGroup";
import ToggleablePanel from "../../common/components/toggleable-panel/ToggleablePanel";

// styles.js - Extracted styles
export const customStyles = {
  select: {
    container: (base) => ({
      ...base,
      border: "1px solid #ddd",
      borderRadius: "4px",
      padding: "5px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#888",
      fontStyle: "italic",
    }),
  },
  buttonContainer: {
    padding: "5px",
    gap: "5px",
  },
  componentInfo: {
    padding: "5px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
  },
};

const SelectInput = ({ options, onChange, placeholder, value }) => (
  <Select
    options={options}
    onChange={onChange}
    styles={customStyles.select}
    placeholder={placeholder}
    value={value}
  />
);

const MiscellaneousExamples = () => {
  const [selectedComponent, setSelectedComponent] = useState(
    "SamplePromiseTesterDashboard"
  );

  const handleChange = (selectedOption) => {
    setSelectedComponent(selectedOption ? selectedOption.value : null);
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
    return {
      DisplayComponent: comp?.element || null,
      displayLabel: comp?.purpose || "",
      majorRelease: comp?.majorRelease || false,
      moduleName: comp?.module || null,
      expCAPLI: comp?.experimentalComponentAsPerLearningImplementation || false,
      componentLabel: comp?.componentLabel || "",
    };
  }, [selectedComponent]);

  return (
    <>
      <ButtonGroup
        options={[
          {
            id: 1,
            children: "<<",
            title: "Previous",
            onClick: () => {
              setSelectedComponent(
                (prev) => getNextNthOption(prev || "", -1)?.value || null
              );
            },
          },
          {
            id: 2,
            children: ">>",
            title: "Next",
            onClick: () => {
              setSelectedComponent(
                (prev) => getNextNthOption(prev || "", 1)?.value || null
              );
            },
          },
        ]}
      />

      <div>
        <b>Selected Component</b>: {componentLabel}
      </div>

      <div style={customStyles.buttonContainer}>
        <SelectInput
          options={componentOptions}
          onChange={handleChange}
          placeholder="Select a component"
          value={componentOptions.find(
            (opt) => opt.value === selectedComponent
          )}
        />
      </div>

      <ToggleablePanel title="Details" showContent={false}>
        {selectedComponent && (
          <div style={customStyles.componentInfo}>
            Module: <b>{moduleName || "Missing Module name"}</b>
            <br />
            Experimental Component: {expCAPLI ? "Yes " : "No "} <br />
            <b>{majorRelease ? "Major Release" : "Minor Release"}</b>
            <br />
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {displayLabel ||
                `Display label missing for selected component: ${selectedComponent}`}
            </pre>
          </div>
        )}
      </ToggleablePanel>

      {DisplayComponent && <DisplayComponent />}
    </>
  );
};

export default MiscellaneousExamples;
