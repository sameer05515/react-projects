import React, { useState } from "react";

const HoverableSpan = ({
  children,
  isSelected = false,
  isHoverable = true,
  style = {},
  onClick = () => { },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const spanStyle = {
    display: "inline-block",
    // padding: '10px 20px',
    backgroundColor: isHovered
      ? isSelected ? "#00FFFF" : "#D3D3D3"
      : isSelected ? "#96DED1" : "#E5E4E2",
    color: isSelected ? "blue" : "black", // Text color changes on hover
    // border: 'none',
    // borderRadius: '10px',
    cursor: isHoverable ? "pointer" : "",
    transition: "background-color 0.3s",
  };

  const handleMouseActivities = (activityType) => {
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
      style={{ ...style, ...spanStyle }}
      onMouseEnter={() => handleMouseActivities("MouseEnter")}
      onMouseLeave={() => handleMouseActivities("MouseLeave")}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
//"#E5E4E2"
export default HoverableSpan;
