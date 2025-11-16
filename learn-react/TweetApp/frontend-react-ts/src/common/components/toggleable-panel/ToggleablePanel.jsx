import React, { useEffect, useState } from "react";
import ToggleableIcon from "../toggleable-icon/ToggleableIcon";

const ToggleablePanel = ({
  title = "",
  children,
  showContent: initialValueToShowMetadata = false,
  className = "",
  contentClassName = "",
}) => {
  const [showMetadata, setShowMetadata] = useState(initialValueToShowMetadata);
  useEffect(() => {
    setShowMetadata(initialValueToShowMetadata);
  }, [initialValueToShowMetadata]);

  const toggleMetadataVisibility = () => setShowMetadata((prev) => !prev);
  return (
    <div className={`mb-4 rounded border border-gray-200 bg-white p-3 shadow-sm ${className}`}>
      <div className="mb-2 flex items-center gap-2">
        <ToggleableIcon
          isContentVisible={showMetadata}
          onToggle={toggleMetadataVisibility}
          iconClassName="font-bold"
        />
        <span className="font-bold text-gray-900">{title}</span>
      </div>

      {showMetadata && children && (
        <div className={`my-4 max-w-[90vw] gap-2.5 overflow-auto rounded-md border border-gray-100 bg-gray-50 p-4 ${contentClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default ToggleablePanel;
