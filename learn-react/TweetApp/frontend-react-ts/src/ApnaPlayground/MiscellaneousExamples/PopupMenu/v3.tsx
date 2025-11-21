import React from "react";

const PopupMenuV3 = ({ position, popupOptions, onOptionSelect, popupOptionClassName = "" }) => {
  return (
    <div
      className="absolute z-50 min-w-[200px] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl ring-1 ring-black/10"
      style={{ top: position.y, left: position.x }}
    >
      {popupOptions.map((option, index) => (
        <button
          key={option.title || index}
          type="button"
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-gray-800 transition hover:bg-gray-100 ${popupOptionClassName}`}
          onClick={() => onOptionSelect(option)}
        >
          <span>{option.title}</span>
          {option.shortcut && <span className="text-xs text-gray-400">{option.shortcut}</span>}
        </button>
      ))}
    </div>
  );
};

export default PopupMenuV3;
