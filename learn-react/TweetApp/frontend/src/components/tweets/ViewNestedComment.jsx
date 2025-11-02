import React from "react";
import EditableLabel from "../../common/components/editable-label/EditableLabel";

function NestedComment({
  tweetId,
  commentId,
  nestedComment,
  handleUpdateNestedComment,
  formatTimestamp,
}) {
  return (
    <div key={nestedComment._id} className="mt-2.5 pl-10 border-l-2 border-gray-400">
      <p className="text-xs text-gray-500 mb-2">{formatTimestamp(nestedComment.createdAt)}</p>
      <EditableLabel
        text={nestedComment.text}
        labelStyle={{
          fontStyle: "italic",
          fontSize: "14px",
        }}
        className="italic text-sm"
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
