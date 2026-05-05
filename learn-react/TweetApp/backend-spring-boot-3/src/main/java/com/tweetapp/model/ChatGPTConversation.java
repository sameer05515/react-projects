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
@Document(collection = "cgptconversations")
public class ChatGPTConversation {
    @Id
    private String id;
    
    private String uniqueId;
    private String name;
    private String heading;
    private List<SmartContent> descriptions;
    private String parentId = "";
    private List<String> tags;
    private Integer rating;
    private String linkedCGPTFileId = "";
    private Integer order = 0;
    
    @CreatedDate
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    private LocalDateTime updatedDate;
}

