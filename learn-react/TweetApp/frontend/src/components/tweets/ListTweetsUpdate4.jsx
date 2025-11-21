import React, { useState } from "react";
import CreateTweet from "./CreateTweet";
import Tweet from "./ViewTweet2";
import GlobalConstants from "../../common/constants/globalConstants";
import Accordion from "../../common/components/accordion/Accordion";

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}

function ListTweetsUpdate({
  tweets,
  onUpdate = () => {},
  refreshFunction = () => {},
  handleTweetCreated = () => {},
}) {
  const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;

  const [sortAscending, setSortAscending] = useState(false); // Toggle to sort ascending or descending

  const sortedTweets = [...tweets].sort((a, b) =>
    sortAscending
      ? a.createdAt.localeCompare(b.createdAt)
      : b.createdAt.localeCompare(a.createdAt)
  );

  const toggleSort = () => {
    setSortAscending((prevSort) => !prevSort);
  };

  const [expandAll, setExpandAll] = useState(false); // State to track expand/collapse all

  const handleToggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  const handleUpdateTweet = async (tweetId, updatedContent) => {
    if (updatedContent.trim() === "") {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/tweets/v1/${tweetId}`, {
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
    if (updatedText.trim() === "") {
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/tweets/v1/${tweetId}/comments/${commentId}`,
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
    if (updatedText.trim() === "") {
      return;
    }
    try {
      const response = await fetch(
        `${BASE_URL}/tweets/v1/${tweetId}/comments/${commentId}/nested/${nestedCommentId}`,
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
      const response = await fetch(`${BASE_URL}/tweets/v1/${tweetId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newCommentText }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        refreshFunction();
        //setNewCommentText(""); // Reset the new comment text
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
        `${BASE_URL}/tweets/v1/${tweetId}/comments/${commentId}/nested`,
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
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Tweets</h2>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <CreateTweet onTweetCreated={handleTweetCreated} />
      </div>
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={handleToggleExpandAll}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {expandAll ? "Collapse All" : "Expand All"}
        </button>
        <button 
          onClick={toggleSort}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Sort by {sortAscending ? "Newest" : "Oldest"}
        </button>
      </div>

      <div className="space-y-4">
        {sortedTweets.map((tweet) => (
          <Accordion key={tweet._id} title={tweet.content} isExpanded={expandAll}>
            <Tweet
              tweet={tweet}
              handleUpdateTweet={handleUpdateTweet}
              handleUpdateComment={handleUpdateComment}
              handleUpdateNestedComment={handleUpdateNestedComment}
              handleAddComment={handleAddComment}
              handleAddNestedComment={handleAddNestedComment}
              formatTimestamp={formatTimestamp}
            />
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default ListTweetsUpdate;
