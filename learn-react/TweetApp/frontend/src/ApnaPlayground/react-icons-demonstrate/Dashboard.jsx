import React, { useMemo, useState, useRef, useEffect } from "react";
import Tree from "../../common/components/tree-viewer/TreeViewer";
import styles from "./styles.module.css";
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
    <div className={styles.container}>
      <h1 className={styles.header}>
        Dashboard: {selectedIcon?.name || "Select an icon"}
      </h1>
      <div className={styles.content}>
        <div className={styles.treeContainer}>
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
        <div className={styles.iconDisplay}>
          {selectedIcon ? (
            <>
              <IconComponent className={styles.icon} />
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  onClick={() => handleNavigation(-1)}
                  disabled={selectedIndex < 0}
                >
                  Prev
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleNavigation(1)}
                  disabled={selectedIndex > iconFamily.length - 1}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            "Please select an icon"
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactIconsDemonstrateDashboard;
