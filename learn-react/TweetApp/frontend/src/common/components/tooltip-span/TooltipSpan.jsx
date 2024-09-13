import React, { useState } from "react";
// import './TooltipSpan.css'

const styles = {
  tooltipContainer: {
    position: "relative",
    display: "inline-block",
  },
  tooltipText: {
    // visibility: 'hidden',
    width: "120px",
    backgroundColor: "#555",
    color: "#fff",
    textAlign: "center",
    borderRadius: "6px",
    padding: "5px 0",
    position: "absolute",
    zIndex: 1,
    bottom: "100%",
    left: "50%",
    marginLeft: "-60px",
    // opacity: 0,
    transition: "opacity 0.3s",
  },
  tooltipContainerHover: {
    visibility: "visible",
    opacity: 1,
  },
  text: {
    display: "inline-block",
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    verticalAlign: "bottom",
  },
};

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
      style={styles.tooltipContainer}
      onMouseEnter={() => handleMouseActivities("MouseEnter")}
      onMouseLeave={() => handleMouseActivities("MouseLeave")}
    >
      <span style={styles.text}>
        {text.length > maxCharLength
          ? `${text.substring(0, maxCharLength)}...`
          : text}
      </span>
      {isHovered && text.length > maxCharLength && (
        <span style={styles.tooltipText}>{text}</span>
      )}
    </span>
  );
};

export default TooltipSpan;
