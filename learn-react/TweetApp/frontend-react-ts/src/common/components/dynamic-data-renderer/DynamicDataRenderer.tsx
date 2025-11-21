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
        <ul className="list-none pl-0">
          {value.map((element, index) => (
            <li className="ml-1.5 pb-0.5" key={index}>
              {renderValue(element)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <ul className="list-none pl-0">
          {Object.keys(value).map((subKey, index) => (
            <li className="ml-1.5 pb-0.5" key={index}>
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

export default DynamicDataRenderer;
