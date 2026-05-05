package com.tweetapp.controller;

import com.tweetapp.model.ChatGPTConversation;
import com.tweetapp.service.ChatGPTService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cgpt")
@Tag(name = "ChatGPT", description = "API for ChatGPT Conversation operations")
public class ChatGPTController {
    
    @Autowired
    private ChatGPTService chatGPTService;
    
    @GetMapping
    @Operation(summary = "Get all ChatGPT conversations")
    public ResponseEntity<?> getAllConversations() {
        try {
            List<ChatGPTConversation> conversations = chatGPTService.getAllConversations();
            return ResponseEntity.ok(conversations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a ChatGPT conversation by uniqueId")
    public ResponseEntity<?> getConversationByUniqueId(@PathVariable String uniqueId) {
        try {
            ChatGPTConversation conversation = chatGPTService.getConversationByUniqueId(uniqueId);
            if (conversation == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "ChatGPT conversation not found"));
            }
            return ResponseEntity.ok(conversation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new ChatGPT conversation")
    public ResponseEntity<?> createConversation(@RequestBody Map<String, Object> conversationData) {
        try {
            ChatGPTConversation conversation = chatGPTService.createConversation(conversationData);
            return ResponseEntity.status(HttpStatus.CREATED).body(conversation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a ChatGPT conversation by uniqueId")
    public ResponseEntity<?> updateConversation(@PathVariable String uniqueId, @RequestBody Map<String, Object> conversationData) {
        try {
            ChatGPTConversation conversation = chatGPTService.updateConversationByUniqueId(uniqueId, conversationData);
            if (conversation == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "ChatGPT conversation not found"));
            }
            return ResponseEntity.ok(conversation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a ChatGPT conversation by uniqueId")
    public ResponseEntity<?> deleteConversation(@PathVariable String uniqueId) {
        try {
            boolean deleted = chatGPTService.deleteConversationByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "ChatGPT conversation not found"));
            }
            return ResponseEntity.ok(Map.of("message", "ChatGPT conversation deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

