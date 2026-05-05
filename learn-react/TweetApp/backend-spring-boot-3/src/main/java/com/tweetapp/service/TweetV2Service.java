package com.tweetapp.service;

import com.tweetapp.model.TweetV2;
import com.tweetapp.repository.TweetV2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TweetV2Service {
    
    @Autowired
    private TweetV2Repository tweetV2Repository;
    
    public List<TweetV2> getAllTweets() {
        return tweetV2Repository.findAll();
    }
    
    public TweetV2 getTweetById(String id) {
        return tweetV2Repository.findById(id).orElse(null);
    }
    
    public TweetV2 createTweet(Map<String, Object> tweetData) {
        TweetV2 tweet = new TweetV2();
        tweet.setContent((String) tweetData.get("content"));
        tweet.setAuthor((String) tweetData.get("author"));
        tweet.setCreatedAt(LocalDateTime.now());
        return tweetV2Repository.save(tweet);
    }
    
    public TweetV2 updateTweet(String id, Map<String, Object> tweetData) {
        Optional<TweetV2> optionalTweet = tweetV2Repository.findById(id);
        if (optionalTweet.isPresent()) {
            TweetV2 tweet = optionalTweet.get();
            if (tweetData.containsKey("content")) tweet.setContent((String) tweetData.get("content"));
            if (tweetData.containsKey("author")) tweet.setAuthor((String) tweetData.get("author"));
            return tweetV2Repository.save(tweet);
        }
        return null;
    }
    
    public boolean deleteTweet(String id) {
        if (tweetV2Repository.existsById(id)) {
            tweetV2Repository.deleteById(id);
            return true;
        }
        return false;
    }
}

