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
@Document(collection = "relatednodes")
public class RelatedNode {
    @Id
    private String id;
    
    private String uniqueId;
    private String name;
    private String parentId = "";
    private List<String> tags;
    private List<Relation> relations;
    private Boolean softDelete = false;
    
    @CreatedDate
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    private LocalDateTime updatedDate;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Relation {
        private String uniqueId;
        private String name;
        private String type; // previous, next
        private Boolean showReverseRelationName = false;
        private String hasId;
        private String withId;
        private Boolean softDelete = false;
        
        @CreatedDate
        private LocalDateTime createdDate;
        
        @LastModifiedDate
        private LocalDateTime updatedDate;
    }
}

