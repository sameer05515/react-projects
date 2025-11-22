package com.tweetapp.service;

import com.tweetapp.model.ChatGPTConversation;
import com.tweetapp.repository.ChatGPTConversationRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ChatGPTService {
    
    @Autowired
    private ChatGPTConversationRepository chatGPTConversationRepository;
    
    public List<ChatGPTConversation> getAllConversations() {
        return chatGPTConversationRepository.findAll();
    }
    
    public ChatGPTConversation getConversationByUniqueId(String uniqueId) {
        return chatGPTConversationRepository.findByUniqueId(uniqueId).orElse(null);
    }
    
    public ChatGPTConversation createConversation(Map<String, Object> conversationData) {
        ChatGPTConversation conversation = new ChatGPTConversation();
        conversation.setUniqueId(UuidUtil.generateUuid());
        conversation.setName((String) conversationData.get("name"));
        conversation.setHeading((String) conversationData.get("heading"));
        conversation.setParentId(conversationData.get("parentId") != null ? (String) conversationData.get("parentId") : "");
        conversation.setRating(conversationData.get("rating") != null ? (Integer) conversationData.get("rating") : null);
        conversation.setLinkedCGPTFileId(conversationData.get("linkedCGPTFileId") != null ? (String) conversationData.get("linkedCGPTFileId") : "");
        conversation.setOrder(conversationData.get("order") != null ? (Integer) conversationData.get("order") : 0);
        conversation.setCreatedDate(LocalDateTime.now());
        conversation.setUpdatedDate(LocalDateTime.now());
        return chatGPTConversationRepository.save(conversation);
    }
    
    public ChatGPTConversation updateConversationByUniqueId(String uniqueId, Map<String, Object> conversationData) {
        Optional<ChatGPTConversation> optionalConversation = chatGPTConversationRepository.findByUniqueId(uniqueId);
        if (optionalConversation.isPresent()) {
            ChatGPTConversation conversation = optionalConversation.get();
            if (conversationData.containsKey("name")) conversation.setName((String) conversationData.get("name"));
            if (conversationData.containsKey("heading")) conversation.setHeading((String) conversationData.get("heading"));
            if (conversationData.containsKey("parentId")) conversation.setParentId((String) conversationData.get("parentId"));
            if (conversationData.containsKey("rating")) conversation.setRating((Integer) conversationData.get("rating"));
            conversation.setUpdatedDate(LocalDateTime.now());
            return chatGPTConversationRepository.save(conversation);
        }
        return null;
    }
    
    public boolean deleteConversationByUniqueId(String uniqueId) {
        Optional<ChatGPTConversation> optionalConversation = chatGPTConversationRepository.findByUniqueId(uniqueId);
        if (optionalConversation.isPresent()) {
            chatGPTConversationRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }
}

