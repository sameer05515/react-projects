package com.tweetapp.controller;

import com.tweetapp.model.Task;
import com.tweetapp.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tasks")
@Tag(name = "Task", description = "API for Task operations")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @GetMapping
    @Operation(summary = "Get all tasks")
    public ResponseEntity<?> getAllTasks() {
        try {
            List<Task> tasks = taskService.getAllTasks();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get a specific task by ID")
    public ResponseEntity<?> getTaskById(@PathVariable String id) {
        try {
            Task task = taskService.getTaskById(id);
            if (task == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Task not found."));
            }
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new task")
    public ResponseEntity<?> createTask(@RequestBody Map<String, Object> taskData) {
        try {
            Task task = taskService.createTask(taskData);
            return ResponseEntity.status(HttpStatus.CREATED).body(task);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update a task by ID")
    public ResponseEntity<?> updateTask(@PathVariable String id, @RequestBody Map<String, Object> taskData) {
        try {
            Task task = taskService.updateTask(id, taskData);
            if (task == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Task not found."));
            }
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a task by ID")
    public ResponseEntity<?> deleteTask(@PathVariable String id) {
        try {
            boolean deleted = taskService.deleteTask(id);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Task not found."));
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }
}

