import React, { useState } from 'react';
import './list-tweets2.css';
import EditableLabel from '../common/EditableLabel';
import GlobalConstants from '../../common/globalConstants';

function ListTweetsUpdate({ tweets, onUpdate, refreshFunction=()=>{} }) {
  const BASE_URL=GlobalConstants.tweetsApplicationBaseURL;
  const handleUpdateTweet = async (tweetId, updatedContent) => {
    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: updatedContent }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);
        refreshFunction();
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
        refreshFunction();
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleAddComment = async (tweetId, newCommentText) => {
    if (newCommentText.trim() === '') {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweetId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newCommentText }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);        
        refreshFunction();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddNestedComment = async (tweetId, commentId, newNestedCommentText) => {
    if (newNestedCommentText.trim() === '') {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tweets/${tweetId}/comments/${commentId}/nested`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newNestedCommentText }),
      });

      if (response.ok) {
        const updatedTweet = await response.json();
        onUpdate(updatedTweet);        
        refreshFunction();
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
          <EditableLabel
            text={tweet.content}
            postUpdateClick={(updatedContent) => handleUpdateTweet(tweet._id, updatedContent)}
          />
          <div className="comments-section">
            <h3>Comments:</h3>
            {tweet.comments.map(comment => (
              <div key={comment._id} className="comment">
                <EditableLabel
                  text={comment.text}
                  postUpdateClick={(updatedText) => handleUpdateComment(tweet._id, comment._id, updatedText)}
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
                      placeholder="Enter a nested comment"
                      onBlur={(e) => handleAddNestedComment(tweet._id, comment._id, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div>
              <textarea
                placeholder="Enter a new comment"
                onBlur={(e) => handleAddComment(tweet._id, e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListTweetsUpdate;
