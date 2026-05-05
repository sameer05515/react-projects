package com.tweetapp.repository;

import com.tweetapp.model.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends MongoRepository<Topic, String> {
    Optional<Topic> findByUniqueId(String uniqueId);
    List<Topic> findByNameContainingIgnoreCase(String name);
    List<Topic> findByParentId(String parentId);
    List<Topic> findByPublishedTrue();
    void deleteByUniqueId(String uniqueId);
}

