import React, { useState } from "react";

const DraggableAreaV1 = () => {
  const [items, setItems] = useState(["Alpha", "Bravo", "Charlie", "Delta"]);
  const [dragIndex, setDragIndex] = useState(null);

  const handleDragStart = (idx) => setDragIndex(idx);
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === idx) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(idx, 0, moved);
    setItems(next);
    setDragIndex(idx);
  };
  const handleDragEnd = () => setDragIndex(null);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <ul className="space-y-2">
        {items.map((label, idx) => (
          <li
            key={label}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`cursor-move rounded border px-3 py-2 text-sm transition-colors ${
              dragIndex === idx
                ? "border-blue-400 bg-blue-50 text-blue-800"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
            }`}
            title="Drag to reorder"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DraggableAreaV1;

