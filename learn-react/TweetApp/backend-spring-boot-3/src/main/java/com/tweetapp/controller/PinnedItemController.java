package com.tweetapp.controller;

import com.tweetapp.model.PinnedItem;
import com.tweetapp.service.PinnedItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pinned-items")
@Tag(name = "PinnedItem", description = "API for Pinned Item operations")
public class PinnedItemController {
    
    @Autowired
    private PinnedItemService pinnedItemService;
    
    @GetMapping
    @Operation(summary = "Get all pinned items")
    public ResponseEntity<?> getAllPinnedItems() {
        try {
            List<PinnedItem> pinnedItems = pinnedItemService.getAllPinnedItems();
            return ResponseEntity.ok(pinnedItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a pinned item by uniqueId")
    public ResponseEntity<?> getPinnedItemByUniqueId(@PathVariable String uniqueId) {
        try {
            PinnedItem pinnedItem = pinnedItemService.getPinnedItemByUniqueId(uniqueId);
            if (pinnedItem == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Pinned item not found"));
            }
            return ResponseEntity.ok(pinnedItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new pinned item")
    public ResponseEntity<?> createPinnedItem(@RequestBody Map<String, Object> pinnedItemData) {
        try {
            PinnedItem pinnedItem = pinnedItemService.createPinnedItem(pinnedItemData);
            return ResponseEntity.status(HttpStatus.CREATED).body(pinnedItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a pinned item by uniqueId")
    public ResponseEntity<?> updatePinnedItem(@PathVariable String uniqueId, @RequestBody Map<String, Object> pinnedItemData) {
        try {
            PinnedItem pinnedItem = pinnedItemService.updatePinnedItemByUniqueId(uniqueId, pinnedItemData);
            if (pinnedItem == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Pinned item not found"));
            }
            return ResponseEntity.ok(pinnedItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a pinned item by uniqueId")
    public ResponseEntity<?> deletePinnedItem(@PathVariable String uniqueId) {
        try {
            boolean deleted = pinnedItemService.deletePinnedItemByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Pinned item not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Pinned item deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

