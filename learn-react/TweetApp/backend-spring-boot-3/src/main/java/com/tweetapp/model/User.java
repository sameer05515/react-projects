package com.tweetapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "usercolls")
public class User {
    @Id
    private String id;
    
    private String username;
    private String password;
    private String name;
    private String email;
    private String mobileNumber;
    private String role = "user";
}

