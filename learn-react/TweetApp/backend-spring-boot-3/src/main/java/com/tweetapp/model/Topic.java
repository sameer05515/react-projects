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
@Document(collection = "topics")
public class Topic {
    @Id
    private String id;
    
    private String uniqueId;
    private String parentId = "";
    private String name;
    private String description;
    private SmartContent smartContent;
    private List<String> tags;
    private Boolean published = false;
    private LocalDateTime occurenceDate;
    private Boolean softDelete = false;
    
    @CreatedDate
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    private LocalDateTime updatedDate;
}

