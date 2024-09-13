package com.prem.user.util;

import com.prem.base.util.Convertible;
import com.prem.base.util.Updatable;
import com.prem.user.dto.UserDto;
import com.prem.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserUtil implements Convertible<User, UserDto>, Updatable<User, UserDto> {
    @Override
    public UserDto convertToResponse(User user) {
        return UserDto.builder().build();
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
