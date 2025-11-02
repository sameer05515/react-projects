import React from "react";

/**
 * Badge Component - Replaces Bootstrap badge classes with Tailwind
 * 
 * @param {string} color - Badge color variant: 'danger', 'warning', 'success', 'secondary', 'dark', 'info', 'primary'
 * @param {boolean} rounded - Whether to show rounded pill style (default: true)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Badge content
 */
const Badge = ({ 
  color = "secondary", 
  rounded = true, 
  className = "", 
  children 
}) => {
  const colorClasses = {
    danger: "bg-red-600 text-white",
    warning: "bg-yellow-600 text-white",
    success: "bg-green-600 text-white",
    secondary: "bg-gray-600 text-white",
    dark: "bg-gray-800 text-white",
    info: "bg-blue-500 text-white",
    primary: "bg-blue-600 text-white",
  };

  const roundedClass = rounded ? "rounded-full" : "rounded";
  const colorClass = colorClasses[color] || colorClasses.secondary;

  return (
    <span className={`px-2 py-1 text-xs font-semibold ${roundedClass} ${colorClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

