package com.iqms.dto.request;

import jakarta.validation.constraints.NotBlank;

/**
 * Payload for {@code POST /api/auth/login}.
 *
 * @param usernameOrEmail the user's username or email address
 * @param password        the user's plaintext password, verified against the stored BCrypt hash
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record LoginRequest(

        @NotBlank(message = "Username or email is required")
        String usernameOrEmail,

        @NotBlank(message = "Password is required")
        String password
) {
}
