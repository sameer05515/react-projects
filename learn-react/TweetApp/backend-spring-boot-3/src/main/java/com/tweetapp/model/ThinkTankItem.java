package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "thinktankitems")
public class ThinkTankItem {
    @Id
    private String id;
    
    private String uniqueId;
    private SmartContent smartContent;
    private String status = "Open"; // Open, Closed, Unknown
    private LocalDateTime closedOn;
    private Boolean isUrgent = false;
    private Boolean isImportant = false;
    private Boolean hasGroomed = false;
    private String itemType = "to-do"; // to-do, raw-question, yet-to-be-decided
    
    @CreatedDate
    private LocalDateTime createdDate;
}

