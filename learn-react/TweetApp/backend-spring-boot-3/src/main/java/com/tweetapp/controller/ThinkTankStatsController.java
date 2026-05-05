package com.tweetapp.controller;

import com.tweetapp.service.ThinkTankService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/think-tank/v1/stats")
@Tag(name = "ThinkTankStats", description = "API for Think Tank statistics")
public class ThinkTankStatsController {
    
    @Autowired
    private ThinkTankService thinkTankService;
    
    @GetMapping
    @Operation(summary = "Get think tank statistics")
    public ResponseEntity<?> getStatistics() {
        try {
            Map<String, Object> stats = thinkTankService.getStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}

