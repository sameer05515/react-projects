package com.example.demo.controller;

import com.example.demo.entity.DailyReflection;
import com.example.demo.service.DailyReflectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reflections")
public class DailyReflectionController {

    private final DailyReflectionService service;

    public DailyReflectionController(DailyReflectionService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<DailyReflection> create(
            @RequestBody DailyReflection reflection) {

        DailyReflection saved = service.create(reflection);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<DailyReflection>> getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<DailyReflection> getById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                service.getById(id)
        );
    }

    // GET BY DATE
    @GetMapping("/date/{date}")
    public ResponseEntity<DailyReflection> getByDate(
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                service.getByDate(date)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<DailyReflection> update(
            @PathVariable String id,
            @RequestBody DailyReflection reflection) {

        return ResponseEntity.ok(
                service.update(id, reflection)
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable String id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Export all reflections as JSON",
            description = "Downloads all daily reflections as a JSON file"
    )
    @ApiResponse(
            responseCode = "200",
            description = "Reflections exported successfully"
    )
    @GetMapping(
            value = "/export/json",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<DailyReflection>> exportAsJson() {

        List<DailyReflection> reflections =
                service.exportAsJson();

        return ResponseEntity
                .ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=daily-reflections.json"
                )
                .contentType(MediaType.APPLICATION_JSON)
                .body(reflections);
    }
}