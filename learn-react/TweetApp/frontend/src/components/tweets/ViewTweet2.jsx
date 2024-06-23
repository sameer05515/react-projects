import React from "react";
import EditableLabel from '../../common/components/EditableLabel';
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
    <div key={tweet._id} className="tweet-card">
      <p className="timestamp">{formatTimestamp(tweet.createdAt)}</p>
      <EditableLabel
        text={tweet.content}
        postUpdateClick={(updatedContent) =>
          handleUpdateTweet(tweet._id, updatedContent)
        }
        labelStyle={{
          fontWeight: "bold", // Apply bold style for tweet
          fontSize: "18px", // Set font size for tweet
        }}
      />

      <div className="comments-section">
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
