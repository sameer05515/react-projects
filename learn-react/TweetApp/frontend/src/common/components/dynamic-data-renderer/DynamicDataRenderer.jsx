import React from "react";

const DynamicDataRenderer = ({ data = {} }) => {
  const renderValue = (value) => {
    if (value === null) {
      return "null"; // Display "null" for null values
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value.toString();
    } else if (Array.isArray(value)) {
      return (
        <ul style={styles.ulStyle}>
          {value.map((element, index) => (
            <li style={styles.liStyles} key={index}>
              {renderValue(element)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <ul style={styles.ulStyle}>
          {Object.keys(value).map((subKey, index) => (
            <li style={styles.liStyles} key={index}>
              <strong>{subKey}:</strong> {renderValue(value[subKey])}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {renderValue(data)}
    </div>
  );
};

const styles = {
  ulStyle: {
    listStyleType: 'none', // Remove bullets
    paddingLeft: 0, // Remove left padding
  },
  liStyles: {
    marginLeft: '7px', // Add some space between list items
    paddingBottom: '3px'
  }
};

export default DynamicDataRenderer;
