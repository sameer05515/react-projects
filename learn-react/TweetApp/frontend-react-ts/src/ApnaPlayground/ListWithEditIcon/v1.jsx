import React from "react";
import WithEditIcon from "../../common/components/WithEditIcon/v1";

const items = [
  "Lorem ipsum dolor sit amet.",
  "Consectetur adipiscing elit.",
  "Integer nec odio. Praesent libero.",
  "Sed cursus ante dapibus diam.",
  "Nulla quis sem at nibh elementum imperdiet."
];

const ListWithEditIconV1 = () => {
  const handleEditClick = (index/**: number*/, content/**: string*/) => {
    console.log(`Editing item ${index}: ${content}`);
  };

  return (
    <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <WithEditIcon
            key={index}
            className="rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-800 shadow-sm"
            showEditIcon
            editIconTitle="Edit item"
            onEditIconClick={() => handleEditClick(index, item)}
          >
            {item}
          </WithEditIcon>
        ))}
      </div>
    </div>
  );
};

export default ListWithEditIconV1;
