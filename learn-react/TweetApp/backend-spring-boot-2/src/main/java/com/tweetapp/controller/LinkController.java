package com.tweetapp.controller;

import com.tweetapp.model.Link;
import com.tweetapp.service.LinkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/links")
@Tag(name = "Link", description = "API for Link operations")
public class LinkController {
    
    @Autowired
    private LinkService linkService;
    
    @GetMapping
    @Operation(summary = "Get all links")
    public ResponseEntity<?> getAllLinks() {
        try {
            List<Link> links = linkService.getAllLinks();
            return ResponseEntity.ok(links);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a link by uniqueId")
    public ResponseEntity<?> getLinkByUniqueId(@PathVariable String uniqueId) {
        try {
            Link link = linkService.getLinkByUniqueId(uniqueId);
            if (link == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Link not found"));
            }
            return ResponseEntity.ok(link);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new link")
    public ResponseEntity<?> createLink(@RequestBody Map<String, Object> linkData) {
        try {
            Link link = linkService.createLink(linkData);
            return ResponseEntity.status(HttpStatus.CREATED).body(link);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a link by uniqueId")
    public ResponseEntity<?> updateLink(@PathVariable String uniqueId, @RequestBody Map<String, Object> linkData) {
        try {
            Link link = linkService.updateLinkByUniqueId(uniqueId, linkData);
            if (link == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Link not found"));
            }
            return ResponseEntity.ok(link);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a link by uniqueId")
    public ResponseEntity<?> deleteLink(@PathVariable String uniqueId) {
        try {
            boolean deleted = linkService.deleteLinkByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Link not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Link deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/search")
    @Operation(summary = "Search links")
    public ResponseEntity<?> searchLinks(@RequestBody Map<String, Object> searchRequest) {
        try {
            String searchString = (String) searchRequest.get("searchString");
            if (searchString == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "searchString is required"));
            }
            List<Link> links = linkService.searchLinks(searchString);
            return ResponseEntity.ok(links);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

