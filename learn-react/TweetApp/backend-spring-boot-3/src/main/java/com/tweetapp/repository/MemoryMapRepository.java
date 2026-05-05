package com.tweetapp.repository;

import com.tweetapp.model.MemoryMap;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemoryMapRepository extends MongoRepository<MemoryMap, String> {
    Optional<MemoryMap> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

