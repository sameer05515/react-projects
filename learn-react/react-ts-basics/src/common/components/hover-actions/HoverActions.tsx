import { useMemo, useState, FC, ReactNode } from "react";
import styles from "./HoverActions.module.css";

interface HoverActionsProps {
  actions?: ReactNode[]; // Optional array of strings for actions
  title?: string; // Optional title
}

const defaultActions = ["Action 1", "Action 2", "Action 3"];

const HoverActions: FC<HoverActionsProps> = ({ actions = [], title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const calculatedActions = useMemo(() => {
    return actions.length > 0 ? actions : defaultActions;
  }, [actions]);

  const calculatedTitle = useMemo(() => {
    return title || "Select Action";
  }, [title]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.container}
    >
      <span title={`Actions: Total Actions ${calculatedActions.length}`}>
        {calculatedTitle}
      </span>
      {isHovered && (
        <div className={styles.actionsDropdown}>
          {calculatedActions.map((action, index) => (
            <span key={index} className={styles.actionItem}>
              {action}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoverActions;
