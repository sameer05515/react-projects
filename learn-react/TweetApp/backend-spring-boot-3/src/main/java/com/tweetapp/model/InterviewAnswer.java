package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewAnswer {
    private String uniqueId;
    private Integer ansId;
    private Integer linkedCatId;
    private Integer linkedQuesId;
    private Integer ansIdOld;
    private String answer;
    private String title;
    private Integer rating;
}

