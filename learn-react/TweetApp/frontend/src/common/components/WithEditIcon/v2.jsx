import styles from "./styles.v2.module.css";
import { FaEdit } from "react-icons/fa";

const WithEditIconV2 = ({
  className = "",
  children,
  showEditIcon = false,
  editIconTitle = "",
  onEditIconClick = () => {},
}) => (
  <div className={`${className} ${styles.listItem}`}>
    {children}
    {showEditIcon && (
      <span title={editIconTitle || ""} className={styles.editIcon} onClick={onEditIconClick} role="button">
        <FaEdit size={18} />
      </span>
    )}
  </div>
);

export default WithEditIconV2;
