import React, { useState, useEffect, useCallback } from "react";
import ListTweets from "./ListTweetsUpdate4";
import GlobalConstants from "../../common/constants/globalConstants";

const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;
const TweetBase = () => {
  const [tweets, setTweets] = useState<any[]>([]);

  const refreshTweets = useCallback(() => {
    fetch(`${BASE_URL}/tweets/v1`)
      .then((response) => response.json())
      .then((data) => setTweets(data))
      .catch((error) => console.error("Error fetching tweets:", error));
  }, []);

  useEffect(() => {
    refreshTweets();
  }, [refreshTweets]);

  const handleTweetCreated = (newTweet: any) => {
    setTweets([...tweets, newTweet]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Tweet App</h1>
      <ListTweets tweets={tweets} handleTweetCreated={handleTweetCreated} refreshFunction={refreshTweets} />
    </div>
  );
};

export default TweetBase;
