package com.tweetapp.controller;

import com.tweetapp.model.Word;
import com.tweetapp.service.WordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/words")
@Tag(name = "Word", description = "API for Word operations")
public class WordController {
    
    @Autowired
    private WordService wordService;
    
    @GetMapping
    @Operation(summary = "Get all words")
    public ResponseEntity<?> getAllWords() {
        try {
            List<Word> words = wordService.getAllWords();
            return ResponseEntity.ok(words);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get a word by ID")
    public ResponseEntity<?> getWordById(@PathVariable String id) {
        try {
            Word word = wordService.getWordById(id);
            if (word == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Word not found"));
            }
            return ResponseEntity.ok(word);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new word")
    public ResponseEntity<?> createWord(@RequestBody Map<String, Object> wordData) {
        try {
            Word word = wordService.createWord(wordData);
            return ResponseEntity.status(HttpStatus.CREATED).body(word);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update a word by ID")
    public ResponseEntity<?> updateWord(@PathVariable String id, @RequestBody Map<String, Object> wordData) {
        try {
            Word word = wordService.updateWord(id, wordData);
            if (word == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Word not found"));
            }
            return ResponseEntity.ok(word);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a word by ID")
    public ResponseEntity<?> deleteWord(@PathVariable String id) {
        try {
            boolean deleted = wordService.deleteWord(id);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Word not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Word deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/search")
    @Operation(summary = "Search words")
    public ResponseEntity<?> searchWords(@RequestBody Map<String, Object> searchRequest) {
        try {
            String searchString = (String) searchRequest.get("searchString");
            if (searchString == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "searchString is required"));
            }
            List<Word> words = wordService.searchWords(searchString);
            return ResponseEntity.ok(words);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

