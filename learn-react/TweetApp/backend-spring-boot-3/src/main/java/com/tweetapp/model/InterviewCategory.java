package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "categories")
public class InterviewCategory {
    @Id
    private String id;
    
    private String uniqueId;
    private Integer categoryId;
    private String categoryName;
    private String title;
    private Integer catId;
    private String catName;
    private Integer rating;
    private String sourceDB;
    private String parentId = "";
    private String name;
    private String heading;
    private SmartContent smartContent;
    private Boolean isPrivate = false;
    private List<String> tags;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private List<InterviewQuestion> questions;
}

