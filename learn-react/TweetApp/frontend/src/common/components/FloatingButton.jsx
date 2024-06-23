import React, { useState } from "react";
import CustomButton from "./CustomButton";

const FloatingButton = ({
  buttonStyle = {},
  floatingChildrenStyle = {},
  iconName,
  showButtonText = true,
  buttonText = "???",
  children,
}) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const childrenStyle = {
    position: "absolute",
    top: "30px",
    left: "0",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    zIndex: "1000",
    width: "500px", // Set the desired width here
    fontSize: "12px",
    height: "150px",
    overflow: "auto",
  };

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <CustomButton
          title={!showButtonText && buttonText}
          style={buttonStyle}
          iconName={iconName}
          onClick={handleClick}
        >
          {showButtonText && buttonText}
        </CustomButton>
        {show && (
          <div style={{ ...childrenStyle, ...floatingChildrenStyle }}>
            {children || "Nothing to display!"}
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingButton;
