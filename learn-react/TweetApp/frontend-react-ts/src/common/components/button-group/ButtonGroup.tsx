import React from "react";
import CustomButton from "../custom-button/CustomButton";

type ButtonOption = {
    id?: string | number;
    onClick?: () => void;
    iconName?: any;
    title?: string;
    children?: React.ReactNode;
    className?: string;
};

interface ButtonGroupProps {
    options?: ButtonOption[];
    className?: string;
    buttonClassName?: string;
    orientation?: "row" | "column";
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
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
                        className={`bg-slate-100 border border-slate-300 px-2 py-1 text-xs font-semibold text-gray-800 transition hover:bg-slate-200 ${buttonClassName} ${optionClassName}`}
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
