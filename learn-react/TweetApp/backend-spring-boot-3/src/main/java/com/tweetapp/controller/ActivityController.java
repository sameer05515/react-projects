package com.tweetapp.controller;

import com.tweetapp.model.Activity;
import com.tweetapp.service.ActivityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/activities")
@Tag(name = "Activity", description = "API for Activity operations")
public class ActivityController {
    
    @Autowired
    private ActivityService activityService;
    
    @GetMapping
    @Operation(summary = "Get all activities")
    public ResponseEntity<?> getAllActivities() {
        try {
            List<Activity> activities = activityService.getAllActivities();
            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get an activity by uniqueId")
    public ResponseEntity<?> getActivityByUniqueId(@PathVariable String uniqueId) {
        try {
            Activity activity = activityService.getActivityByUniqueId(uniqueId);
            if (activity == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Activity not found"));
            }
            return ResponseEntity.ok(activity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new activity")
    public ResponseEntity<?> createActivity(@RequestBody Map<String, Object> activityData) {
        try {
            Activity activity = activityService.createActivity(activityData);
            return ResponseEntity.status(HttpStatus.CREATED).body(activity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update an activity by uniqueId")
    public ResponseEntity<?> updateActivity(@PathVariable String uniqueId, @RequestBody Map<String, Object> activityData) {
        try {
            Activity activity = activityService.updateActivityByUniqueId(uniqueId, activityData);
            if (activity == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Activity not found"));
            }
            return ResponseEntity.ok(activity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete an activity by uniqueId")
    public ResponseEntity<?> deleteActivity(@PathVariable String uniqueId) {
        try {
            boolean deleted = activityService.deleteActivityByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Activity not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Activity deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

