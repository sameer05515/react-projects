package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "links")
public class Link {
    @Id
    private String id;
    
    private String uniqueId;
    private String name;
    private String parentId = "";
    private String linkType;
    private String linkUrl;
    private String description;
    private List<SmartContent> descriptions;
}

