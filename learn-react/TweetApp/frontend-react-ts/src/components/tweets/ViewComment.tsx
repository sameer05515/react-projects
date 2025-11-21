import React from "react";
import EditableLabel from "../../common/components/editable-label/EditableLabel";
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
    <div key={comment._id} className="mt-2.5 pl-5 border-l-2 border-gray-300">
      <p className="text-xs text-gray-500 mb-2">{formatTimestamp(comment.createdAt)}</p>
      <EditableLabel
        text={comment.text}
        postUpdateClick={(updatedText) =>
          handleUpdateComment(tweetId, comment._id, updatedText)
        }
        labelStyle={{
          fontWeight: "normal",
          fontSize: "16px",
        }}
        className="font-normal text-base"
      />
      <div className="mt-2.5 space-y-2">        
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
