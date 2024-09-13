import { CSSProperties } from "react";
// import { colorCodes } from "./color-codes";
const courseGoalCard: CSSProperties = {
  border: "1px solid #000",
  marginBottom: "50px",
  textAlign: "left",
  borderRadius: "8px",
  padding: "2px 4px",
  // backgroundColor: colorCodes.Aqua,
};

const buttonStyle: CSSProperties = {
  backgroundColor: "#4CAF50", // Green background
  border: "none", // Remove borders
  color: "white", // White text
  padding: "2px 4px", // Add padding
  textAlign: "center", // Center text
  textDecoration: "none", // Remove underline
  display: "inline-block", // Inline element
  fontSize: "10px", // Set font size
  margin: "8px 2px", // Add margin
  cursor: "pointer", // Pointer/hand icon on hover
  borderRadius: "4px", // Rounded corners
  transition: "background-color 0.3s ease", // Smooth background transition
};

const buttonHoverStyle: CSSProperties = {
  backgroundColor: "#45a049", // Darker green on hover
};

const whitespacePreWrap = { whiteSpace: "pre-wrap" };

export { courseGoalCard, buttonStyle, buttonHoverStyle, whitespacePreWrap };
