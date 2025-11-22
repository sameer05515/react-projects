package com.tweetapp.repository;

import com.tweetapp.model.TweetV2;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetV2Repository extends MongoRepository<TweetV2, String> {
}
