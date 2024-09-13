import React from "react";

const defaultToggleSymbols = {
    showSymbol: "+",
    hideSymbol: "-",
};

type ToggleableIconProps = {
    label?: string;
    isContentVisible?: boolean;
    onToggle?: () => void; // Corrected the type for onToggle
    toggleSymbols?: { showSymbol?: string; hideSymbol?: string }; // Added type for toggleSymbols
    additionalStyleForIcon?: React.CSSProperties; // Corrected the type for additionalStyleForIcon
    additionalStyleForContainer?: React.CSSProperties; // Added type for additionalStyleForContainer
};

// Reusable ToggleableIcon for showing/hiding content
const ToggleableIcon: React.FC<ToggleableIconProps> = React.memo(
    ({
        label = "",
        isContentVisible = false,
        onToggle,
        toggleSymbols,
        additionalStyleForIcon = {},
        additionalStyleForContainer = {},
    }) => {
        const handleToggle = () => onToggle && onToggle();
        const icon = isContentVisible
            ? toggleSymbols?.hideSymbol || defaultToggleSymbols.hideSymbol
            : toggleSymbols?.showSymbol || defaultToggleSymbols.showSymbol;
        const title = isContentVisible ? `Hide ${label}` : `Show ${label}`;

        return (
            <span
                title={title}
                style={{ ...styles.iconContainer, ...additionalStyleForContainer }}
                onClick={handleToggle}
            >
                <span style={{ ...styles.icon, ...additionalStyleForIcon }}>
                    {icon}
                </span>
            </span>
        );
    }
);

const styles: { [key: string]: React.CSSProperties } = {
    iconContainer: {
        marginRight: "10px",
        fontSize: "12px",
        cursor: "pointer",
    },
    icon: {
        margin: "3px",
    },
};

export default ToggleableIcon;
