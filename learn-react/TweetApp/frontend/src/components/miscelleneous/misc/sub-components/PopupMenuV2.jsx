import React, { useState } from "react";
import { styles } from "./styles";

// PopupMenuV2 Component
const PopupMenuV2 = ({ position, popupOptions, onOptionSelect }) => {
    return (
        <div
            style={{
                ...styles.popupMenu,
                top: position.y,
                left: position.x,
            }}
        >
            {popupOptions.map((option, index) => (
                <div
                    key={index}
                    onClick={() => onOptionSelect(option.title)}
                    style={styles.popupOption}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                    }
                >
                    {option.title}
                </div>
            ))}
        </div>
    );
};

export default PopupMenuV2;