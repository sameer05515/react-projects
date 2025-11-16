import React from "react";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
// import ReactHtmlParser from "react-html-parser";
import TaskCard from "./TaskCard";

const ViewTask = ({ task, onClose, }) => {
  
  const modalStyle = {};

  // const modalContentStyle = {
  //   background: "white",
  //   padding: "20px",
  //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  //   zIndex: "1001", // Ensure modal content appears on top of the mask
  // };

  const modalContentStyle = {};

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
      <div className="z-[1001] max-h-[80vh] overflow-y-auto rounded-md bg-white p-5 shadow-xl">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">View Task</h3>        
        <TaskCard task={task}/>
        <div className="mt-2 text-right">
          <CustomButton onClick={onClose} label="Close">
            Close
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
