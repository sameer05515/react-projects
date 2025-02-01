import React, { useState, useEffect, useCallback } from "react";
import ListTweets from "./ListTweetsUpdate4";
import GlobalConstants from "../../common/constants/globalConstants";

const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;
const TweetBase = () => {
  const [tweets, setTweets] = useState([]);

  const refreshTweets = useCallback(() => {
    fetch(`${BASE_URL}/tweets/v1`)
      .then((response) => response.json())
      .then((data) => setTweets(data))
      .catch((error) => console.error("Error fetching tweets:", error));
  }, []);

  useEffect(() => {
    refreshTweets();
  }, [refreshTweets]);

  const handleTweetCreated = (newTweet) => {
    setTweets([...tweets, newTweet]);
  };

  return (
    <div>
      <h1>Tweet App</h1>
      <ListTweets tweets={tweets} handleTweetCreated={handleTweetCreated} refreshFunction={refreshTweets} />
    </div>
  );
};

export default TweetBase;
