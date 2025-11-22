import React, { useState, useEffect, useCallback } from "react";
import ListTweets from "./ListTweetsUpdate4";
import GlobalConstants from "../../common/constants/globalConstants";
import { authenticatedFetch } from "../../common/service/authenticatedFetch";

const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;
const TweetBase = () => {
  const [tweets, setTweets] = useState([]);

  const refreshTweets = useCallback(() => {
    authenticatedFetch(`${BASE_URL}/tweets/v1`)
      .then((response) => response.json())
      .then((data) => setTweets(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching tweets:", error);
        setTweets([]);
      });
  }, []);

  useEffect(() => {
    refreshTweets();
  }, [refreshTweets]);

  const handleTweetCreated = (newTweet) => {
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
