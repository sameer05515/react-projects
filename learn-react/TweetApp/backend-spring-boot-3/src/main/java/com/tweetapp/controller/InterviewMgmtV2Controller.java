package com.tweetapp.controller;

import com.tweetapp.service.InterviewMgmtV2Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/intvw-mgmt/v2")
@Tag(name = "InterviewMgmtV2", description = "Interview Management V2 endpoints")
public class InterviewMgmtV2Controller {

    @Autowired
    private InterviewMgmtV2Service interviewMgmtV2Service;

    @PostMapping("/categories")
    @Operation(summary = "Create category")
    public ResponseEntity<?> createCategory(@RequestBody Map<String, Object> request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(interviewMgmtV2Service.createCategory(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/categories")
    @Operation(summary = "Get all categories")
    public ResponseEntity<?> getAllCategories() {
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.getAllCategories());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/categories/{uniqueId}")
    @Operation(summary = "Get category by uniqueId")
    public ResponseEntity<?> getCategoryByUniqueId(@PathVariable String uniqueId) {
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.getCategoryByUniqueId(uniqueId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/categories/{uniqueId}")
    @Operation(summary = "Update category by uniqueId")
    public ResponseEntity<?> updateCategoryByUniqueId(@PathVariable String uniqueId, @RequestBody Map<String, Object> request) {
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.updateCategoryByUniqueId(uniqueId, request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/questions")
    @Operation(summary = "Create question")
    public ResponseEntity<?> createQuestion(@RequestBody Map<String, Object> request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(interviewMgmtV2Service.createQuestion(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/export/questions/flat")
    @Operation(summary = "Export questions as flat JSON")
    public ResponseEntity<?> exportQuestionsFlat() {
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.getAllQuestionsFlat());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/questions")
    @Operation(summary = "Get all questions")
    public ResponseEntity<?> getAllQuestions() {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(interviewMgmtV2Service.getAllQuestions());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/questions/{uniqueId}")
    @Operation(summary = "Get question by uniqueId")
    public ResponseEntity<?> getQuestionByUniqueId(@PathVariable String uniqueId) {
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.getQuestionByUniqueId(uniqueId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/categories/{categoryId}/questions/{quesId}")
    @Operation(summary = "Get question by categoryId and quesId")
    public ResponseEntity<?> getQuestionByCategoryIdAndQuesId(@PathVariable String categoryId, @PathVariable String quesId) {
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.getQuestionByCategoryIdAndQuesId(categoryId, quesId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/questions/{uniqueId}")
    @Operation(summary = "Update question by uniqueId")
    public ResponseEntity<?> updateQuestionByUniqueId(@PathVariable String uniqueId, @RequestBody Map<String, Object> request) {
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.updateQuestionByUniqueId(uniqueId, request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/questions/{uniqueId}")
    @Operation(summary = "Update last revised date of a question")
    public ResponseEntity<?> updateLastRevisedByUniqueId(@PathVariable String uniqueId) {
        try {
            interviewMgmtV2Service.updateLastRevisedOfQuestionByUniqueId(uniqueId);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/questions/search")
    @Operation(summary = "Search questions")
    public ResponseEntity<?> searchQuestions(@RequestBody Map<String, Object> request) {
        String searchString = (String) request.get("searchString");
        if (searchString == null || searchString.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "searchString is required"));
        }
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.searchTopics(searchString, (Map<String, Object>) request.get("searchOptions")));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An error occurred while searching for topics"));
        }
    }

    @PostMapping("/answers")
    @Operation(summary = "Create answer")
    public ResponseEntity<?> createAnswer(@RequestBody Map<String, Object> request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(interviewMgmtV2Service.createAnswer(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("requestedanswer", request, "error", e.getMessage()));
        }
    }

    @PutMapping("/answers/{uniqueId}")
    @Operation(summary = "Update answer by uniqueId")
    public ResponseEntity<?> updateAnswerByUniqueId(@PathVariable String uniqueId, @RequestBody Map<String, Object> request) {
        try {
            return ResponseEntity.ok(interviewMgmtV2Service.updateAnswerByUniqueId(uniqueId, request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
