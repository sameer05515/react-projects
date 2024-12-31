import React from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
// import ReactHtmlParser from "react-html-parser";
import TaskCard from "./TaskCard";

const ViewTask = ({ task, onClose, }) => {
  
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
        <TaskCard task={task}/>
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
