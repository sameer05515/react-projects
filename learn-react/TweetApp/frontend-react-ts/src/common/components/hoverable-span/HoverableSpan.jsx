import React, { useState } from "react";

const HoverableSpan = ({
  children,
  isSelected = false,
  isHoverable = true,
  style = {},
  className = "",
  onClick = () => {},
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

  const baseClasses = `inline-block rounded px-2 py-1 text-xs transition-colors duration-200 ${isHoverable ? "cursor-pointer" : ""}`;

  return (
    <span
      className={`${baseClasses} ${getBackgroundColor()} ${
        isSelected ? "text-blue-700" : "text-gray-900"
      } ${className}`}
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
