import React, { useState } from "react";
import "./list-tweets3.css";
import CreateTweet from "./CreateTweet";
import Tweet from "./ViewTweet";
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

    const [sortAscending, setSortAscending] = useState(true); // Toggle to sort ascending or descending

    const sortedTweets = [...tweets].sort((a, b) =>
      sortAscending
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt)
    );
  
    const toggleSort = () => {
      setSortAscending((prevSort) => !prevSort);
    };

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
      <div className="sort-button">
        <button onClick={toggleSort}>
          Sort by {sortAscending ? "Newest" : "Oldest"}
        </button>
      </div>
      {sortedTweets.map((tweet) => (
        <Tweet
          key={tweet._id}
          tweet={tweet}
          handleUpdateTweet={handleUpdateTweet}
          handleUpdateComment={handleUpdateComment}
          handleUpdateNestedComment={handleUpdateNestedComment}
          handleAddComment={handleAddComment}
          handleAddNestedComment={handleAddNestedComment}
          formatTimestamp={formatTimestamp}
        />
      ))}
    </div>
  );
}

export default ListTweetsUpdate;
