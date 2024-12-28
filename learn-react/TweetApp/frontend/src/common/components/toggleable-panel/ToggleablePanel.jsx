import React, { useEffect, useState } from "react";
import ToggleableIcon from "../toggleable-icon/ToggleableIcon";

const ToggleablePanel = ({
  title = "",
  children,
  showContent: initialValueToShowMetadata = false,
  panelContainerStyle = {},
}) => {
  const [showMetadata, setShowMetadata] = useState(initialValueToShowMetadata);
  useEffect(() => {
    setShowMetadata(initialValueToShowMetadata);
  }, [initialValueToShowMetadata]);

  const toggleMetadataVisibility = () => setShowMetadata((prev) => !prev);
  return (
    <div style={{ ...panelContainerStyle }}>
      <ToggleableIcon
        isContentVisible={showMetadata}
        onToggle={toggleMetadataVisibility}
        additionalStyleForIcon={{ fontWeight: "bold" }}
      />
      <span style={styles.title}>{title}</span>

      {showMetadata && children && (
        <div style={styles.metadataContainer}>{children}</div>
      )}
    </div>
  );
};

const styles = {
  title: {
    fontWeight: "bold",
  },
  metadataContainer: {
    //maxHeight: "200px",
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

export default ToggleablePanel;
