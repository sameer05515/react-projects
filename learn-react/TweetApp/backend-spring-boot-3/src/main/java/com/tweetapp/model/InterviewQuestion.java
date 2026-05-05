package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestion {
    private String uniqueId;
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

