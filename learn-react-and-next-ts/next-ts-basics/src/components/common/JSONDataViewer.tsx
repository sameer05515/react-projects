import React, { useState } from "react";
import ToggleableIcon from "./ToggleableIcon";

type JSONDataViewerProps = {
  step?: string;
  title: string;
  metadata: Object; // Assuming metadata is an array of objects
  initialValueToShowMetadata?: boolean;
};

// Reusable component to view JSON data with a toggle option
const JSONDataViewer: React.FC<JSONDataViewerProps> = ({
  step = "",
  title = "",
  metadata = [],
  initialValueToShowMetadata = false,
}) => {
  const [showMetadata, setShowMetadata] = useState(initialValueToShowMetadata);

  const toggleMetadataVisibility = () => setShowMetadata((prev) => !prev);

  return (
    <div>
      <span style={styles.title}>
        {step && `Step: ${step} - `}
        {title}
      </span>
      <ToggleableIcon
        isContentVisible={showMetadata}
        label={step ? "Step output" : ""}
        onToggle={toggleMetadataVisibility}
      />
      {showMetadata && (
        <div style={styles.metadataContainer}>
          <pre style={{ wordBreak: "break-all" }}>
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  title: {
    fontWeight: "bold",
  },
  metadataContainer: {
    maxHeight: "200px",
    maxWidth: "50vw",
    overflow: "auto",
    padding: "10px",
    gap: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "20px 5px",
  },
};

export default JSONDataViewer;
