package com.tweetapp.repository;

import com.tweetapp.model.InterviewAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewAnswerRepository extends MongoRepository<InterviewAnswer, String> {
    Optional<InterviewAnswer> findByUniqueId(String uniqueId);
    List<InterviewAnswer> findByLinkedQuestionsId(String linkedQuestionsId);
}
