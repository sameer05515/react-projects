import React from "react";
import EditableLabel from "../common/EditableLabel";

function Tweet({
  tweet,
  handleUpdateTweet,
  handleUpdateComment,
  handleUpdateNestedComment,
  handleAddComment,
  handleAddNestedComment,
  formatTimestamp,
  newCommentText,
  setNewCommentText,
}) {
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
          <div key={comment._id} className="comment">
            <p className="timestamp">{formatTimestamp(comment.createdAt)}</p>
            <EditableLabel
              text={comment.text}
              postUpdateClick={(updatedText) =>
                handleUpdateComment(tweet._id, comment._id, updatedText)
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
                  onBlur={(e) =>
                    handleAddNestedComment(
                      tweet._id,
                      comment._id,
                      e.target.value
                    )
                  }
                />
              </div>
              {comment.nestedComments.map((nestedComment) => (
                <div key={nestedComment._id} className="nested-comment">
                  <p className="timestamp">
                    {formatTimestamp(nestedComment.createdAt)}
                  </p>
                  <EditableLabel
                    text={nestedComment.text}
                    style={{
                      fontStyle: "italic", // Apply italic style for nested comment
                      fontSize: "14px", // Set font size for nested comment
                    }}
                    postUpdateClick={(updatedText) =>
                      handleUpdateNestedComment(
                        tweet._id,
                        comment._id,
                        nestedComment._id,
                        updatedText
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tweet;
