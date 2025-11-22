import React, { useState } from "react";
import ToggleableIcon from "../toggleable-icon/ToggleableIcon";

const Default_Title_For_JSONDataViewer = "X-Ray: For provided metadata {Please customize title, if needed!}"

// Reusable component to view JSON data with a toggle option
interface JSONDataViewerProps {
    step?: string;
    title?: string;
    metadata?: unknown;
    initialValueToShowMetadata?: boolean;
}

const JSONDataViewer: React.FC<JSONDataViewerProps> = ({ step = "", title = "", metadata = undefined, initialValueToShowMetadata = false }) => {
    const [showMetadata, setShowMetadata] = useState(initialValueToShowMetadata);

    const toggleMetadataVisibility = () => setShowMetadata(prev => !prev);

    return (
        <div className="mb-4">
            <span className="font-bold text-gray-900 dark:text-gray-100">
                {step && `Step: ${step} - `}{title || Default_Title_For_JSONDataViewer}
            </span>
            <ToggleableIcon
                isContentVisible={showMetadata}
                label={step ? "Step output" : ""}
                onToggle={toggleMetadataVisibility}
            />
            {showMetadata && (
                <div className="max-h-[200px] max-w-[90vw] overflow-auto p-2.5 gap-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 my-5 mx-1.5">
                    <pre className="text-sm text-gray-900 dark:text-gray-100">{JSON.stringify(metadata, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default JSONDataViewer;
