import React, { useState } from 'react';

function UpdateTweet({ tweet, onUpdate }) {
  const [content, setContent] = useState(tweet.content);
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

  return (
    <div>
      <h2>Update Tweet</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Update your tweet content"
      />
      <button onClick={handleUpdateTweet}>Update Tweet</button>
    </div>
  );
}

export default UpdateTweet;
