import React, { useMemo, useState } from "react";
import Select from "react-select";
import {
  componentOptions,
  getComponentDetails,
  getNextNthOption,
  styles
} from "./misc-component-constants";
import ButtonGroup from "../../../common/components/button/ButtonGroup";
import ToggleablePanel from "../../../common/components/ToggleablePanel";

// Reusable SelectInput Component
const SelectInput = ({ options, onChange, placeholder, defaultValue }) => (
  <Select
    options={options}
    onChange={onChange}
    styles={{
      container: (base) => ({ ...base, ...styles.select }),
      placeholder: (base) => ({
        ...base,
        color: "#888",
        fontStyle: "italic",
      }),
    }}
    placeholder={placeholder}
    defaultValue={defaultValue}
  />
);

const MiscellaneousExamples = () => {
  const [selectedComponent, setSelectedComponent] = useState("SPPTableV1_0_0");

  const handleChange = (selectedOption) => {
    setSelectedComponent(selectedOption ? selectedOption.value : null);
  };

  // const DisplayComponent = useMemo(() => {
  //   return componentMap[selectedComponent] || null;
  // }, [selectedComponent]);

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
                (prev) => getNextNthOption(prev || "", -1)?.value || null
              );
            },
          },
        ]}
      />
      <h4><b>Selected Component</b>: {componentLabel}</h4>
      <div style={{ padding: "5px", gap: "5px" }}>
        <SelectInput
          options={componentOptions}
          onChange={handleChange}
          placeholder="Select a component"
          value={componentOptions.find(opt => opt.value === selectedComponent)}
        />
      </div>
      <ToggleablePanel title="Details" showContent={true}>
        <>
          {selectedComponent && (
            <div>
              Module:
              <b >
                {moduleName ? moduleName : "Missing Module name"}
              </b>
              <br />
              Experimental Component: {expCAPLI ? "Yes " : "No "} <br />
              <b >
                {majorRelease ? "Major Release" : "Minor Release"}
              </b>
              <br />
              <pre style={{whiteSpace:'pre-wrap'}}>
                {displayLabel ||
                  `Display label missing for selected component: ${selectedComponent}`}
              </pre>
            </div>
          )}
        </>
      </ToggleablePanel>
      <div style={{ padding: "5px", gap: "5px" }}>
        {DisplayComponent && <DisplayComponent />}
      </div>
    </>
  );
};

export default MiscellaneousExamples;
