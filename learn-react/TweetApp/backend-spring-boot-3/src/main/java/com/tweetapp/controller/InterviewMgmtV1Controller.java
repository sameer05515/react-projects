package com.tweetapp.controller;

import com.tweetapp.model.InterviewCategory;
import com.tweetapp.service.InterviewMgmtV1Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/intvw-mgmt/v1/categories")
@Tag(name = "InterviewMgmtV1", description = "API for Interview Management V1 operations")
public class InterviewMgmtV1Controller {
    
    @Autowired
    private InterviewMgmtV1Service interviewMgmtV1Service;
    
    @GetMapping
    @Operation(summary = "Get all categories")
    public ResponseEntity<?> getAllCategories() {
        try {
            List<InterviewCategory> categories = interviewMgmtV1Service.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a category by uniqueId")
    public ResponseEntity<?> getCategoryByUniqueId(@PathVariable String uniqueId) {
        try {
            Map<String, Object> category = interviewMgmtV1Service.getCategoryResponseByUniqueId(uniqueId);
            if (category == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Category not found"));
            }
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new category")
    public ResponseEntity<?> createCategory(@RequestBody Map<String, Object> categoryData) {
        try {
            InterviewCategory category = interviewMgmtV1Service.createCategory(categoryData);
            return ResponseEntity.status(HttpStatus.CREATED).body(category);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a category by uniqueId")
    public ResponseEntity<?> updateCategory(@PathVariable String uniqueId, @RequestBody Map<String, Object> categoryData) {
        try {
            InterviewCategory category = interviewMgmtV1Service.updateCategoryByUniqueId(uniqueId, categoryData);
            if (category == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Category not found"));
            }
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a category by uniqueId")
    public ResponseEntity<?> deleteCategory(@PathVariable String uniqueId) {
        try {
            boolean deleted = interviewMgmtV1Service.deleteCategoryByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Category not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Category deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{categoryId}/questions")
    @Operation(summary = "Get all questions for a category")
    public ResponseEntity<?> getQuestionsByCategoryId(@PathVariable String categoryId) {
        try {
            return ResponseEntity.ok(interviewMgmtV1Service.getQuestionsByCategoryId(categoryId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{categoryId}/questions")
    @Operation(summary = "Add question to a category")
    public ResponseEntity<?> saveQuestionForCategoryId(@PathVariable String categoryId, @RequestBody Map<String, Object> questionData) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(interviewMgmtV1Service.saveQuestionForCategoryId(categoryId, questionData));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{categoryId}/questions/{quesId}")
    @Operation(summary = "Update question in a category")
    public ResponseEntity<?> updateQuestionForCategoryId(@PathVariable String categoryId,
                                                         @PathVariable String quesId,
                                                         @RequestBody Map<String, Object> questionData) {
        try {
            return ResponseEntity.ok(interviewMgmtV1Service.updateQuestionForCategoryId(categoryId, quesId, questionData));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{categoryId}/questions/{quesId}")
    @Operation(summary = "Get question by category and question id")
    public ResponseEntity<?> getQuestionByCategoryIdAndQuesId(@PathVariable String categoryId, @PathVariable String quesId) {
        try {
            return ResponseEntity.ok(interviewMgmtV1Service.getQuestionByCategoryIdAndQuesId(categoryId, quesId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

