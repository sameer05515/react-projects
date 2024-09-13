import React, { useState } from "react";
import ToggleableIcon from "../../../common/components/ToggleableIcon";

const JSONDataViewer = ({ step = "", title = "", metadata = [], error = null }) => {
    const [showMetadata, setShowMetadata] = useState(false);

    return (
        <div>
            <span>
                {step && <>Step: {step} - </>}
                {title}
            </span>{" "}
            <ToggleableIcon
                isContentVisible={showMetadata}
                label={step ? "Step output" : ""}
                onToggle={() => setShowMetadata((prev) => !prev)}
            />
            {error ? (
                <div style={{ color: "red", marginTop: "10px" }}>
                    Error: {error.message || "An error occurred during processing."}
                </div>
            ) : (
                showMetadata && (
                    <div
                        style={{
                            maxHeight: "200px",
                            maxWidth: "90vw",
                            overflow: "auto",
                            padding: "10px",
                            gap: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            backgroundColor: "#f9f9f9",
                            margin: "20px 5px",
                        }}
                    >
                        <pre>{JSON.stringify(metadata, null, 2)}</pre>
                    </div>
                )
            )}
        </div>
    );
};

export default JSONDataViewer;
