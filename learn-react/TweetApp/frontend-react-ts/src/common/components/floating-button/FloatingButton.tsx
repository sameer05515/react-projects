import React, { useState } from "react";
import CustomButton from "../custom-button/CustomButton";

const FloatingButton = ({
  buttonClassName = "",
  panelClassName = "",
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
          title={showButtonText ? buttonText : undefined}
          variant="light"
          className={`px-2 py-1 text-xs ${buttonClassName}`}
          iconName={iconName}
          onClick={handleClick}
        >
          {showButtonText && buttonText}
        </CustomButton>
        {show && (
          <div className={`absolute left-0 top-[34px] z-[1000] h-40 w-[500px] overflow-auto rounded border border-gray-200 bg-white p-2.5 text-xs shadow-lg ${panelClassName}`}>
            {children || "Nothing to display!"}
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingButton;
