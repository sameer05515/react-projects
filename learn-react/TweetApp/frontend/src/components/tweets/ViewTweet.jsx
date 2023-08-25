import React from "react";
import EditableLabel from "../common/EditableLabel";

function Tweet({
  tweet,
  handleUpdateTweet,
  handleUpdateComment,
  handleUpdateNestedComment,
  handleAddComment,
  handleAddNestedComment,
  formatTimestamp
}) {
  return (
    <div key={tweet._id} className="tweet-card">
      <p className="timestamp">{formatTimestamp(tweet.createdAt)}</p>
      <EditableLabel
        text={tweet.content}
        postUpdateClick={(updatedContent) =>
          handleUpdateTweet(tweet._id, updatedContent)
        }
      />

      <div className="comments-section">
        <div>
          <textarea
            placeholder="Enter a new comment"
            onBlur={(e) => handleAddComment(tweet._id, e.target.value)}
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
