package com.tweetapp.controller;

import com.tweetapp.model.Tag;
import com.tweetapp.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tags")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Tag", description = "API for Tag operations")
public class TagController {
    
    @Autowired
    private TagService tagService;
    
    @PostMapping
    @Operation(summary = "Create a new tag")
    public ResponseEntity<?> createTag(@RequestBody Map<String, Object> tagData) {
        try {
            Tag tag = tagService.createTag(tagData);
            return ResponseEntity.status(HttpStatus.CREATED).body(tag);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping
    @Operation(summary = "Get all tags")
    public ResponseEntity<?> getAllTags() {
        try {
            List<Tag> tags = tagService.getAllTags();
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a tag by uniqueId")
    public ResponseEntity<?> getTagById(@PathVariable String uniqueId) {
        try {
            Tag tag = tagService.getTagById(uniqueId);
            if (tag == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Tag not found"));
            }
            return ResponseEntity.ok(tag);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a tag by uniqueId")
    public ResponseEntity<?> updateTag(@PathVariable String uniqueId, @RequestBody Map<String, Object> tagData) {
        try {
            Tag tag = tagService.updateTagById(uniqueId, tagData);
            if (tag == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Tag not found"));
            }
            return ResponseEntity.ok(tag);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a tag by uniqueId")
    public ResponseEntity<?> deleteTag(@PathVariable String uniqueId) {
        try {
            boolean deleted = tagService.deleteTagById(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Tag not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Tag deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

