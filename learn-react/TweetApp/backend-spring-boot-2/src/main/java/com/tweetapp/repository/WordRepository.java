package com.tweetapp.repository;

import com.tweetapp.model.Word;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WordRepository extends MongoRepository<Word, String> {
    Optional<Word> findById(String id);
}

