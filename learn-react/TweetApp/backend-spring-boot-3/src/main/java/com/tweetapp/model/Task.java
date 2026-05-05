package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    
    private String uniqueId;
    private String parentId = "";
    private String name;
    private List<SmartContent> descriptions;
    private List<String> tags;
    private List<String> linkedTasks;
    private String taskStatus = "In Progress";
    private List<Activity> activities;
    
    @CreatedDate
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    private LocalDateTime updatedDate;
}

