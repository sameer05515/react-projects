import React, { useState } from "react";
import GlobalConstants from "../../common/constants/globalConstants";
import CustomButton from "../../common/components/custom-button/CustomButton";

function UpdateTweet({ tweet, onUpdate }) {
  const [content, setContent] = useState(tweet.content);
  const [newComment, setNewComment] = useState("");
  const [newNestedComment, setNewNestedComment] = useState("");
  const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;

  const handleUpdateTweet = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tweets/v1/${tweet._id}`, {
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
        `${BASE_URL}/tweets/v1/${tweet._id}/comments/${commentId}`,
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
      const response = await fetch(`${BASE_URL}/tweets/v1/${tweet._id}/comments`, {
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
        `${BASE_URL}/tweets/v1/${tweet._id}/comments/${commentId}/nested`,
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
      }
    } catch (error) {
      console.error("Error adding nested comment:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Update Tweet</h2>
      <div className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Update your tweet content"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[100px]"
        />
      </div>
      <div className="mb-6">
        <CustomButton 
          onClick={handleUpdateTweet}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Update Tweet
        </CustomButton>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Comments</h3>
      <div className="space-y-4 mb-6">
        {tweet.comments.map((comment) => (
          <div key={comment._id} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
            <p className="mb-2 text-gray-700">{comment.text}</p>
            <textarea
              value={comment.text}
              onChange={(e) => {
                const updatedText = e.target.value;
                handleUpdateComment(comment._id, updatedText);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[80px] mb-3"
            />
            <div className="space-y-2">
              <textarea
                value={newNestedComment}
                onChange={(e) => setNewNestedComment(e.target.value)}
                placeholder="Enter a nested comment"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[60px]"
              />
              <CustomButton 
                onClick={() => handleAddNestedComment(comment._id)}
                className="px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
              >
                Add Nested Comment
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter a new comment"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[80px] mb-3"
        />
        <CustomButton 
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Comment
        </CustomButton>
      </div>
    </div>
  );
}

export default UpdateTweet;
