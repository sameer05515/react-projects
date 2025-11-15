import React from "react";

const PopupMenuV1 = ({ position, onOptionSelect }) => {
  return (
    <div
      className="absolute z-50 min-w-[160px] rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
      style={{ top: position.y, left: position.x }}
    >
      {["Edit", "Delete", "Rename"].map((option) => (
        <button
          key={option}
          type="button"
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-100"
          onClick={() => onOptionSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PopupMenuV1;
