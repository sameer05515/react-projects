import { CSSProperties, FC, memo } from "react";

const defaultToggleSymbols = {
  showSymbol: "+",
  hideSymbol: "-",
};

interface ToggleableIconProps {
  label?: string; // Optional label for the toggle
  isContentVisible?: boolean; // State to determine if the content is visible
  onToggle?: () => void; // Callback for the toggle action
  toggleSymbols?: {
    showSymbol?: string;
    hideSymbol?: string;
  }; // Custom symbols for toggling
  additionalStyleForIcon?: CSSProperties; // Additional styles for the icon
  additionalStyleForContainer?: CSSProperties; // Additional styles for the container
}

const ToggleableIcon: FC<ToggleableIconProps> = memo(
  ({
    label = "",
    isContentVisible = false,
    onToggle,
    toggleSymbols,
    additionalStyleForIcon = {},
    additionalStyleForContainer = {},
  }) => {
    const handleToggle = () => onToggle && onToggle();

    const icon = isContentVisible
      ? toggleSymbols?.hideSymbol || defaultToggleSymbols.hideSymbol
      : toggleSymbols?.showSymbol || defaultToggleSymbols.showSymbol;

    const title = isContentVisible ? `Hide ${label}` : `Show ${label}`;

    return (
      <span
        title={title}
        style={{ ...styles.iconContainer, ...additionalStyleForContainer }}
        onClick={handleToggle}
      >
        <span style={{ ...styles.icon, ...additionalStyleForIcon }}>
          {icon}
        </span>
      </span>
    );
  }
);

const styles: Record<string, CSSProperties> = {
  iconContainer: {
    marginRight: "10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  icon: {
    margin: "3px",
  },
};

export default ToggleableIcon;
