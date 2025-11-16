import React, { useState } from "react";
import PopupMenu from "../PopupMenu/v1";

const BirdListV1 = () => {
  const [birds] = useState(["Sparrow", "Eagle", "Parrot", "Penguin"]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedBird, setSelectedBird] = useState(null);

  const handleRightClick = (event, bird) => {
    event.preventDefault();
    setSelectedBird(bird);
    setPopupPosition({ x: event.pageX, y: event.pageY });
    setPopupVisible(true);
  };

  const handlePopupOption = (option) => {
    console.log(`${option} selected for ${selectedBird}`);
    setPopupVisible(false);
  };

  return (
    <div className="flex rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="w-56 border-r border-gray-100 p-5">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Birds</h3>
        <ul className="space-y-1">
          {birds.map((bird) => (
            <li
              key={bird}
              onContextMenu={(e) => handleRightClick(e, bird)}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-100"
            >
              {bird}
            </li>
          ))}
        </ul>
      </div>

      {popupVisible && (
        <PopupMenu position={popupPosition} onOptionSelect={handlePopupOption} />
      )}
    </div>
  );
};

export default BirdListV1;
