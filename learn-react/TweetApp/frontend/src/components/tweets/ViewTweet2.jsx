import React from "react";
import EditableLabel from '../../common/components/editable-label/EditableLabel';
import Comment from "./ViewComment"; // Import the Comment component
import NewComment from "./CreateComment2";

function Tweet({
  tweet,
  handleUpdateTweet,
  handleAddComment,
  handleAddNestedComment,
  handleUpdateComment, // Make sure this function is imported and available
  handleUpdateNestedComment, // Make sure this function is imported and available
  formatTimestamp,
}) {
  
  return (
    <div key={tweet._id} className="bg-white border border-gray-200 p-4 mb-5 rounded-lg shadow-sm">
      <p className="text-xs text-gray-500 mb-3">{formatTimestamp(tweet.createdAt)}</p>
      <EditableLabel
        text={tweet.content}
        postUpdateClick={(updatedContent) =>
          handleUpdateTweet(tweet._id, updatedContent)
        }
        labelStyle={{
          fontWeight: "bold",
          fontSize: "18px",
        }}
        className="font-bold text-lg"
      />

      <div className="mt-4 space-y-4">
        <NewComment
          tweetId={tweet._id}
          handleAddComment={handleAddComment}          
        />
        {tweet.comments.map((comment) => (
          <Comment
            key={comment._id}
            tweetId={tweet._id}
            comment={comment}
            handleUpdateComment={handleUpdateComment}
            handleAddNestedComment={handleAddNestedComment}
            handleUpdateNestedComment={handleUpdateNestedComment}
            formatTimestamp={formatTimestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default Tweet;
