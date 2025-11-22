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
@Document(collection = "tweets")
public class TweetV1 {
    @Id
    private String id;
    
    private String content;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    private List<Comment> comments;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Comment {
        private String text;
        private LocalDateTime createdAt;
        private List<NestedComment> nestedComments;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class NestedComment {
            private String text;
            private LocalDateTime createdAt;
        }
    }
}

