package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "words")
public class Word {
    @Id
    private String id;
    
    private String uniqueName;
    private String word;
    private String type;
    private String details;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
    private LocalDateTime lastRead;
}

