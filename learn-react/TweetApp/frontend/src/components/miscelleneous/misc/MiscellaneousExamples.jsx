import React, { useMemo, useState } from 'react';
import Select from "react-select";
import {
  componentMap,
  componentOptions,
  styles,
} from "./misc-component-constants";

// Reusable SelectInput Component
const SelectInput = ({ options, onChange, placeholder }) => (
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
  />
);

const MiscellaneousExamples = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedComponent(selectedOption ? selectedOption.value : null);
  };

  const DisplayComponent = useMemo(() => {
    return componentMap[selectedComponent] || null;
  }, [selectedComponent]);

  return (
    <div style={{ padding: "5px", gap: "5px" }}>
      <SelectInput
        options={componentOptions}
        onChange={handleChange}
        placeholder="Select a component"
      />
      <div style={{ padding: "5px", gap: "5px" }}>
        {DisplayComponent && <DisplayComponent />}
      </div>
    </div>
  );
}

export default MiscellaneousExamples;
