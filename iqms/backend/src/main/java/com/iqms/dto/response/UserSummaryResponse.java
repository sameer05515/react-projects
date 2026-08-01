package com.iqms.dto.response;

import java.util.Set;
import java.util.UUID;

/**
 * Public-facing user profile shape returned by auth and profile endpoints.
 * Never carries the password hash or password-reset token.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record UserSummaryResponse(
        UUID id,
        String username,
        String email,
        String firstName,
        String lastName,
        String avatarUrl,
        String themePreference,
        Set<String> roles
) {
}
