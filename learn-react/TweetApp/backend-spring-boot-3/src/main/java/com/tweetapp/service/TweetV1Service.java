package com.tweetapp.service;

import com.tweetapp.model.TweetV1;
import com.tweetapp.repository.TweetV1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TweetV1Service {
    
    @Autowired
    private TweetV1Repository tweetV1Repository;
    
    public List<TweetV1> getAllTweets() {
        return tweetV1Repository.findAll();
    }
    
    public TweetV1 getTweetById(String id) {
        return tweetV1Repository.findById(id).orElse(null);
    }
    
    public TweetV1 createTweet(Map<String, Object> tweetData) {
        TweetV1 tweet = new TweetV1();
        tweet.setContent((String) tweetData.get("content"));
        tweet.setCreatedAt(LocalDateTime.now());
        return tweetV1Repository.save(tweet);
    }
    
    public TweetV1 updateTweet(String id, Map<String, Object> tweetData) {
        Optional<TweetV1> optionalTweet = tweetV1Repository.findById(id);
        if (optionalTweet.isPresent()) {
            TweetV1 tweet = optionalTweet.get();
            if (tweetData.containsKey("content")) tweet.setContent((String) tweetData.get("content"));
            return tweetV1Repository.save(tweet);
        }
        return null;
    }
    
    public boolean deleteTweet(String id) {
        if (tweetV1Repository.existsById(id)) {
            tweetV1Repository.deleteById(id);
            return true;
        }
        return false;
    }
}

