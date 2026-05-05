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
@Document(collection = "interviewanswers")
public class InterviewAnswer {
    @Id
    private String id;

    private String uniqueId;
    private String name;
    private String heading;
    private SmartContent smartContent;
    private String linkedQuestionsId = "";
    private Integer order = 0;
    private List<String> tags;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    private Integer ansId;
    private Integer linkedCatId;
    private Integer linkedQuesId;
    private Integer ansIdOld;
    private String answer;
    private String title;
    private Integer rating;
}

