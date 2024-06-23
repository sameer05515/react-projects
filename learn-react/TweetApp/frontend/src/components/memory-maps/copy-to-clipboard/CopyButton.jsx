import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CustomButton from "../../../common/components/CustomButton";

const styles = {
    container: {
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        border: "1px solid #ddd",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
    },
    button: {
        padding: "5px 10px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    copyButton: {
        backgroundColor: "#007bff",
        color: "#fff",
    },
    goToButton: {
        backgroundColor: "#28a745",
        color: "#fff",
    },
    copiedMessage: {
        color: "green",
        marginBottom: "10px",
        display: "block",
    },
};

// Extracted CopyButton component
const CopyButton = ({ buttonText, textToCopy, onCopy }) => (
    <CopyToClipboard text={textToCopy} onCopy={onCopy}>
        <CustomButton style={{ ...styles.button, ...styles.copyButton }}>
            {buttonText || 'Copy to Clipboard'}
        </CustomButton>
    </CopyToClipboard>
);

export default CopyButton;