import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CustomButton from "../../../common/components/custom-button/CustomButton";

// Extracted CopyButton component
const CopyButton = ({ buttonText, textToCopy, onCopy }) => (
    <CopyToClipboard text={textToCopy} onCopy={onCopy}>
        <CustomButton variant="info" className="px-2.5 py-1.5">
            {buttonText || 'Copy to Clipboard'}
        </CustomButton>
    </CopyToClipboard>
);

export default CopyButton;