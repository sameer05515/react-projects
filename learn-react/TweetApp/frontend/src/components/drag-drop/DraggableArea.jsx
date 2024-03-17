import React, { useState } from "react";
import "./DraggableArea.css"; // Import your CSS file here

const StringList = ({ strings }) => {
  return (
    <div>
      {strings.map((str, index) => (
        <div
          key={index}
          className="card"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", str);
          }}
        >
          <div className="card-label">Label {index + 1}</div>
          <div className="card-content">{str}</div>
        </div>
      ))}
    </div>
  );
};

const DraggableArea = () => {
  const [droppedStrings, setDroppedStrings] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedString = e.dataTransfer.getData("text/plain");
    setDroppedStrings([...droppedStrings, droppedString]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <div className="string-list">
          <h2>String List</h2>
          <StringList strings={["String 1", "String 2", "String 3"]} />
        </div>
        <div
          className="droppable-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2>Draggable Area</h2>
          {droppedStrings.map((str, index) => (
            <div key={index} className="card">
              {str}
            </div>
          ))}
        </div>
      </div>
      <div>{JSON.stringify(droppedStrings)}</div>
    </>
  );
};

export default DraggableArea;
