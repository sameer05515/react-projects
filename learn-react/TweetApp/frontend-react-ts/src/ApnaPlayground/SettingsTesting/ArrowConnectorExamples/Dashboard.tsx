import React, { useLayoutEffect, useState } from "react";
import Select from "react-select";
import { ReactArcherApp1 } from "./react-archer-examples";

const ArrowConnector = ({ startId, endId }) => {
  const [arrowStyle, setArrowStyle] = useState({});

  useLayoutEffect(() => {
    const updateArrowPosition = () => {
      const startElement = document.getElementById(startId);
      const endElement = document.getElementById(endId);

      if (startElement && endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        const startX = startRect.right; // Start from the middle of the right edge
        const startY = startRect.top + startRect.height / 2;
        const endX = endRect.left; // End at the middle of the left edge
        const endY = endRect.top + endRect.height / 2;

        setArrowStyle({
          position: "absolute",
          left: `${startX}px`,
          top: `${startY}px`,
          width: `${Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)}px`,
          transform: `rotate(${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)
            }deg)`,
          transformOrigin: "0 0",
          borderTop: "2px solid black",
        });
      }
    };

    updateArrowPosition();
    window.addEventListener("resize", updateArrowPosition);

    return () => {
      window.removeEventListener("resize", updateArrowPosition);
    };
  }, [startId, endId]);

  return <div style={arrowStyle}></div>;
};

const ArrowConnectorExample = () => (
  <div className="relative flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-12 shadow">
    <div
      id="startDiv"
      className="flex h-24 w-24 items-center justify-center rounded-xl bg-red-500 text-white"
    >
      Start
    </div>
    <ArrowConnector startId="startDiv" endId="endDiv" />
    <div
      id="endDiv"
      className="flex h-24 w-24 items-center justify-center rounded-xl bg-blue-500 text-white"
    >
      End
    </div>
  </div>
);

const StyledBox = () => (
  <div className="relative flex h-24 w-24 items-center justify-center rounded-xl border border-gray-400 bg-gray-50">
    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-gray-700 p-[3px]" />
    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full bg-gray-700 p-[3px]" />
    <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-700 p-[3px]" />
    <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-700 p-[3px]" />
  </div>
);

const ArrowConnectorExampleWithStyledBox1 = () => (
  <div className="flex items-center justify-center gap-5">
    <StyledBox />
    <StyledBox />
  </div>
);

const ArrowConnectorExampleWithStyledBox2 = () => (
  <div className="relative flex items-center justify-center gap-5">
    <StyledBox />
    <div className="absolute h-24 w-[2px] bg-gray-700" />
    <StyledBox />
  </div>
);

const StyledBox2 = () => (
  <div className="h-24 w-24 rounded-xl border border-blue-400 bg-blue-100" />
);

const ArrowConnectorExampleWithStyledBox3 = () => (
  <div className="relative flex items-center justify-center gap-5">
    <StyledBox2 />
    <div className="absolute h-24 w-[2px] bg-gray-700" />
    <StyledBox2 />
  </div>
);

// =========================================================================================

// Define the subcomponents
const Component1 = () => <div>Component 1</div>;
const Component2 = () => <div>Component 2</div>;
const Component3 = () => <div>Component 3</div>;

// Options for the Select component
const options = [
  { value: "component1", label: "Component1" },
  { value: "component2", label: "Component2" },
  { value: "component3", label: "Component3" },
  { value: "ArrowConnectorExample", label: "ArrowConnectorExample" },
  {
    value: "ArrowConnectorExampleWithStyledBox1",
    label: "ArrowConnectorExampleWithStyledBox1",
  },
  {
    value: "ArrowConnectorExampleWithStyledBox2",
    label: "ArrowConnectorExampleWithStyledBox2",
  },
  {
    value: "ArrowConnectorExampleWithStyledBox3",
    label: "ArrowConnectorExampleWithStyledBox3"
  },
  {
    value: "ReactArcherApp1",
    label: "ReactArcherApp1"
  }
];

// Main component
const ArrowConnectorExamplesDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedComponent(selectedOption ? selectedOption.value : null);
  };

  let DisplayComponent = null;
  switch (selectedComponent) {
    case "component1":
      DisplayComponent = Component1;
      break;
    case "component2":
      DisplayComponent = Component2;
      break;
    case "component3":
      DisplayComponent = Component3;
      break;
    case "ArrowConnectorExample":
      DisplayComponent = ArrowConnectorExample;
      break;
    case "ArrowConnectorExampleWithStyledBox1":
      DisplayComponent = ArrowConnectorExampleWithStyledBox1;
      break;
    case "ArrowConnectorExampleWithStyledBox2":
      DisplayComponent = ArrowConnectorExampleWithStyledBox2;
      break;
    case "ArrowConnectorExampleWithStyledBox3":
      DisplayComponent = ArrowConnectorExampleWithStyledBox3;
      break;
    case "ReactArcherApp1":
      DisplayComponent = ReactArcherApp1;
      break;
    default:
      DisplayComponent = null;
  }

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow">
      <Select options={options} onChange={handleChange} classNamePrefix="react-select" />
      <div className="rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-4 min-h-[200px]">
        {DisplayComponent ? <DisplayComponent /> : <p className="text-center text-sm text-gray-500">Select an example to preview.</p>}
      </div>
    </div>
  );
};

export default ArrowConnectorExamplesDashboard;

export {
  ArrowConnectorExample,
  ArrowConnectorExampleWithStyledBox1,
  ArrowConnectorExampleWithStyledBox2,
  ArrowConnectorExampleWithStyledBox3,
  // MainComponent,
};
