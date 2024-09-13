package com.prem.user.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Data
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

//    @Builder.Default
    private Set<Authority> authorities = new HashSet<>();

    @Builder
    public User(String id, String username, String password, String name, String email, String mobileNumber, String role, Set<Authority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.role = role;
        this.authorities = authorities!=null?authorities: new HashSet<>();
    }
}
