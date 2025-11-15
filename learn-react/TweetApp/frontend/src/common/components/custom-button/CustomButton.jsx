import React from "react";
import IconComponent from "../icon-component/IconComponent";

const CustomButton = ({
  onClick=()=>{},
  iconName,
  title = "",
  children,
  className = "",
  style = {},
}) => {
  return (
    <button
      className={`inline-block bg-blue-600 text-white border-none rounded-[10px] cursor-pointer transition-colors hover:bg-blue-700 ${className}`}
      style={style}
      title={title||''}
      onClick={onClick?onClick:undefined}
    >
      {iconName && (
        <span className="mr-1.5">
          <IconComponent iconName={iconName} />
        </span>
      )}
      {children && <span className="ml-1.5">{children}</span>}
    </button>
  );
};

export default CustomButton;
