import React, { useMemo, useState } from "react";
import * as ReactIconsFA from "react-icons/fa";
import Tree from "../../../common/components/tree-viewer/TreeViewer";
import styles from "./styles.module.css";

// Safely fetch icon components by name
const getIcon = (name = "FaQuestionCircle") =>
  ReactIconsFA[name] || ReactIconsFA.FaQuestionCircle;

const iconFamily = Object.keys(ReactIconsFA).map((n, idx) => ({
  uniqueId: `ReactIconsFA_${idx + 1}_${n}`,
  name: n,
}));

const ReactIconsDemonstrateDashboard = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const IconComponent = useMemo(() => {
    return selectedIcon ? getIcon(selectedIcon.name) : null;
  }, [selectedIcon]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Dashboard</h1>
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
            <IconComponent className={styles.icon} />
          ) : (
            "Please select an icon"
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactIconsDemonstrateDashboard;
