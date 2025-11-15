import React, { useState } from "react";
// import './TooltipSpan.css'

const TooltipSpan = ({ text, maxCharLength = 15, isHoverable = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseActivities = (activityType) => {
    // alert(text);
    if (isHoverable) {
      switch (activityType) {
        case "MouseEnter":
          setIsHovered(true);
          return;
        case "MouseLeave":
          setIsHovered(false);
          return;
      }
    }
  };
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => handleMouseActivities("MouseEnter")}
      onMouseLeave={() => handleMouseActivities("MouseLeave")}
    >
      <span className="inline-block max-w-[150px] truncate align-bottom text-gray-800">
        {text.length > maxCharLength
          ? `${text.substring(0, maxCharLength)}...`
          : text}
      </span>
      {isHovered && text.length > maxCharLength && (
        <span className="absolute left-1/2 top-0 mb-2 w-40 -translate-x-1/2 -translate-y-full rounded-md bg-gray-900 px-2 py-1 text-center text-xs text-white shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
};

export default TooltipSpan;
