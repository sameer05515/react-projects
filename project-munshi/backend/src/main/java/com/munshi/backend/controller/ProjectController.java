package com.munshi.backend.controller;

import com.munshi.backend.dto.ProjectRequest;
import com.munshi.backend.dto.ProjectResponse;
import com.munshi.backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Project Management", description = "APIs for managing projects")
public class ProjectController {
    
    private final ProjectService projectService;
    
    @PostMapping
    @Operation(summary = "Create a new project", description = "Creates a new project with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Project created successfully",
                    content = @Content(schema = @Schema(implementation = ProjectResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody ProjectRequest request) {
        ProjectResponse response = projectService.createProject(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping
    @Operation(summary = "Get all projects", description = "Retrieves a list of all projects")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list of projects",
            content = @Content(schema = @Schema(implementation = ProjectResponse.class)))
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        List<ProjectResponse> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get project by ID", description = "Retrieves a project by its unique identifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project found",
                    content = @Content(schema = @Schema(implementation = ProjectResponse.class))),
            @ApiResponse(responseCode = "404", description = "Project not found")
    })
    public ResponseEntity<ProjectResponse> getProjectById(
            @Parameter(description = "Project ID", required = true) @PathVariable String id) {
        ProjectResponse response = projectService.getProjectById(id);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update a project", description = "Updates an existing project with new details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project updated successfully",
                    content = @Content(schema = @Schema(implementation = ProjectResponse.class))),
            @ApiResponse(responseCode = "404", description = "Project not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<ProjectResponse> updateProject(
            @Parameter(description = "Project ID", required = true) @PathVariable String id,
            @Valid @RequestBody ProjectRequest request) {
        ProjectResponse response = projectService.updateProject(id, request);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a project", description = "Deletes a project by its unique identifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Project deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Project not found")
    })
    public ResponseEntity<Void> deleteProject(
            @Parameter(description = "Project ID", required = true) @PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search projects by name", description = "Searches for projects containing the specified name")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved matching projects",
            content = @Content(schema = @Schema(implementation = ProjectResponse.class)))
    public ResponseEntity<List<ProjectResponse>> searchProjectsByName(
            @Parameter(description = "Project name to search for", required = true) @RequestParam String name) {
        List<ProjectResponse> projects = projectService.searchProjectsByName(name);
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Get projects by status", description = "Retrieves all projects with the specified status")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved projects",
            content = @Content(schema = @Schema(implementation = ProjectResponse.class)))
    public ResponseEntity<List<ProjectResponse>> getProjectsByStatus(
            @Parameter(description = "Project status", required = true) @PathVariable String status) {
        List<ProjectResponse> projects = projectService.getProjectsByStatus(status);
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/owner/{owner}")
    @Operation(summary = "Get projects by owner", description = "Retrieves all projects owned by the specified owner")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved projects",
            content = @Content(schema = @Schema(implementation = ProjectResponse.class)))
    public ResponseEntity<List<ProjectResponse>> getProjectsByOwner(
            @Parameter(description = "Project owner", required = true) @PathVariable String owner) {
        List<ProjectResponse> projects = projectService.getProjectsByOwner(owner);
        return ResponseEntity.ok(projects);
    }
}

