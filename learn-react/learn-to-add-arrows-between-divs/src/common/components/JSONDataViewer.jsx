import React, { useState } from "react";
import ToggleableIcon from "./ToggleableIcon";

// Reusable component to view JSON data with a toggle option
const JSONDataViewer = ({ step = "", title = "", metadata = [], initialValueToShowMetadata = false }) => {
    const [showMetadata, setShowMetadata] = useState(initialValueToShowMetadata);

    return (
        <div>
            <span>{step && `Step: ${step} - `}{title}</span>
            <ToggleableIcon
                isContentVisible={showMetadata}
                label={step ? "Step output" : ""}
                onToggle={() => setShowMetadata(prev => !prev)}
            />
            {showMetadata && (
                <div style={{
                    maxHeight: "200px",
                    maxWidth: "90vw",
                    overflow: "auto",
                    padding: "10px",
                    gap: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                    margin: "20px 5px",
                }}>
                    <pre>{JSON.stringify(metadata, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default JSONDataViewer;
