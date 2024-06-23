import React from "react";
import HtmlTextRendrer from "../../../common/components/HtmlTextRenderer";
import RatingComponent from "../../../common/components/RatingComponent";
import { SmartPreviewer } from "../../../common/components/smart-editor/SmartEditorV3";
import { styles } from "../common/util";
import CustomButton from "../../../common/components/CustomButton";
import ToggleablePanel from "../../../common/components/ToggleablePanel";

const tagStyle = {
  backgroundColor: "#ccc", // Grey background color
  border: "1px solid #999", // Grey border
  padding: "2px 5px", // Adjust padding as needed
  fontSize: "12px", // Small font size
  borderRadius: "4px", // Rounded corners
};

const AnswerCard = ({ answer: ansObj, style = {}, onUpdateAnswerClick = () => { }, showContent }) => {
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          margin: "5px",
          ...style,
        }}
      >
        <div>
          {/* <div style={styles.datesStyle}>
            <span style={{ marginRight: "10px" }}>
              <strong>Rating:</strong> {ansObj.rating}
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Unique ID:</strong> {ansObj.uniqueId}
            </span>
            <span style={{ marginRight: "10px" }}>
              <RatingComponent rating={ansObj.rating} />
            </span>
          </div> */}

          <RatingComponent rating={ansObj.rating} />
          <div style={{ margin: "10px 0" }}>
            <CustomButton
              style={{ ...tagStyle, marginRight: "10px" }}
              onClick={() => { onUpdateAnswerClick && onUpdateAnswerClick(ansObj) }}
            >
              Edit
            </CustomButton>
          </div>

          {/* <span>
            <HtmlTextRendrer htmlString={ansObj.name + "..."} />
          </span> */}
          <ToggleablePanel title={ansObj.name + "..."} showContent={showContent && showContent===true}>
            <div
              style={{
                border: "1px solid #999", // Grey border
                padding: "2px 5px", // Adjust padding as needed
                borderRadius: "4px",
                marginBottom: "10px",
                width: "67vw",
                overflow: "auto",
              }}
            >
              {ansObj.smartContent && (
                <SmartPreviewer data={ansObj.smartContent} />
              )}
            </div>
          </ToggleablePanel>

        </div>
      </div>
    </>
  );
};

export default AnswerCard;
