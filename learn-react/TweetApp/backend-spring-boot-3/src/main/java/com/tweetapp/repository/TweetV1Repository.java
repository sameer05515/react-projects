package com.tweetapp.repository;

import com.tweetapp.model.TweetV1;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetV1Repository extends MongoRepository<TweetV1, String> {
}

