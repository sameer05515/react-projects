package com.prem.user.util;

import com.prem.base.util.Convertible;
import com.prem.user.dto.AuthorityDto;
import com.prem.user.entity.Authority;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthorityUtil  implements Convertible<Authority, AuthorityDto> {
    @Override
    public AuthorityDto convertToResponse(Authority authority) {
        return AuthorityDto.builder()
                .id(authority.getId())
                .name(authority.getName())
                .build();
    }

    @Override
    public Authority convertToEntity(AuthorityDto authorityDto) {
        return null;
    }
}
