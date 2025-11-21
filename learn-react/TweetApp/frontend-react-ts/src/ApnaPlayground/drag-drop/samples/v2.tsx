import React, { useState } from "react";

const initialCols = {
  todo: ["Task A", "Task B"],
  doing: ["Task C"],
  done: ["Task D"],
};

const DraggableAreaV2 = () => {
  const [cols, setCols] = useState(initialCols);
  const [dragData, setDragData] = useState({ fromCol: null, index: null });

  const onDragStart = (fromCol, index) => setDragData({ fromCol, index });
  const onDrop = (toCol) => {
    const { fromCol, index } = dragData;
    if (fromCol == null || index == null) return;
    if (fromCol === toCol) return;
    const source = [...cols[fromCol]];
    const [moved] = source.splice(index, 1);
    const target = [...cols[toCol], moved];
    setCols({ ...cols, [fromCol]: source, [toCol]: target });
    setDragData({ fromCol: null, index: null });
  };

  const Column = ({ name, items }) => (
    <div
      className="min-h-[160px] flex-1 rounded-lg border border-gray-200 bg-gray-50 p-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(name)}
    >
      <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600">{name}</h4>
      <div className="space-y-2">
        {items.map((t, idx) => (
          <div
            key={`${name}_${t}`}
            draggable
            onDragStart={() => onDragStart(name, idx)}
            className="cursor-move rounded border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-100"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        <Column name="todo" items={cols.todo} />
        <Column name="doing" items={cols.doing} />
        <Column name="done" items={cols.done} />
      </div>
    </div>
  );
};

export default DraggableAreaV2;

