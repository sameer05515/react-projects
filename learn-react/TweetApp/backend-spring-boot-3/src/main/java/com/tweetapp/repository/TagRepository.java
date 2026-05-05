package com.tweetapp.repository;

import com.tweetapp.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends MongoRepository<Tag, String> {
    Optional<Tag> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

