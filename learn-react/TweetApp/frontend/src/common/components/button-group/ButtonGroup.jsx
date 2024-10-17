import React from "react";
import CustomButton from "../custom-button/CustomButton";

const defaultStyles = {
    container: { flex: 1, overflow: "auto",
        paddingBottom:'20px' },
    button: {
        backgroundColor: "#ccc", // Grey background color
        border: "1px solid #999", // Grey border
        padding: "2px 5px", // Adjust padding as needed
        fontSize: "12px", // Small font size
        borderRadius: "4px", // Rounded corners
        marginRight: "10px",
    },
};

const ButtonGroup = ({ options = [], style = {} }) => {
    const combinedContainerStyle = {
        ...defaultStyles.container,
        ...style.container,
    };
    const combinedButtonStyle = { ...defaultStyles.button, ...style.button };

    return (
        <div style={combinedContainerStyle}>
            {options.map(
                (
                    { id, onClick, iconName, title, children, style: buttonStyle },
                    idx
                ) => (
                    <CustomButton
                        key={id || `BTN_${idx}`}
                        style={{ ...combinedButtonStyle, ...buttonStyle }}
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
