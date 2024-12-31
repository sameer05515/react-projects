import React, { useMemo, useState } from "react";
import * as ReactIconsFA from "react-icons/fa";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import styles from "./styles.module.css";

// Utility to fetch icon by name
const getIcon = (name = "FaQuestionCircle") =>
  ReactIconsFA[name] || ReactIconsFA.FaQuestionCircle;

// Utility to calculate index by uniqueId
const findIndexByUniqueId = (data, uniqueId) =>
  data.findIndex((item) => item.uniqueId === uniqueId);

const iconFamily = Object.keys(ReactIconsFA).map((n, idx) => ({
  uniqueId: `ReactIconsFA_${idx + 1}_${n}`,
  name: n,
}));

const iconFamilyLength = iconFamily.length;

const ReactIconsDemonstrateDashboard = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const selectedIndex = useMemo(() => {
    return selectedIcon
      ? findIndexByUniqueId(iconFamily, selectedIcon.uniqueId)
      : -1;
  }, [selectedIcon]);

  const IconComponent = useMemo(() => {
    return selectedIcon ? getIcon(selectedIcon.name) : null;
  }, [selectedIcon]);

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIcon(
        iconFamily[(selectedIndex + iconFamilyLength - 1) % iconFamilyLength]
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex < iconFamily.length - 1) {
      setSelectedIcon(
        iconFamily[(selectedIndex + iconFamilyLength + 1) % iconFamilyLength]
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Dashboard: {selectedIcon?.name}</h1>
      <div className={styles.content}>
        <div className={styles.treeContainer}>
          <Tree
            data={iconFamily}
            renderNode={(node) => (
              <span onClick={() => setSelectedIcon(node)}>{node.name}</span>
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
                  onClick={handlePrev}
                  disabled={selectedIndex <= 0}
                >
                  Prev
                </button>
                <button
                  className={styles.button}
                  onClick={handleNext}
                  disabled={selectedIndex >= iconFamily.length - 1}
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
