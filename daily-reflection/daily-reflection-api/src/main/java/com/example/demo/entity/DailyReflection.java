package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "daily_reflections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyReflection {

    @Id
    private String id;

    private LocalDate date;

    private String whatIDidToday;

    private String goodThingToday;

    private String whatILearnedToday;

    private String challengeToday;

    private String tomorrowPriority;
}
