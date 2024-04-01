import React, { useState } from "react";
import EditableLabel from "../../common/components/EditableLabel"; // Import the EditableLabel component

function CreateComment({ tweetId, handleAddComment }) {
  const [newCommentText, setNewCommentText] = useState(""); // State to hold the new comment text

  const handleCommentBlur = (updatedText) => {
    if (updatedText.trim() === "") {
      return;
    }
    handleAddComment(tweetId, updatedText);
    setNewCommentText(""); // Reset the new comment text after adding
  };

  return (
    <div>
      <EditableLabel
        text={newCommentText}
        postUpdateClick={handleCommentBlur}
        placeholder="Enter a new comment"
        editMode={false}
        submitButtonText="Save"
        flushSavedText={true}
      />
    </div>
  );
}

export default CreateComment;
