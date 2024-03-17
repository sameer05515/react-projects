import React, { useState } from "react";
import GlobalConstants from "../../common/globalConstants";
import CustomButton from "../common/CustomButton";

function UpdateTweet({ tweet, onUpdate }) {
  const [content, setContent] = useState(tweet.content);
  const [newComment, setNewComment] = useState("");
  const [newNestedComment, setNewNestedComment] = useState("");
  const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;

  const handleUpdateTweet = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweet._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
      }
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  const handleUpdateComment = async (commentId, updatedText) => {
    try {
      const response = await fetch(
        `${BASE_URL}/tweets/${tweet._id}/comments/${commentId}`,
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
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweet._id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddNestedComment = async (commentId) => {
    if (newNestedComment.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/tweets/${tweet._id}/comments/${commentId}/nested`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newNestedComment }),
        }
      );

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        setNewNestedComment("");
        setSelectedCommentId(null);
      }
    } catch (error) {
      console.error("Error adding nested comment:", error);
    }
  };

  return (
    <div>
      <h2>Update Tweet</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Update your tweet content"
      />
      <button onClick={handleUpdateTweet}>Update Tweet</button>
      <h3>Comments</h3>
      {tweet.comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          <textarea
            value={comment.text}
            onChange={(e) => {
              const updatedText = e.target.value;
              handleUpdateComment(comment._id, updatedText);
            }}
          />
          <div>
            <textarea
              value={newNestedComment}
              onChange={(e) => setNewNestedComment(e.target.value)}
              placeholder="Enter a nested comment"
            />
            <CustomButton onClick={() => handleAddNestedComment(comment._id)}>
              Add Nested Comment
            </CustomButton>
          </div>
        </div>
      ))}
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter a new comment"
        />
        <CustomButton onClick={handleAddComment}>Add Comment</CustomButton>
      </div>
    </div>
  );
}

export default UpdateTweet;
