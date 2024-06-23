import React, { useLayoutEffect, useState } from "react";

// Utility function to calculate arrow style
const calculateArrowStyle = (startRect, endRect) => {
  const startX = startRect.right;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left;
  const endY = endRect.top + endRect.height / 2;

  return {
    position: "absolute",
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)}px`,
    transform: `rotate(${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)}deg)`,
    transformOrigin: "0 0",
    borderTop: "2px solid black",
  };
};

// ArrowConnector Component
const ArrowConnector = ({ startId, endId }) => {
  const [arrowStyle, setArrowStyle] = useState({});

  useLayoutEffect(() => {
    const updateArrowPosition = () => {
      const startElement = document.getElementById(startId);
      const endElement = document.getElementById(endId);

      if (startElement && endElement) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        setArrowStyle(calculateArrowStyle(startRect, endRect));
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

// Common Box styles
const boxStyles = {
  container: {
    position: "relative",
    width: "100px",
    height: "100px",
    border: "1px solid black",
  },
  circle: {
    position: "absolute",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "black",
  },
  positions: {
    top: {
      left: "50%",
      transform: "translateX(-50%)",
      top: "0",
    },
    bottom: {
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "0",
    },
    left: {
      top: "50%",
      transform: "translateY(-50%)",
      left: "0",
    },
    right: {
      top: "50%",
      transform: "translateY(-50%)",
      right: "0",
    },
  },
};

// StyledBox Component
const StyledBox = () => (
  <div style={boxStyles.container}>
    {["top", "bottom", "left", "right"].map((pos) => (
      <div key={pos} style={{ ...boxStyles.circle, ...boxStyles.positions[pos] }} />
    ))}
  </div>
);

// StyledBox2 Component with custom styles
const StyledBox2 = () => (
  <div
    style={{
      width: "100px",
      height: "100px",
      backgroundColor: "lightblue",
      border: "1px solid blue",
    }}
  />
);

// Line component
const Line = ({ style }) => <div style={style}></div>;

// Wrapper components for the examples
const ExampleContainer = ({ children, containerStyle }) => (
  <div style={containerStyle}>{children}</div>
);

// Example with ArrowConnector
const ArrowConnectorExample = () => (
  <ExampleContainer
    containerStyle={{
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      padding: "50px",
    }}
  >
    <div id="startDiv" style={{ width: "100px", height: "100px", background: "red" }}>
      Start
    </div>
    <ArrowConnector startId="startDiv" endId="endDiv" />
    <div id="endDiv" style={{ width: "100px", height: "100px", background: "blue" }}>
      End
    </div>
  </ExampleContainer>
);

// Example with StyledBox components
const ArrowConnectorExampleWithStyledBox1 = () => (
  <ExampleContainer containerStyle={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "20px" }}>
    <StyledBox />
    <StyledBox />
  </ExampleContainer>
);

// Example with StyledBox and Line components
const ArrowConnectorExampleWithStyledBox2 = () => (
  <ExampleContainer containerStyle={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
    <StyledBox />
    <Line style={{ position: "absolute", top: "50%", left: "calc(50% - 1px)", width: "1px", height: "100px", backgroundColor: "black", transform: "translateY(-50%)" }} />
    <StyledBox />
  </ExampleContainer>
);

// Example with StyledBox2 components
const ArrowConnectorExampleWithStyledBox3 = () => (
  <ExampleContainer containerStyle={{ display: "flex", alignItems: "center", position: "relative" }}>
    <StyledBox2 />
    <Line style={{ position: "absolute", top: "0", left: "50px", width: "1px", height: "100px", backgroundColor: "black" }} />
    <StyledBox2 />
  </ExampleContainer>
);

// Simple component examples
const Component1 = () => <div>Component 1</div>;
const Component2 = ({ data = [] }) =>
  <div>
    Component 2 <br />
    <pre>{data?JSON.stringify(data, null, 2):'empty or invalid data'}</pre>
  </div>;

const Component3 = () => {
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  const styles = {
    even: {
      backgroundColor: "green",
      color: "white",
      padding: "5px",
      margin: "5px",
      borderRadius: "3px",
    },
    odd: {
      backgroundColor: "yellow",
      color: "black",
      padding: "5px",
      margin: "5px",
      borderRadius: "3px",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
  };

  return (
    <div style={styles.container}>
      {numbers.map((number) => (
        <span key={number} style={number % 2 === 0 && number > 5 ? styles.even : styles.odd}>
          {number}
        </span>
      ))}
    </div>
  );
};

export {
  ArrowConnectorExample,
  ArrowConnectorExampleWithStyledBox1,
  ArrowConnectorExampleWithStyledBox2,
  ArrowConnectorExampleWithStyledBox3,
  Component1,
  Component2,
  Component3,
};
