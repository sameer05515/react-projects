import React from "react";
import CustomButton from "../custom-button/CustomButton";

type ButtonOption = {
    id?: string | number;
    onClick?: () => void;
    iconName?: any;
    title?: string;
    children?: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
};

interface ButtonGroupProps {
    options?: ButtonOption[];
    className?: string;
    buttonClassName?: string;
    orientation?: "row" | "column";
    defaultVariant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    options = [],
    className = "",
    buttonClassName = "",
    orientation = "row",
    defaultVariant = "primary",
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
                        variant: optionVariant,
                    },
                    idx
                ) => (
                    <CustomButton
                        key={id || `BTN_${idx}`}
                        variant={optionVariant || defaultVariant}
                        className={`px-2 py-1 text-xs ${buttonClassName} ${optionClassName}`}
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
