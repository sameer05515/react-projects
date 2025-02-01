import React from "react";

const SelectStatisticsIteration/**: React.FC<{ onSelectIteration: (iteration: string) => void }>*/ = ({ onSelectIteration }) => {
  const iterations = ["itr1"];
//   const iterations = ["itr1", "itr2", "itr3"];

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Select statistics iteration</h1>
      <div className="list-group">
        {iterations.map((iteration) => (
          <button
            key={iteration}
            className="list-group-item list-group-item-action"
            onClick={() => onSelectIteration(iteration)}
          >
            {iteration}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectStatisticsIteration;
