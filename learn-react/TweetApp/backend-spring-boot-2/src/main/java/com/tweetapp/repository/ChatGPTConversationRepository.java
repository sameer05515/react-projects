package com.tweetapp.repository;

import com.tweetapp.model.ChatGPTConversation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatGPTConversationRepository extends MongoRepository<ChatGPTConversation, String> {
    Optional<ChatGPTConversation> findByUniqueId(String uniqueId);
    void deleteByUniqueId(String uniqueId);
}

