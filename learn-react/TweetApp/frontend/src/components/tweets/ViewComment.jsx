import React from "react";
import EditableLabel from "../../common/components/EditableLabel";
import NestedComment from "./ViewNestedComment";
import NewNestedComment from './CreateNestedComment'

function Comment({
  tweetId,
  comment,
  handleUpdateComment,
  handleAddNestedComment,
  handleUpdateNestedComment,
  formatTimestamp,
}) {
  
  return (
    <div key={comment._id} className="comment">
      <p className="timestamp">{formatTimestamp(comment.createdAt)}</p>
      <EditableLabel
        text={comment.text}
        postUpdateClick={(updatedText) =>
          handleUpdateComment(tweetId, comment._id, updatedText)
        }
        labelStyle={{
          fontWeight: "normal", // Apply normal style for comment
          fontSize: "16px", // Set font size for comment
        }}
      />
      <div className="nested-comments">        
        <NewNestedComment
          tweetId={tweetId}
          commentId={comment._id}
          handleAddNestedComment={handleAddNestedComment}          
        />
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
