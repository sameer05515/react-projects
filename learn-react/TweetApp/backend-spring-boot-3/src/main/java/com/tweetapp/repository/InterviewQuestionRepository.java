package com.tweetapp.repository;

import com.tweetapp.model.InterviewQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewQuestionRepository extends MongoRepository<InterviewQuestion, String> {
    Optional<InterviewQuestion> findByUniqueId(String uniqueId);
    List<InterviewQuestion> findByLinkedCategoryId(String linkedCategoryId);
    List<InterviewQuestion> findByParentId(String parentId);
}
