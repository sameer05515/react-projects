import React, { useState } from 'react';
import GlobalConstants from '../../common/globalConstants';

function CreateTweet({ onTweetCreated }) {
  const [content, setContent] = useState('');
  const BASE_URL=GlobalConstants.tweetsApplicationBaseURL;

  const handleCreateTweet = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tweets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const newTweet = await response.json();
        onTweetCreated(newTweet);
        setContent('');
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your tweet content"
      />
      <button onClick={handleCreateTweet}>Create Tweet</button>
    </div>
  );
}

export default CreateTweet;
