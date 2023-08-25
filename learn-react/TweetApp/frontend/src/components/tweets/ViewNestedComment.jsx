import React from "react";
import EditableLabel from "../common/EditableLabel";

function NestedComment({
  tweetId,
  commentId,
  nestedComment,
  handleUpdateNestedComment,
  formatTimestamp,
}) {
  return (
    <div key={nestedComment._id} className="nested-comment">
      <p className="timestamp">{formatTimestamp(nestedComment.createdAt)}</p>
      <EditableLabel
        text={nestedComment.text}
        style={{
          fontStyle: "italic", // Apply italic style for nested comment
          fontSize: "14px", // Set font size for nested comment
        }}
        postUpdateClick={(updatedText) =>
          handleUpdateNestedComment(
            tweetId,
            commentId,
            nestedComment._id,
            updatedText
          )
        }
      />
    </div>
  );
}

export default NestedComment;
