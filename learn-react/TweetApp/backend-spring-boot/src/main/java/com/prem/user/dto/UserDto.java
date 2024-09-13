package com.prem.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

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
    private Set<AuthorityDto> authorities = new HashSet<>();
}
