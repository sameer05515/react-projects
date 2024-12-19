import React, { useState } from "react";
import IconComponent from "../icon-component/IconComponent";

const CustomButton = ({
  onClick=()=>{},
  iconName,
  title = "",
  children,
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    display: "inline-block",
    // padding: '10px 20px',
    backgroundColor: isHovered ? "#0056b3" : "#0074d9",
    color: isHovered ? "#ffffff" : "#000000", // Text color changes on hover
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const iconStyle = {
    marginRight: "5px",
  };

  const textStyle = {
    marginLeft: "5px",
  };

  return (
    <button
      style={{ ...style, ...buttonStyle, ...(isHovered && buttonHoverStyle) }}
      title={title||''}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick?onClick:undefined}
    >
      {/* {children} */}
      {iconName && (
        <span style={iconStyle}>
          <IconComponent iconName={iconName} />
        </span>
      )}
      {children && <span style={textStyle}>{children}</span>}
    </button>
  );
};

export default CustomButton;
