package com.tweetapp.repository;

import com.tweetapp.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    Optional<Task> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

