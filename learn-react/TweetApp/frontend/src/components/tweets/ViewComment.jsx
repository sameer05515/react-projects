import React from "react";
import EditableLabel from "../common/EditableLabel";
import NestedComment from "./ViewNestedComment";
import { useState } from "react";

function Comment({
  tweetId,
  comment,
  handleUpdateComment,
  handleAddNestedComment,
  handleUpdateNestedComment,
  formatTimestamp,
//   newNestedCommentText,
//   setNewNestedCommentText
}) {
    const [newNestedCommentText, setNewNestedCommentText] = useState(""); // State to hold the new comment text
  return (
    <div key={comment._id} className="comment">
      <p className="timestamp">{formatTimestamp(comment.createdAt)}</p>
      <EditableLabel
        text={comment.text}
        postUpdateClick={(updatedText) =>
          handleUpdateComment(tweetId, comment._id, updatedText)
        }
        style={{
          fontWeight: "normal", // Apply normal style for comment
          fontSize: "16px", // Set font size for comment
        }}
      />
      <div className="nested-comments">
        <div>
          <textarea
            placeholder="Enter a nested comment"
            onBlur={(e) =>{
                handleAddNestedComment(tweetId, comment._id, e.target.value)
              setNewNestedCommentText(""); // Reset the new comment text after adding
            }}
            value={newNestedCommentText} // Use the state value for the textarea value
            onChange={(e) => setNewNestedCommentText(e.target.value)} // Update the state as you type
          />
        </div>
        {comment.nestedComments.map((nestedComment) => (
          <NestedComment
            key={nestedComment._id}
            tweetId={tweetId}
            commentId={comment._id}
            nestedComment={nestedComment}
            handleUpdateNestedComment={handleUpdateNestedComment}
            formatTimestamp={formatTimestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default Comment;
