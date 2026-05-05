package com.tweetapp.repository;

import com.tweetapp.model.PinnedItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PinnedItemRepository extends MongoRepository<PinnedItem, String> {
    Optional<PinnedItem> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

