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

const ArrowConnectorExample = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        padding: "50px",
      }}
    >
      <div
        id="startDiv"
        style={{ width: "100px", height: "100px", background: "red" }}
      >
        Start
      </div>
      <ArrowConnector startId="startDiv" endId="endDiv" />
      <div
        id="endDiv"
        style={{ width: "100px", height: "100px", background: "blue" }}
      >
        End
      </div>
    </div>
  );
};

const StyledBox = () => {
  const styles = {
    container: {
      position: "relative",
      width: "100px",
      height: "100px",
      border: "1px solid black", // Border for visibility
    },
    circle: {
      position: "absolute",
      width: "6px", // Diameter of the circle
      height: "6px", // Diameter of the circle
      borderRadius: "50%",
      backgroundColor: "black", // Circle color
    },
    top: {
      left: "50%",
      transform: "translateX(-50%)",
      top: "0", // Circle at the top border
    },
    bottom: {
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "0", // Circle at the bottom border
    },
    left: {
      top: "50%",
      transform: "translateY(-50%)",
      left: "0", // Circle at the left border
    },
    right: {
      top: "50%",
      transform: "translateY(-50%)",
      right: "0", // Circle at the right border
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.circle, ...styles.top, marginLeft: "-3px" }} />
      <div style={{ ...styles.circle, ...styles.bottom, marginLeft: "-3px" }} />
      <div style={{ ...styles.circle, ...styles.left, marginTop: "-3px" }} />
      <div style={{ ...styles.circle, ...styles.right, marginTop: "-3px" }} />
    </div>
  );
};

const ArrowConnectorExampleWithStyledBox1 = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-around", // Adjust spacing between boxes
    alignItems: "center",
    gap: "20px", // Optional gap between boxes
  };

  return (
    <div style={containerStyle}>
      <StyledBox />
      <StyledBox />
    </div>
  );
};

const ArrowConnectorExampleWithStyledBox2 = () => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px", // Space between the boxes
    position: "relative", // Make sure the line is positioned correctly
  };

  const lineStyle = {
    position: "absolute",
    top: "50%", // Center vertically
    left: "calc(50% - 1px)", // Center the line horizontally between the boxes
    width: "1px", // Line width
    height: "100px", // Line height (same as the boxes' height)
    backgroundColor: "black", // Line color
    transform: "translateY(-50%)", // Center the line vertically
  };

  return (
    <div style={containerStyle}>
      <StyledBox />
      <div style={lineStyle} /> {/* Line between the boxes */}
      <StyledBox />
    </div>
  );
};

const StyledBox2 = () => (
  <div style={{
    width: "100px",
    height: "100px",
    backgroundColor: "lightblue",
    border: "1px solid blue",
  }} />
);


const ArrowConnectorExampleWithStyledBox3 = () => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    //width: "220px", // Adjust width based on the total width needed
  };

  const lineStyle = {
    position: "absolute",
    top: "0",
    left: "50px", // Adjust according to the box's width and gap
    width: "1px",
    height: "100px",
    backgroundColor: "black",
  };

  return (
    <div style={containerStyle}>
      <StyledBox2 />
      <div style={lineStyle} />
      <StyledBox2 />
    </div>
  );
};

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
const MainComponent = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedComponent(selectedOption ? selectedOption.value : null);
  };

  let DisplayComponent;
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
    <div style={{ padding: "5px", gap: "5px" }}>
      <div style={{ padding: "5px", gap: "5px" }}>
        <Select options={options} onChange={handleChange} />
      </div>
      <div style={{ padding: "5px", gap: "5px" }}>
        {DisplayComponent && <DisplayComponent />}
      </div>
    </div>
  );
};

export {
  ArrowConnectorExample,
  ArrowConnectorExampleWithStyledBox1,
  ArrowConnectorExampleWithStyledBox2,
  ArrowConnectorExampleWithStyledBox3,
  MainComponent,
};
