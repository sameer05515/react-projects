package com.tweetapp.repository;

import com.tweetapp.model.ThinkTankItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThinkTankItemRepository extends MongoRepository<ThinkTankItem, String> {
    Optional<ThinkTankItem> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

