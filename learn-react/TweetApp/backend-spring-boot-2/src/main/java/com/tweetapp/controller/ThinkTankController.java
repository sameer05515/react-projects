package com.tweetapp.controller;

import com.tweetapp.model.ThinkTankItem;
import com.tweetapp.service.ThinkTankService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/think-tank/v1")
@Tag(name = "ThinkTank", description = "API for Think Tank operations")
public class ThinkTankController {
    
    @Autowired
    private ThinkTankService thinkTankService;
    
    @GetMapping
    @Operation(summary = "Get all think tank items")
    public ResponseEntity<?> getAllThinkTankItems() {
        try {
            List<ThinkTankItem> items = thinkTankService.getAllThinkTankItems();
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a think tank item by uniqueId")
    public ResponseEntity<?> getThinkTankItemByUniqueId(@PathVariable String uniqueId) {
        try {
            ThinkTankItem item = thinkTankService.getThinkTankItemByUniqueId(uniqueId);
            if (item == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Think tank item not found"));
            }
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new think tank item")
    public ResponseEntity<?> createThinkTankItem(@RequestBody Map<String, Object> itemData) {
        try {
            ThinkTankItem item = thinkTankService.createThinkTankItem(itemData);
            return ResponseEntity.status(HttpStatus.CREATED).body(item);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a think tank item by uniqueId")
    public ResponseEntity<?> updateThinkTankItem(@PathVariable String uniqueId, @RequestBody Map<String, Object> itemData) {
        try {
            ThinkTankItem item = thinkTankService.updateThinkTankItemByUniqueId(uniqueId, itemData);
            if (item == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Think tank item not found"));
            }
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a think tank item by uniqueId")
    public ResponseEntity<?> deleteThinkTankItem(@PathVariable String uniqueId) {
        try {
            boolean deleted = thinkTankService.deleteThinkTankItemByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Think tank item not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Think tank item deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

