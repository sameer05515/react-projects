package com.tweetapp.repository;

import com.tweetapp.model.MyResume;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MyResumeRepository extends MongoRepository<MyResume, String> {
    Optional<MyResume> findByUniqueName(String uniqueName);
}

