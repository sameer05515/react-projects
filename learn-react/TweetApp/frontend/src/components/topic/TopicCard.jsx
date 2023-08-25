import React from "react";
import { formatDateToDDMMMYYYY } from "../../common/commonService";
import ReactHtmlParser from "react-html-parser";

const TopicCard = ({ topic, tags = [] }) => {
  const filteredTags = topic.tags?.map((tagId) =>
    tags.find((tag) => tag.tagId === tagId)
  );

  const tagStyle = {
    backgroundColor: "#ccc", // Grey background color
    border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
  };

  const datesStyle = {
    padding: "10px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
    margin: "10px",
  };

  return (
    <>
      <p style={{ display: "flex", alignItems: "center" }}>
        <strong>{topic.name}</strong>
        <div style={datesStyle}>
          <span style={{ marginRight: "10px" }}>
            <b>Occurred:</b> {formatDateToDDMMMYYYY(topic.occurenceDate)}
          </span>
          <span style={{ marginRight: "10px" }}>
            <b>Created:</b> {formatDateToDDMMMYYYY(topic.createdDate)}
          </span>
          <span>
            <b>Last updated:</b> {formatDateToDDMMMYYYY(topic.updatedDate)}
          </span>
        </div>
      </p>
      {/* <p style={{ whiteSpace: "pre-line" }}>{topic.description}</p> */}
      <div>{ReactHtmlParser(topic.description || "")}</div>
      {filteredTags.map(
        (tag) =>
          tag && (
            <span style={tagStyle} key={tag._id}>
              {tag.name}
            </span>
          )
      )}
    </>
  );
};

export default TopicCard;
