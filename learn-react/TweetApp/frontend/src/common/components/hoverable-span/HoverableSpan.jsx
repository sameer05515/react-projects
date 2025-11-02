import React, { useState } from "react";

const HoverableSpan = ({
  children,
  isSelected = false,
  isHoverable = true,
  style = {},
  onClick = () => { },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseActivities = (activityType) => {
    if (isHoverable) {
      switch (activityType) {
        case "MouseEnter":
          setIsHovered(true);
          return;
        case "MouseLeave":
          setIsHovered(false);
          return;
        default:
          return;
      }
    }
  };

  // Determine background color based on state
  const getBackgroundColor = () => {
    if (isHovered) {
      return isSelected ? "bg-cyan-300" : "bg-gray-300";
    }
    return isSelected ? "bg-teal-200" : "bg-gray-200";
  };

  return (
    <span
      className={`inline-block ${getBackgroundColor()} ${isSelected ? "text-blue-600" : "text-black"} ${isHoverable ? "cursor-pointer" : ""} transition-colors duration-300`}
      style={style}
      onMouseEnter={() => handleMouseActivities("MouseEnter")}
      onMouseLeave={() => handleMouseActivities("MouseLeave")}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
export default HoverableSpan;
