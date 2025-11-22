import React from "react";
import IconComponent from "../icon-component/IconComponent";

type CustomButtonProps = {
  onClick?: () => void;
  iconName?: any;
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
};

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick = () => {},
  iconName,
  title = "",
  children,
  className = "",
  style = {},
  disabled = false,
  type = "button",
  variant = "primary",
}: CustomButtonProps) => {
  // Color variants with improved contrast and modern colors
  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white border-none focus:ring-indigo-500",
    secondary: "bg-slate-600 hover:bg-slate-700 text-white border-none focus:ring-slate-500",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white border-none focus:ring-emerald-500",
    danger: "bg-rose-600 hover:bg-rose-700 text-white border-none focus:ring-rose-500",
    warning: "bg-amber-500 hover:bg-amber-600 text-white border-none focus:ring-amber-500",
    info: "bg-cyan-600 hover:bg-cyan-700 text-white border-none focus:ring-cyan-500",
    light: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 focus:ring-gray-400",
    dark: "bg-gray-800 hover:bg-gray-900 text-white border-none focus:ring-gray-700",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-[10px] px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      style={style}
      title={title || ""}
      onClick={onClick}
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
