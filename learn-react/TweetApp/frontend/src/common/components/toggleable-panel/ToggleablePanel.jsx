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
    <div style={panelContainerStyle} className="mb-4">
      <ToggleableIcon
        isContentVisible={showMetadata}
        onToggle={toggleMetadataVisibility}
        additionalStyleForIcon={{ fontWeight: "bold" }}
      />
      <span className="font-bold">{title}</span>

      {showMetadata && children && (
        <div className="max-w-[90vw] overflow-auto p-2.5 gap-2.5 border border-gray-300 rounded-md bg-gray-50 my-5 mx-1.5">
          {children}
        </div>
      )}
    </div>
  );
};

export default ToggleablePanel;
