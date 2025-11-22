package com.tweetapp.repository;

import com.tweetapp.model.TopicSection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicSectionRepository extends MongoRepository<TopicSection, String> {
    Optional<TopicSection> findByUniqueId(String uniqueId);
    List<TopicSection> findByLinkedTopicUniqueId(String linkedTopicUniqueId);
    void deleteByUniqueId(String uniqueId);
}

