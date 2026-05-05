package com.tweetapp.repository;

import com.tweetapp.model.InterviewCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterviewCategoryRepository extends MongoRepository<InterviewCategory, String> {
    Optional<InterviewCategory> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

