package com.prem.user.util;

import com.prem.base.util.Convertible;
import com.prem.base.util.Updatable;
import com.prem.user.dto.UserDto;
import com.prem.user.entity.Authority;
import com.prem.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserUtil implements Convertible<User, UserDto>, Updatable<User, UserDto> {

    @Autowired
    private AuthorityUtil authorityUtil;

    @Override
    public UserDto convertToResponse(User user) {
        List<Authority> authoritiesList= List.of(
                Authority.builder().name("ROLE_USER").build()
//               , Authority.builder().name("ROLE_ADMIN").build()
        );
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail())
                .mobileNumber(user.getMobileNumber())
                .role(user.getRole())
                .authorities(authoritiesList
                        .stream()
                        .map(authorityUtil::convertToResponse)
                        .collect(Collectors.toSet()))
//                .authorities(user.getAuthorities()
//                        .stream()
//                        .map(authorityUtil::convertToResponse)
//                        .collect(Collectors.toSet()))
                .build();
    }

    @Override
    public User convertToEntity(UserDto userDto) {
        return User.builder().build();
    }

    @Override
    public User updateEntity(User existingEntity, UserDto userDto) {
        return User.builder().build();
    }
}
