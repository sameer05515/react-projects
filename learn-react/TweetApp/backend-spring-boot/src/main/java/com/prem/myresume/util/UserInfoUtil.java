package com.prem.myresume.util;

import com.prem.base.util.Convertible;
import com.prem.myresume.dto.UserInfoDto;
import com.prem.myresume.entity.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserInfoUtil implements Convertible<UserInfo, UserInfoDto> {
    @Override
    public UserInfoDto convertToResponse(UserInfo entity) {

        return UserInfoDto.builder()
                .name(entity.getName())
                .emails(entity.getEmails())
                .phones(entity.getPhones())
                .build();
    }

    @Override
    public UserInfo convertToEntity(UserInfoDto dto) {

        return UserInfo.builder()
                .name(dto.getName())
                .emails(dto.getEmails())
                .phones(dto.getPhones())
                .build();
    }
}
