package com.tweetapp.controller;

import com.tweetapp.model.MyResume;
import com.tweetapp.service.MyResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/my-resume")
@Tag(name = "MyResume", description = "API for My Resume operations")
public class MyResumeController {
    
    @Autowired
    private MyResumeService myResumeService;
    
    @GetMapping
    @Operation(summary = "Get all resumes")
    public ResponseEntity<?> getAllResumes() {
        try {
            List<MyResume> resumes = myResumeService.getAllResumes();
            return ResponseEntity.ok(resumes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueName}")
    @Operation(summary = "Get a resume by uniqueName")
    public ResponseEntity<?> getResumeByUniqueName(@PathVariable String uniqueName) {
        try {
            MyResume resume = myResumeService.getResumeByUniqueName(uniqueName);
            if (resume == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Resume not found"));
            }
            return ResponseEntity.ok(resume);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new resume")
    public ResponseEntity<?> createResume(@RequestBody Map<String, Object> resumeData) {
        try {
            MyResume resume = myResumeService.createResume(resumeData);
            return ResponseEntity.status(HttpStatus.CREATED).body(resume);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueName}")
    @Operation(summary = "Update a resume by uniqueName")
    public ResponseEntity<?> updateResume(@PathVariable String uniqueName, @RequestBody Map<String, Object> resumeData) {
        try {
            MyResume resume = myResumeService.updateResume(uniqueName, resumeData);
            if (resume == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Resume not found"));
            }
            return ResponseEntity.ok(resume);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueName}")
    @Operation(summary = "Delete a resume by uniqueName")
    public ResponseEntity<?> deleteResume(@PathVariable String uniqueName) {
        try {
            boolean deleted = myResumeService.deleteResume(uniqueName);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Resume not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Resume deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

