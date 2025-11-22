package com.tweetapp.controller;

import com.tweetapp.model.ComparableObject;
import com.tweetapp.service.ComparableObjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/c-objects")
@Tag(name = "ComparableObject", description = "API for Comparable Object operations")
public class ComparableObjectController {
    
    @Autowired
    private ComparableObjectService comparableObjectService;
    
    @GetMapping
    @Operation(summary = "Get all comparable objects")
    public ResponseEntity<?> getAllComparableObjects() {
        try {
            List<ComparableObject> objects = comparableObjectService.getAllComparableObjects();
            return ResponseEntity.ok(objects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a comparable object by uniqueId")
    public ResponseEntity<?> getComparableObjectByUniqueId(@PathVariable String uniqueId) {
        try {
            ComparableObject obj = comparableObjectService.getComparableObjectByUniqueId(uniqueId);
            if (obj == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Comparable object not found"));
            }
            return ResponseEntity.ok(obj);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new comparable object")
    public ResponseEntity<?> createComparableObject(@RequestBody Map<String, Object> objectData) {
        try {
            ComparableObject obj = comparableObjectService.createComparableObject(objectData);
            return ResponseEntity.status(HttpStatus.CREATED).body(obj);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a comparable object by uniqueId")
    public ResponseEntity<?> updateComparableObject(@PathVariable String uniqueId, @RequestBody Map<String, Object> objectData) {
        try {
            ComparableObject obj = comparableObjectService.updateComparableObjectByUniqueId(uniqueId, objectData);
            if (obj == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Comparable object not found"));
            }
            return ResponseEntity.ok(obj);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a comparable object by uniqueId")
    public ResponseEntity<?> deleteComparableObject(@PathVariable String uniqueId) {
        try {
            boolean deleted = comparableObjectService.deleteComparableObjectByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Comparable object not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Comparable object deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

