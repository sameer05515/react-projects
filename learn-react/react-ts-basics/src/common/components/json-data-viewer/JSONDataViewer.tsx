import { useState, CSSProperties, FC } from "react";
import ToggleableIcon from "../toggleable-icon/ToggleableIcon";

interface JSONDataViewerProps {
  step?: string; // Optional step information
  title?: string; // Optional title for the viewer
  metadata?: any; // Metadata to display, default is an array
  initialValueToShowMetadata?: boolean; // Initial state for showing metadata
}

const JSONDataViewer: FC<JSONDataViewerProps> = ({
  step = "",
  title = "",
  metadata = null,
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
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  title: {
    fontWeight: "bold",
  },
  metadataContainer: {
    maxHeight: "200px",
    maxWidth: "90vw",
    overflow: "auto",
    padding: "10px",
    gap: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    margin: "20px 5px",
  },
};

export default JSONDataViewer;
