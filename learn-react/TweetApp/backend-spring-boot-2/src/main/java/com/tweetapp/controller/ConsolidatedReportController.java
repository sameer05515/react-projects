package com.tweetapp.controller;

import com.tweetapp.model.ConsolidatedReport;
import com.tweetapp.service.ConsolidatedReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/consolidated-reporting")
@Tag(name = "ConsolidatedReport", description = "API for Consolidated Reporting operations")
public class ConsolidatedReportController {
    
    @Autowired
    private ConsolidatedReportService consolidatedReportService;
    
    @GetMapping
    @Operation(summary = "Get all consolidated reports")
    public ResponseEntity<?> getAllReports() {
        try {
            List<ConsolidatedReport> reports = consolidatedReportService.getAllReports();
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/{uniqueId}")
    @Operation(summary = "Get a consolidated report by uniqueId")
    public ResponseEntity<?> getReportByUniqueId(@PathVariable String uniqueId) {
        try {
            ConsolidatedReport report = consolidatedReportService.getReportByUniqueId(uniqueId);
            if (report == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Consolidated report not found"));
            }
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    @Operation(summary = "Create a new consolidated report")
    public ResponseEntity<?> createReport(@RequestBody Map<String, Object> reportData) {
        try {
            ConsolidatedReport report = consolidatedReportService.createReport(reportData);
            return ResponseEntity.status(HttpStatus.CREATED).body(report);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{uniqueId}")
    @Operation(summary = "Update a consolidated report by uniqueId")
    public ResponseEntity<?> updateReport(@PathVariable String uniqueId, @RequestBody Map<String, Object> reportData) {
        try {
            ConsolidatedReport report = consolidatedReportService.updateReportByUniqueId(uniqueId, reportData);
            if (report == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Consolidated report not found"));
            }
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{uniqueId}")
    @Operation(summary = "Delete a consolidated report by uniqueId")
    public ResponseEntity<?> deleteReport(@PathVariable String uniqueId) {
        try {
            boolean deleted = consolidatedReportService.deleteReportByUniqueId(uniqueId);
            if (!deleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Consolidated report not found"));
            }
            return ResponseEntity.ok(Map.of("message", "Consolidated report deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

