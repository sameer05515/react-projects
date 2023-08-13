import React, { useState } from 'react';

function UpdateTweet({ tweet, onUpdate }) {
  const [content, setContent] = useState(tweet.content);
  const [newComment, setNewComment] = useState('');
  const [updatedComment, setUpdatedComment] = useState('');
  const BASE_URL=GlobalConstants.tweetsApplicationBaseURL;

  const handleUpdateTweet = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweet._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
      }
    } catch (error) {
      console.error('Error updating tweet:', error);
    }
  };

  const handleUpdateComment = async (commentId, updatedText) => {
    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweet._id}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: updatedText }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweet._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newComment }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
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
      {tweet.comments.map(comment => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          <textarea
            value={updatedComment || comment.text}
            onChange={(e) => {
              const updatedText = e.target.value;
              setUpdatedComment(updatedText);
            }}
          />
          <button onClick={()=>handleUpdateComment(comment._id, updatedComment)}>Update Comment</button>
        </div>
      ))}
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter a new comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default UpdateTweet;
