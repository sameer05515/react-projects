import * as ReactIconsFA from "react-icons/fa";
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

const getIconComponent = (selectedIcon) =>
  selectedIcon ? getIcon(selectedIcon.name) : null;

const getSelectedIndex = (selectedIcon) =>
  selectedIcon ? findIndexByUniqueId(iconFamily, selectedIcon.uniqueId) : -1;

const TreeNode = ({ node, setSelectedIcon, isSelected, refNode }) => (
  <span
    ref={refNode}
    className={`${styles.treeNode} ${isSelected ? styles.selectedNode : ""}`}
    onClick={() => setSelectedIcon(node)}
  >
    {node.name}
  </span>
);

export {
  getIcon,
  findIndexByUniqueId,
  iconFamily,
  iconFamilyLength,
  getIconComponent,
  getSelectedIndex,
  TreeNode,
};
