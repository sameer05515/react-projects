package com.prem.myresume.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@NoArgsConstructor
@Data
public class UserInfo {

    @Field("name")
    private String name;

    @Field("email")
    private List<String> emails;

    @Field("phone")
    private List<String> phones;

    @Builder
    public UserInfo(String name, List<String> emails, List<String> phones){
        this.name= name;
        this.emails= emails;
        this.phones= phones;
    }

}
