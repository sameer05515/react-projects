package com.tweetapp.repository;

import com.tweetapp.model.ComparableObject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComparableObjectRepository extends MongoRepository<ComparableObject, String> {
    Optional<ComparableObject> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

