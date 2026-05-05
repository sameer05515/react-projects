package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "activities")
public class Activity {
    @Id
    private String id;
    
    private String uniqueId;
    private String type;
    private SmartContent description;
    private UserDetails userDetails;
    
    @CreatedDate
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    private LocalDateTime updatedDate;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDetails {
        private String id;
        private String name;
    }
}

