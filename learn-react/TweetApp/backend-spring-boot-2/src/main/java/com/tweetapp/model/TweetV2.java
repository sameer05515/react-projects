package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tweetv2s")
public class TweetV2 {
    @Id
    private String id;
    
    private String content;
    private String author;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    private List<TweetV1.Comment> comments;
}

