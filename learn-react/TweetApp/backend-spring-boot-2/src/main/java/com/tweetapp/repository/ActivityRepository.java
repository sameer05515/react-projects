package com.tweetapp.repository;

import com.tweetapp.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, String> {
    Optional<Activity> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

