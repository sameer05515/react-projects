import React from "react";

const DynamicDataRenderer = ({ data = {} }) => {
  const renderValue = (value) => {
    if (value === null) {
      return <span className="text-gray-400 italic">null</span>; // Display "null" for null values
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return <span className="text-gray-700">{value.toString()}</span>;
    } else if (Array.isArray(value)) {
      // return value.join(', ');
      // return value.map((element, index) => (
      //   <div key={index}>{renderValue(element)}</div>
      // ));
      // return value.map((element, index) => (
      //   <div key={index}>
      //     {renderValue(element)}
      //     {/* {index < value.length - 1 && ', '} */}
      //   </div>
      // ));
      return (
        <ul className="list-disc list-inside space-y-1 ml-4">
          {value.map((element, index) => (
            <li key={index} className="text-gray-700">
              {renderValue(element)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <ul className="list-none space-y-2 ml-4">
          {Object.keys(value).map((subKey, index) => (
            <li key={index} className="text-gray-700">
              <strong className="text-gray-900 font-semibold">{subKey}:</strong>{" "}
              <span className="ml-1">{renderValue(value[subKey])}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
      {/* <ul>
        {Object.keys(data).map((key, index) => (
          <li key={index}>
            <strong>{key}:</strong> {renderValue(data[key])}
          </li>
        ))}
      </ul> */}
      <div className="text-sm">
        {renderValue(data)}
      </div>
    </div>
  );
};

export default DynamicDataRenderer;
