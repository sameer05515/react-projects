package com.tweetapp.controller;

import com.tweetapp.model.Topic;
import com.tweetapp.model.TopicSection;
import com.tweetapp.service.TopicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/topics")
@Tag(name = "Topic", description = "API for Topic operations")
public class TopicController {
    
    @Autowired
    private TopicService topicService;
    
    @PostMapping
    @Operation(summary = "Create a new topic")
    public ResponseEntity<?> createTopic(@RequestBody Map<String, Object> topicData) {
        try {
            Topic topic = topicService.createTopic(topicData);
            return ResponseEntity.status(HttpStatus.CREATED).body(topic);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/bulk")
    @Operation(summary = "Create multiple topics")
    public ResponseEntity<?> createTopicsBulk(@RequestBody Map<String, Object> request) {
        try {
            List<Map<String, Object>> topics = (List<Map<String, Object>>) request.get("topics");
            Map<String, Object> result = topicService.createTopicsBulk(topics);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a topic by uniqueId")
    public ResponseEntity<?> updateTopic(@PathVariable String uniqueId, @RequestBody Map<String, Object> topicData) {
        try {
            Topic topic = topicService.updateTopicByUniqueId(uniqueId, topicData);
            if (topic == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Topic not found"));
            }
            return ResponseEntity.ok(topic);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping
    @Operation(summary = "Get all topics")
    public ResponseEntity<?> getAllTopics() {
        try {
            List<Topic> topics = topicService.getAllTopics();
            return ResponseEntity.ok(topics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/export")
    @Operation(summary = "Export all topics as JSON")
    public ResponseEntity<?> exportTopics() {
        try {
            return ResponseEntity.ok(topicService.getAllTopicsForExport());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/export/flat")
    @Operation(summary = "Export all topics as flat JSON")
    public ResponseEntity<?> exportTopicsFlat() {
        try {
            return ResponseEntity.ok(topicService.getAllTopicsFlatForExport());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/published")
    @Operation(summary = "Get published topics tree")
    public ResponseEntity<?> getPublishedTopics() {
        try {
            return ResponseEntity.ok(topicService.getPublishedTopics());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a specific topic by uniqueId")
    public ResponseEntity<?> getTopic(@PathVariable String uniqueId) {
        try {
            Topic topic = topicService.getTopicByUniqueId(uniqueId);
            if (topic == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Topic not found"));
            }
            return ResponseEntity.ok(topic);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{uniqueId}/publish")
    @Operation(summary = "Publish a topic")
    public ResponseEntity<?> publishTopic(@PathVariable String uniqueId) {
        try {
            Topic topic = topicService.publishTopicByUniqueId(uniqueId);
            return ResponseEntity.ok(topic);
        } catch (Exception e) {
            String msg = e.getMessage() == null ? "Failed to publish topic" : e.getMessage();
            if (msg.contains("Topic not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", msg));
            }
            if (msg.contains("Cannot publish") || msg.contains("ancestor")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", msg));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", msg));
        }
    }
    
    @PostMapping("/search")
    @Operation(summary = "Search topics by searchString")
    public ResponseEntity<?> searchTopics(@RequestBody Map<String, Object> searchRequest) {
        try {
            String searchString = (String) searchRequest.get("searchString");
            if (searchString == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "searchString is required"));
            }
            Map<String, Object> searchOptions = (Map<String, Object>) searchRequest.get("searchOptions");
            List<Topic> topics = topicService.searchTopics(searchString, searchOptions);
            return ResponseEntity.ok(topics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An error occurred while searching for topics"));
        }
    }
    
    @PostMapping("/section")
    @Operation(summary = "Create a new topic section")
    public ResponseEntity<?> createTopicSection(@RequestBody Map<String, Object> sectionData) {
        try {
            Topic topic = topicService.createTopicSection(sectionData);
            return ResponseEntity.status(HttpStatus.CREATED).body(topic);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}/sections")
    @Operation(summary = "Get all sections for a topic by uniqueId")
    public ResponseEntity<?> getAllTopicSections(@PathVariable String uniqueId) {
        try {
            List<TopicSection> sections = topicService.getAllTopicSectionsById(uniqueId);
            return ResponseEntity.ok(sections);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}/sections/{sectionUniqueId}")
    @Operation(summary = "Get a specific section for a topic")
    public ResponseEntity<?> getTopicSection(@PathVariable String uniqueId, @PathVariable String sectionUniqueId) {
        try {
            TopicSection section = topicService.getTopicSectionsById(uniqueId, sectionUniqueId);
            return ResponseEntity.ok(section);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}/sections/{sectionUniqueId}")
    @Operation(summary = "Update a section for a topic")
    public ResponseEntity<?> updateTopicSection(@PathVariable String uniqueId, 
                                                @PathVariable String sectionUniqueId,
                                                @RequestBody Map<String, Object> sectionData) {
        try {
            Topic topic = topicService.updateTopicSectionsById(uniqueId, sectionUniqueId, sectionData);
            return ResponseEntity.ok(topic);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}

