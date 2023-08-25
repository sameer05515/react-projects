import React from "react";
import CustomButton from "../common/CustomButton";
import ReactHtmlParser from "react-html-parser";
import TaskCard from "./TaskCard";

const ViewTask = ({ task, onClose, tags = [] }) => {
  const filteredTags = task.tags?.map((tagId) =>
    tags.find((tag) => tag.tagId === tagId)
  );
  const tagStyle = {
    backgroundColor: "#ccc", // Grey background color
    border: "1px solid #999", // Grey border
    padding: "2px 5px", // Adjust padding as needed
    fontSize: "12px", // Small font size
    borderRadius: "4px", // Rounded corners
  };
  const modalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000", // Adjust as needed
  };

  // const modalContentStyle = {
  //   background: "white",
  //   padding: "20px",
  //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  //   zIndex: "1001", // Ensure modal content appears on top of the mask
  // };

  const modalContentStyle = {
    background: "white",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    zIndex: "1001", // Ensure modal content appears on top of the mask
    maxHeight: "80vh", // Set a maximum height to trigger scrolling if the content exceeds it
    overflowY: "auto", // Enable vertical scrolling when the content overflows
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3>View Task</h3>
        {/* <strong>ID:</strong> {task.id}
        <br />
        <strong>Unique ID:</strong> {task.uniqueId}
        <br />
        <strong>Title:</strong> {task.title}
        <br />
        <div>{ReactHtmlParser(task.description || "")}</div>
        <strong>Created Date:</strong> {task.createdDate}
        <br />
        <strong>Updated Date:</strong> {task.updatedDate}
        <br />
        {filteredTags.map(
          (tag) =>
            tag && (
              <span style={tagStyle} key={tag._id}>
                {tag.name}
              </span>
            )
        )} */}
        <TaskCard task={task} tags={tags}/>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <CustomButton onClick={onClose} label="Close">
            Close
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
