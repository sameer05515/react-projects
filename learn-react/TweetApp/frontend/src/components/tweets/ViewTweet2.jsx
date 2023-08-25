import React from "react";
import EditableLabel from "../common/EditableLabel";
import Comment from "./ViewComment"; // Import the Comment component
import { useState } from "react";

function Tweet({
    tweet,
    handleUpdateTweet,
    handleAddComment,
    handleAddNestedComment,
    handleUpdateComment, // Make sure this function is imported and available
    handleUpdateNestedComment, // Make sure this function is imported and available
    formatTimestamp,
    newCommentText,
    setNewCommentText,
}) {
  const [newNestedCommentText, setNewNestedCommentText] = useState(""); // State to hold the new comment text
  return (
    <div key={tweet._id} className="tweet-card">
      <p className="timestamp">{formatTimestamp(tweet.createdAt)}</p>
      <EditableLabel
        text={tweet.content}
        postUpdateClick={(updatedContent) =>
          handleUpdateTweet(tweet._id, updatedContent)
        }
        style={{
          fontWeight: "bold", // Apply bold style for tweet
          fontSize: "18px", // Set font size for tweet
        }}
      />

      <div className="comments-section">
        <div>
          <textarea
            placeholder="Enter a new comment"
            onBlur={(e) => {
              handleAddComment(tweet._id, e.target.value);
              setNewCommentText(""); // Reset the new comment text after adding
            }}
            value={newCommentText} // Use the state value for the textarea value
            onChange={(e) => setNewCommentText(e.target.value)} // Update the state as you type
          />
        </div>
        {tweet.comments.map((comment) => (
          <Comment
            key={comment._id}
            tweetId={tweet._id}
            comment={comment}
            handleUpdateComment={handleUpdateComment}
            handleAddNestedComment={handleAddNestedComment}
            handleUpdateNestedComment={handleUpdateNestedComment}
            formatTimestamp={formatTimestamp}            
            newNestedCommentText={newNestedCommentText} // Pass the new comment text as a prop
            setNewNestedCommentText={setNewNestedCommentText} // Pass the setter function as a prop
          />
        ))}
      </div>
    </div>
  );
}

export default Tweet;
