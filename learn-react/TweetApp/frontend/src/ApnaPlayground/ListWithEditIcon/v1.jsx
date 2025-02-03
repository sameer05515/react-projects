import React from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./styles.module.css";

const items = [
  "Lorem ipsum dolor sit amet.",
  "Consectetur adipiscing elit.",
  "Integer nec odio. Praesent libero.",
  "Sed cursus ante dapibus diam.",
  "Nulla quis sem at nibh elementum imperdiet."
];

const ListWithEditIconV1/**: React.FC*/ = () => {
  const handleEditClick = (index/**: number*/, content/**: string*/) => {
    console.log(`Editing item ${index}: ${content}`);
  };

  return (
    <div className="container mt-4">
      <div className="list-group">
        {items.map((item, index) => (
          <div key={index} className={`list-group-item border rounded p-3 ${styles.listItem}`}>
            {item}
            <span
              className={styles.editIcon}
              onClick={() => handleEditClick(index, item)}
              role="button"
            >
              <FaEdit size={18} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default ListWithEditIcon;

export default ListWithEditIconV1;
