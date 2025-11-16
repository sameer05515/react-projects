import React, { useState } from "react";
import PopupMenu from "../PopupMenu/v2";

interface BirdItemProps {
  bird: string;
  onItemRightClick?: (event: React.MouseEvent<HTMLLIElement>, bird: string) => void;
}
const BirdItem: React.FC<BirdItemProps> = ({ bird, onItemRightClick = () => {} }) => (
  <li
    onContextMenu={(e) => onItemRightClick(e, bird)}
    className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-800 transition hover:bg-gray-100"
  >
    {bird}
  </li>
);

const BirdListV4 = () => {
  const [birds] = useState<string[]>(["Sparrow", "Eagle", "Parrot", "Penguin"]);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedBird, setSelectedBird] = useState<string | null>(null);

  const handleRightClick = (event: React.MouseEvent<HTMLLIElement>, bird: string) => {
    event.preventDefault();
    setSelectedBird(bird);
    setPopupPosition({ x: event.pageX, y: event.pageY });
    setPopupVisible(true);
  };

  const handlePopupOption = (option: string) => {
    console.log(`${option} selected for ${selectedBird}`);
    setPopupVisible(false);
  };

  const popupOptions: { title: string }[] = [
    { title: "Edit" },
    { title: "Delete" },
    { title: "Rename" },
  ];

  return (
    <div className="flex rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="w-56 border-r border-gray-100 p-5">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Birds</h3>
        <ul className="space-y-1">
          {birds.map((bird) => (
            <BirdItem key={bird} bird={bird} onItemRightClick={handleRightClick} />
          ))}
        </ul>
      </div>

      {popupVisible && (
        <PopupMenu
          position={popupPosition}
          popupOptions={popupOptions}
          onOptionSelect={handlePopupOption}
        />
      )}
    </div>
  );
};

export default BirdListV4;
