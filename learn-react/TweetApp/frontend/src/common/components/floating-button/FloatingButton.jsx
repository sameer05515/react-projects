import React, { useState } from "react";
import CustomButton from "../custom-button/CustomButton";

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

  return (
    <>
      <div className="relative inline-block">
        <CustomButton
          title={!showButtonText && buttonText}
          style={buttonStyle}
          iconName={iconName}
          onClick={handleClick}
        >
          {showButtonText && buttonText}
        </CustomButton>
        {show && (
          <div 
            className="absolute top-[30px] left-0 p-2.5 border border-gray-300 bg-white shadow-lg z-[1000] w-[500px] text-xs h-[150px] overflow-auto"
            style={floatingChildrenStyle}
          >
            {children || "Nothing to display!"}
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingButton;
