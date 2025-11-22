package com.munshi.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    private String id;
    
    @NotBlank(message = "Project name is required")
    private String name;
    
    private String description;
    
    @NotBlank(message = "Project status is required")
    private String status; // e.g., "ACTIVE", "COMPLETED", "ON_HOLD", "CANCELLED"
    
    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;
    
    private LocalDateTime endDate;
    
    private String owner;
    
    private String[] tags;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private Boolean deleted = false;
}

