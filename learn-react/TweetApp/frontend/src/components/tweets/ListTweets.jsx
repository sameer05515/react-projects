import React from 'react';

function ListTweets({ tweets, onUpdate }) {
  return (
    <div>
      <h2>Tweets</h2>
      <ul>
        {tweets.map(tweet => (
          <li key={tweet._id}>
            <p>{tweet.content}</p>
            <button onClick={() => onUpdate(tweet)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListTweets;
