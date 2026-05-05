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
@Document(collection = "memorymaps")
public class MemoryMap {
    @Id
    private String id;
    
    private String uniqueId;
    private String parentId = "";
    private String name;
    private String skeleton = "";
    private String skeletonTextType; // indented-string, json-array
    private List<MemoryMapDetail> details;
    private List<MemoryMapReference> references;
    private Boolean softDelete = false;
    
    @CreatedDate
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    private LocalDateTime updatedDate;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemoryMapDetail {
        private String uniqueId;
        private SmartContent smartContent;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemoryMapReference {
        private String uniqueId;
        private String itemType; // topic, section, link, interview-question, interview-category
        private ItemMetadata itemMetadata;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class ItemMetadata {
            private String topicUniqueID;
            private String linkUniqueID;
        }
    }
}

