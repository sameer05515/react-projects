import React, { useState } from "react";

function CreateComment({
  tweetId,
  handleAddComment,
}) {
    const [newCommentText, setNewCommentText] = useState(""); // State to hold the new comment text
  return (
    <div className="mb-4">
      <textarea
        placeholder="Enter a new comment"
        onBlur={(e) => {
          handleAddComment(tweetId, e.target.value);
          setNewCommentText("");
        }}
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[60px]"
      />
    </div>
  );
}

export default CreateComment;
