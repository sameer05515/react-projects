package com.tweetapp.controller;

import com.tweetapp.model.RelatedNode;
import com.tweetapp.service.RelatedNodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/node-story")
@Tag(name = "RelatedNode", description = "API for Related Node operations")
public class RelatedNodeController {
    
    @Autowired
    private RelatedNodeService relatedNodeService;
    
    @GetMapping
    @Operation(summary = "Get all related nodes")
    public ResponseEntity<?> getAllRelatedNodes() {
        try {
            List<RelatedNode> nodes = relatedNodeService.getAllRelatedNodes();
            return ResponseEntity.ok(nodes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a related node by uniqueId")
    public ResponseEntity<?> getRelatedNodeByUniqueId(@PathVariable String uniqueId) {
        try {
            RelatedNode node = relatedNodeService.getRelatedNodeByUniqueId(uniqueId);
            if (node == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Related node not found"));
            }
            return ResponseEntity.ok(node);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new related node")
    public ResponseEntity<?> createRelatedNode(@RequestBody Map<String, Object> nodeData) {
        try {
            RelatedNode node = relatedNodeService.createRelatedNode(nodeData);
            return ResponseEntity.status(HttpStatus.CREATED).body(node);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a related node by uniqueId")
    public ResponseEntity<?> updateRelatedNode(@PathVariable String uniqueId, @RequestBody Map<String, Object> nodeData) {
        try {
            RelatedNode node = relatedNodeService.updateRelatedNodeByUniqueId(uniqueId, nodeData);
            if (node == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Related node not found"));
            }
            return ResponseEntity.ok(node);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a related node by uniqueId")
    public ResponseEntity<?> deleteRelatedNode(@PathVariable String uniqueId) {
        try {
            boolean deleted = relatedNodeService.deleteRelatedNodeByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Related node not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Related node deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

