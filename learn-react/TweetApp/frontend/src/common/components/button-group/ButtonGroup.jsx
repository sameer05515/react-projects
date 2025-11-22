import React from "react";
import CustomButton from "../custom-button/CustomButton";

const ButtonGroup = ({
    options = [],
    className = "",
    buttonClassName = "",
    orientation = "row",
}) => {
    const containerClasses =
        orientation === "column"
            ? "flex flex-col gap-2"
            : "flex flex-wrap items-center gap-2";

    return (
        <div className={`${containerClasses} ${className}`}>
            {options.map(
                (
                    {
                        id,
                        onClick,
                        iconName,
                        title,
                        children,
                        className: optionClassName = "",
                    },
                    idx
                ) => (
                    <CustomButton
                        key={id || `BTN_${idx}`}
                        className={`bg-blue-600 border border-blue-700 px-2 py-1 text-xs font-semibold text-white transition hover:bg-blue-700 ${buttonClassName} ${optionClassName}`}
                        onClick={onClick}
                        iconName={iconName}
                        title={title}
                    >
                        {children}
                    </CustomButton>
                )
            )}
        </div>
    );
};

export default ButtonGroup;
