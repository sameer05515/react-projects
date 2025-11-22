package com.tweetapp.repository;

import com.tweetapp.model.Link;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LinkRepository extends MongoRepository<Link, String> {
    Optional<Link> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

