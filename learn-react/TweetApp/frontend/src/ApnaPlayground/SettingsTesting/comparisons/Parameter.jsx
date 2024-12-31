// Parameter.js
import React from "react";

const Parameter = ({ parameter, onParameterChange, onRemoveParameter }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`${name} : ${value}`);
    onParameterChange({ ...parameter, [name]: value });
  };

  return (
    <div>
      <label>Header:</label>
      <input
        type="text"
        name="header"
        value={parameter.header}
        onChange={handleInputChange}
      />
      <label>Value:</label>
      <input
        type="text"
        name="value"
        value={parameter.value}
        onChange={handleInputChange}
      />
      <button onClick={() => onRemoveParameter(parameter)}>Remove</button>
    </div>
  );
};

export default Parameter;
