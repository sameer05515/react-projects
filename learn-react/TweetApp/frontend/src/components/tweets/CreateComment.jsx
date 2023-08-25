import React, { useState } from "react";

function CreateComment({
  tweetId,
  handleAddComment,
}) {
    const [newCommentText, setNewCommentText] = useState(""); // State to hold the new comment text
  return (
    <div>
      <textarea
        placeholder="Enter a new comment"
        onBlur={(e) => {
          handleAddComment(tweetId, e.target.value);
          setNewCommentText(""); // Reset the new comment text after adding
        }}
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
      />
    </div>
  );
}

export default CreateComment;
