import React from "react";
import "./list-tweets3.css";
import EditableLabel from "../common/EditableLabel";
import CreateTweet from "./CreateTweet";
import GlobalConstants from "../../common/globalConstants";

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}

function ListTweetsUpdate({
  tweets,
  onUpdate = () => {},
  refreshFunction = () => {},
  handleTweetCreated = () => {},
}) {
    const BASE_URL=GlobalConstants.tweetsApplicationBaseURL;
  const handleUpdateTweet = async (tweetId, updatedContent) => {
    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: updatedContent }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        refreshFunction();
      }
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  const handleUpdateComment = async (tweetId, commentId, updatedText) => {
    try {
      const response = await fetch(
        `${BASE_URL}/tweets/${tweetId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: updatedText }),
        }
      );

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        refreshFunction();
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleUpdateNestedComment = async (
    tweetId,
    commentId,
    nestedCommentId,
    updatedText
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/tweets/${tweetId}/comments/${commentId}/nested/${nestedCommentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: updatedText }),
        }
      );

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        refreshFunction();
      }
    } catch (error) {
      console.error("Error updating nested comment:", error);
    }
  };

  const handleAddComment = async (tweetId, newCommentText) => {
    if (newCommentText.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/tweets/${tweetId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newCommentText }),
        }
      );

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        refreshFunction();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddNestedComment = async (
    tweetId,
    commentId,
    newNestedCommentText
  ) => {
    if (newNestedCommentText.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/tweets/${tweetId}/comments/${commentId}/nested`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newNestedCommentText }),
        }
      );

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        refreshFunction();
      }
    } catch (error) {
      console.error("Error adding nested comment:", error);
    }
  };

  return (
    <div>
      <h2>Tweets</h2>
      <CreateTweet onTweetCreated={handleTweetCreated} />
      {tweets.map((tweet) => (
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
                <p className="timestamp">
                  {formatTimestamp(comment.createdAt)}
                </p>
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
      ))}
    </div>
  );
}

export default ListTweetsUpdate;
