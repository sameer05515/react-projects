package com.prem.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(callSuper = false)
public class UserDto {
    private String id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String mobileNumber;
    private String role = "user";
}
