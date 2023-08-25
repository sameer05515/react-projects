import React from 'react';
import ReactHtmlParser from "react-html-parser";

const TaskCard = ({task, tags = [] }) => {
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
  return (
    <div>
    <strong>ID:</strong> {task.id}
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
        )}
      
    </div>
  )
}

export default TaskCard
