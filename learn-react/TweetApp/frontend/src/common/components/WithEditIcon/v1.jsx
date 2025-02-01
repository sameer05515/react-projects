import styles from "./styles.v1.module.css";
import { FaEdit } from "react-icons/fa";


/**
 *  **Purpose** : to show an edit icon on hover of children
 * 
 * However, later we realized , the edit-icon is always showing on top-right corner only.
 * 
 * We are trying to fix this in next [v2](./v2.jsx) version
*/
const WithEditIconV1 = ({
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

export default WithEditIconV1;