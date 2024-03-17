import React, { useState } from "react";
import EditableLabel from "../common/EditableLabel";

function CreateNestedComment({
  tweetId,
  commentId,
  handleAddNestedComment,
}) {
  const [newNestedCommentText, setNewNestedCommentText] = useState(""); // State to hold the new comment text
  const handleCommentBlur = (updatedText) => {
    if (updatedText.trim() === "") {
      return;
    }
    handleAddNestedComment(tweetId, commentId, updatedText);
    setNewNestedCommentText(""); // Reset the new comment text after adding
  };
  return (
    <div>
      <EditableLabel
        text={newNestedCommentText}
        postUpdateClick={handleCommentBlur}
        placeholder="Enter a new nested comment"
        editMode={false}
        submitButtonText="Save"
        flushSavedText={true}
      />
    </div>
  );
}

export default CreateNestedComment;
