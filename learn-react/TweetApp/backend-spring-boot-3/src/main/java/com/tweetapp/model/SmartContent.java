package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "smartContent")
public class SmartContent {
    private String content;
    private String textOutputType; // html, yaml, markdown, skeleton, text
    private String textInputType; // CKEditor, TextArea
}

