package com.tweetapp.controller;

import com.tweetapp.model.TweetV1;
import com.tweetapp.service.TweetV1Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tweets/v1")
@Tag(name = "TweetV1", description = "API for Tweet V1 operations")
public class TweetV1Controller {
    
    @Autowired
    private TweetV1Service tweetV1Service;
    
    @GetMapping
    @Operation(summary = "Get all tweets")
    public ResponseEntity<?> getAllTweets() {
        try {
            List<TweetV1> tweets = tweetV1Service.getAllTweets();
            return ResponseEntity.ok(tweets);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get a tweet by ID")
    public ResponseEntity<?> getTweetById(@PathVariable String id) {
        try {
            TweetV1 tweet = tweetV1Service.getTweetById(id);
            if (tweet == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Tweet not found"));
            }
            return ResponseEntity.ok(tweet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new tweet")
    public ResponseEntity<?> createTweet(@RequestBody Map<String, Object> tweetData) {
        try {
            TweetV1 tweet = tweetV1Service.createTweet(tweetData);
            return ResponseEntity.status(HttpStatus.CREATED).body(tweet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update a tweet by ID")
    public ResponseEntity<?> updateTweet(@PathVariable String id, @RequestBody Map<String, Object> tweetData) {
        try {
            TweetV1 tweet = tweetV1Service.updateTweet(id, tweetData);
            if (tweet == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Tweet not found"));
            }
            return ResponseEntity.ok(tweet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a tweet by ID")
    public ResponseEntity<?> deleteTweet(@PathVariable String id) {
        try {
            boolean deleted = tweetV1Service.deleteTweet(id);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Tweet not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Tweet deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

