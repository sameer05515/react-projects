import React from "react";
import IconComponent from "../icon-component/IconComponent";

const CustomButton = ({
  onClick = () => {},
  iconName,
  title = "",
  children,
  className = "",
  style = {},
  disabled = false,
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[10px] border-none bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      style={style}
      title={title || ""}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
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
