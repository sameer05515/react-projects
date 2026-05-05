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
@Document(collection = "interviewquestions")
public class InterviewQuestion {
    @Id
    private String id;

    private String uniqueId;
    private String name;
    private String heading;
    private SmartContent smartContent;
    private String parentId = "";
    private String linkedCategoryId = "";
    private Integer order = 0;
    private LocalDateTime lastRevisedOn;
    private List<String> tags;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    private Integer quesId;
    private Integer linkedCatId;
    private Integer quesIdOld;
    private Integer linkedCatIdOld;
    private String ques;
    private String title;
    private Integer rating;
    private Boolean hidden;
    private List<InterviewAnswer> answers;
}

