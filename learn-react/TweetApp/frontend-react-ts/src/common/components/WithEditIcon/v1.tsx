import { FaEdit } from "react-icons/fa";

const ICON_POSITION_MAP = {
  "top-right": "top-2 right-2",
  "top-left": "top-2 left-2",
};

const WithEditIconBase = ({
  className = "",
  children,
  showEditIcon = false,
  editIconTitle = "",
  onEditIconClick = () => {},
  iconPosition = "top-right",
}) => (
  <div className={`relative group flex items-start ${className}`}>
    {children}
    {showEditIcon && (
      <button
        type="button"
        title={editIconTitle || ""}
        className={`absolute hidden rounded-full p-1.5 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 group-hover:flex ${ICON_POSITION_MAP[iconPosition] || ICON_POSITION_MAP["top-right"]}`}
        onClick={onEditIconClick}
      >
        <FaEdit size={18} />
      </button>
    )}
  </div>
);

const WithEditIconV1 = (props) => <WithEditIconBase {...props} iconPosition="top-right" />;

export default WithEditIconV1;
export { WithEditIconBase };