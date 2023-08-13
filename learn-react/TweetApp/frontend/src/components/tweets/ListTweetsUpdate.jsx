import React, { useState } from 'react';
import './list-tweets2.css';
import GlobalConstants from '../../common/globalConstants';

function ListTweetsUpdate({ tweets, onUpdate }) {
  const [content, setContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newNestedComment, setNewNestedComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const BASE_URL=GlobalConstants.tweetsApplicationBaseURL;

  const handleUpdateTweet = async (tweetId) => {
    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweetId}`, {
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

  const handleUpdateComment = async (tweetId, commentId, updatedText) => {
    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweetId}/comments/${commentId}`, {
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

  const handleAddComment = async (tweetId) => {
    if (newComment.trim() === '') {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweetId}/comments`, {
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

  const handleAddNestedComment = async (tweetId, commentId) => {
    if (newNestedComment.trim() === '') {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweetId}/comments/${commentId}/nested`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newNestedComment }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        setNewNestedComment('');
        setSelectedCommentId(null);
      }
    } catch (error) {
      console.error('Error adding nested comment:', error);
    }
  };

  return (
    <div>
      <h2>Tweets</h2>
      {tweets.map(tweet => (
        <div key={tweet._id} className="tweet-card">
          <h3>Tweet:</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Update your tweet content"
          />
          <button onClick={() => handleUpdateTweet(tweet._id)}>Update Tweet</button>
          <div className="comments-section">
            <h3>Comments:</h3>
            {tweet.comments.map(comment => (
              <div key={comment._id} className="comment">
                <p>{comment.text}</p>
                <textarea
                  value={comment.text}
                  onChange={(e) => {
                    const updatedText = e.target.value;
                    handleUpdateComment(tweet._id, comment._id, updatedText);
                  }}
                />
                <div className="nested-comments">
                  <h4>Nested Comments:</h4>
                  {comment.nestedComments.map(nestedComment => (
                    <div key={nestedComment._id} className="nested-comment">
                      <p>{nestedComment.text}</p>
                    </div>
                  ))}
                  <div>
                    <textarea
                      value={newNestedComment}
                      onChange={(e) => setNewNestedComment(e.target.value)}
                      placeholder="Enter a nested comment"
                    />
                    <button onClick={() => handleAddNestedComment(tweet._id, comment._id)}>Add Nested Comment</button>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter a new comment"
              />
              <button onClick={() => handleAddComment(tweet._id)}>Add Comment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListTweetsUpdate;
