package com.iqms.mapper;

import com.iqms.dto.response.UserSummaryResponse;
import com.iqms.entity.Role;
import com.iqms.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Maps {@link User} entities to the public {@link UserSummaryResponse} DTO.
 * Never maps in the reverse direction — user creation/update goes through
 * {@code AuthService}/{@code UserService}, which apply business rules
 * (password hashing, duplicate checks) that a generated mapper must not
 * bypass.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "roles", source = "roles", qualifiedByName = "rolesToNames")
    UserSummaryResponse toSummary(User user);

    @org.mapstruct.Named("rolesToNames")
    default Set<String> rolesToNames(Set<Role> roles) {
        if (roles == null) {
            return Set.of();
        }
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }
}
