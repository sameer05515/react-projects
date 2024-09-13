package com.prem.user.entity;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class Authority {
    @Column(unique = true)
    private String id;
    private String name;

    @Builder
    public Authority(
            String id,
            String name
    ){
        this.id= id;
        this.name= name;
    }

}
