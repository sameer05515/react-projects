import React from "react";

const PopupMenuV2 = ({ position, popupOptions, onOptionSelect }) => {
  return (
    <div
      className="absolute z-50 min-w-[180px] rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl ring-1 ring-black/5"
      style={{ top: position.y, left: position.x }}
    >
      {popupOptions.map((option) => (
        <button
          key={option.title}
          type="button"
          className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium text-gray-800 transition hover:bg-gray-100"
          onClick={() => onOptionSelect(option.title)}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
};

export default PopupMenuV2;