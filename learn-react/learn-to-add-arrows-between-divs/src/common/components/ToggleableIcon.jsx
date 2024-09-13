import React from 'react';

// Reusable ToggleableIcon for showing/hiding content
const ToggleableIcon = React.memo(
    ({ label = "", isContentVisible = false, onToggle, toggleSymbols = {} }) => {
        return (
            <span
                title={isContentVisible ? `Hide ${label}` : `Show ${label}`}
                style={{ marginRight: "10px", fontSize: "12px", cursor: "pointer" }}
                onClick={() => { onToggle && onToggle(); }}
            >
                <span style={{ margin: '3px' }}>
                    {isContentVisible
                        ? `${toggleSymbols?.hideSymbol || "-"}`
                        : `${toggleSymbols?.showSymbol || "+"}`}
                </span>
            </span>
        )
    }
);

export default ToggleableIcon;
