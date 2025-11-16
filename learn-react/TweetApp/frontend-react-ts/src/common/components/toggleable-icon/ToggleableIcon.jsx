import React from "react";

const defaultToggleSymbols = {
    showSymbol: "+",
    hideSymbol: "-",
};

// Reusable ToggleableIcon for showing/hiding content
const ToggleableIcon = React.memo(
    ({
        label = "",
        isContentVisible = false,
        onToggle,
        toggleSymbols,
        className = "",
        iconClassName = "",
    }) => {
        const handleToggle = () => onToggle && onToggle();
        const icon = isContentVisible
            ? toggleSymbols?.hideSymbol || defaultToggleSymbols.hideSymbol
            : toggleSymbols?.showSymbol || defaultToggleSymbols.showSymbol;
        const title = isContentVisible ? `Hide ${label}` : `Show ${label}`;

        return (
            <button
                type="button"
                title={title}
                onClick={handleToggle}
                className={`mr-2 inline-flex items-center justify-center rounded border border-transparent text-xs font-semibold text-gray-700 transition hover:text-gray-900 focus:outline-none ${className}`}
            >
                <span className={`px-1 ${iconClassName}`}>{icon}</span>
            </button>
        );
    }
);

export default ToggleableIcon;
