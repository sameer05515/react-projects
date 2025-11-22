package com.tweetapp.repository;

import com.tweetapp.model.RelatedNode;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RelatedNodeRepository extends MongoRepository<RelatedNode, String> {
    Optional<RelatedNode> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

