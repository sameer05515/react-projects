import React, { useMemo, useState, useRef, useEffect } from "react";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import {
  iconFamily,
  iconFamilyLength,
  getIconComponent,
  getSelectedIndex,
  TreeNode
} from "./utils";



const ReactIconsDemonstrateDashboard = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const selectedRef = useRef(null);

  const selectedIndex = useMemo(() => {
    return getSelectedIndex(selectedIcon);
  }, [selectedIcon]);

  const IconComponent = useMemo(() => {
    return getIconComponent(selectedIcon);
  }, [selectedIcon]);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedIcon]);

  const handleNavigation = (increment = 0) => {
    if (selectedIndex >= 0) {
      setSelectedIcon(
        iconFamily[
          (selectedIndex + iconFamilyLength + increment) % iconFamilyLength
        ]
      );
    }
  };

  return (
    <div className="mx-auto my-6 max-w-6xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h1 className="mb-4 text-lg font-semibold text-gray-900">
        Dashboard: {selectedIcon?.name || "Select an icon"}
      </h1>
      <div className="flex gap-4">
        <div className="w-80 flex-shrink-0 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <Tree
            data={iconFamily}
            renderNode={(node) => (
              <TreeNode
                node={node}
                setSelectedIcon={setSelectedIcon}
                isSelected={selectedIcon?.uniqueId === node.uniqueId}
                refNode={
                  selectedIcon?.uniqueId === node.uniqueId ? selectedRef : null
                }
              />
            )}
          />
        </div>
        <div className="flex min-h-[240px] flex-1 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-6">
          {selectedIcon ? (
            <>
              <IconComponent className="mb-4 h-24 w-24 text-blue-600" />
              <div className="flex gap-2">
                <button
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handleNavigation(-1)}
                  disabled={selectedIndex < 0}
                >
                  Prev
                </button>
                <button
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handleNavigation(1)}
                  disabled={selectedIndex > iconFamily.length - 1}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <span className="text-sm text-gray-600">Please select an icon</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactIconsDemonstrateDashboard;
