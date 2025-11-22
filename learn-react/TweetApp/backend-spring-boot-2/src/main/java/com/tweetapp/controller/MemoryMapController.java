package com.tweetapp.controller;

import com.tweetapp.model.MemoryMap;
import com.tweetapp.service.MemoryMapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/memory-maps")
@Tag(name = "MemoryMap", description = "API for Memory Map operations")
public class MemoryMapController {
    
    @Autowired
    private MemoryMapService memoryMapService;
    
    @GetMapping
    @Operation(summary = "Get all memory maps")
    public ResponseEntity<?> getAllMemoryMaps() {
        try {
            List<MemoryMap> memoryMaps = memoryMapService.getAllMemoryMaps();
            return ResponseEntity.ok(memoryMaps);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a memory map by uniqueId")
    public ResponseEntity<?> getMemoryMapByUniqueId(@PathVariable String uniqueId) {
        try {
            MemoryMap memoryMap = memoryMapService.getMemoryMapByUniqueId(uniqueId);
            if (memoryMap == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Memory map not found"));
            }
            return ResponseEntity.ok(memoryMap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new memory map")
    public ResponseEntity<?> createMemoryMap(@RequestBody Map<String, Object> memoryMapData) {
        try {
            MemoryMap memoryMap = memoryMapService.createMemoryMap(memoryMapData);
            return ResponseEntity.status(HttpStatus.CREATED).body(memoryMap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a memory map by uniqueId")
    public ResponseEntity<?> updateMemoryMap(@PathVariable String uniqueId, @RequestBody Map<String, Object> memoryMapData) {
        try {
            MemoryMap memoryMap = memoryMapService.updateMemoryMapByUniqueId(uniqueId, memoryMapData);
            if (memoryMap == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Memory map not found"));
            }
            return ResponseEntity.ok(memoryMap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}/skeleton")
    @Operation(summary = "Update skeleton for a memory map")
    public ResponseEntity<?> updateSkeleton(@PathVariable String uniqueId, @RequestBody Map<String, Object> skeletonData) {
        try {
            MemoryMap memoryMap = memoryMapService.updateSkeleton(uniqueId, skeletonData);
            if (memoryMap == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Memory map not found"));
            }
            return ResponseEntity.ok(memoryMap);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a memory map by uniqueId")
    public ResponseEntity<?> deleteMemoryMap(@PathVariable String uniqueId) {
        try {
            boolean deleted = memoryMapService.deleteMemoryMapByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Memory map not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Memory map deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/search")
    @Operation(summary = "Search memory maps")
    public ResponseEntity<?> searchMemoryMaps(@RequestBody Map<String, Object> searchRequest) {
        try {
            String searchString = (String) searchRequest.get("searchString");
            if (searchString == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "searchString is required"));
            }
            List<MemoryMap> memoryMaps = memoryMapService.searchMemoryMaps(searchString);
            return ResponseEntity.ok(memoryMaps);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

