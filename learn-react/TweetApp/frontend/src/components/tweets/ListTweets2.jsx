import React from 'react';
import './list-tweets2.css';

function ListTweets({ tweets, onUpdate }) {
  return (
    <div>
      <h2>Tweets</h2>
      {tweets.map(tweet => (
        <div key={tweet._id} className="tweet-card">
          <p>{tweet.content}</p>
          <button onClick={() => onUpdate(tweet)}>Update</button>
          <div className="comments-section">
            <h3>Comments:</h3>
            {tweet.comments.map(comment => (
              <div key={comment._id} className="comment">
                <p>{comment.text}</p>
                <div className="nested-comments">
                  <h4>Nested Comments:</h4>
                  {comment.nestedComments.map(nestedComment => (
                    <div key={nestedComment._id} className="nested-comment">
                      <p>{nestedComment.text}</p>
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

export default ListTweets;
