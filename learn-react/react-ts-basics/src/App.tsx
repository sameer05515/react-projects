import { useState, useMemo, ChangeEvent } from "react";
import {
  componentOptions,
  getComponentDetails,
  labelStyle,
} from "./app-component-constants";

function App() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  // Handle dropdown change
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.target.value || null);
  };

  const { DisplayComponent, displayLabel, majorRelease } = useMemo(() => {
    const comp = getComponentDetails(selectedComponent || "");
    const displayLabel = comp?.purpose || "";
    const majorRelease = comp?.majorRelease || false;
    const DisplayComponent = comp?.element || null;

    return { DisplayComponent, displayLabel, majorRelease };
  }, [selectedComponent]);

  return (
    <>
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
        <label>
          <b
            style={{
              paddingRight: "10px",
              fontSize: "15px",
              textTransform: "uppercase",
            }}
          >
            {majorRelease ? "Major Release" : "Minor Release"}
          </b>
          {displayLabel ||
            `Display label missing for selected component: ${selectedComponent}`}
        </label>
      )}

      {/* Render the selected component */}
      {DisplayComponent && <DisplayComponent />}
    </>
  );
}

export default App;
