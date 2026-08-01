package com.iqms.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Payload for {@code POST /api/auth/register}.
 *
 * @param username  3-50 chars, alphanumeric/underscore/dot/hyphen only
 * @param email     a syntactically valid email address
 * @param password  8-100 chars, must contain an uppercase letter, a
 *                  lowercase letter, a digit, and a special character
 * @param firstName optional given name, max 100 chars
 * @param lastName  optional family name, max 100 chars
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record RegisterRequest(

        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        @Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "Username may only contain letters, numbers, dots, underscores, and hyphens")
        String username,

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be a valid address")
        @Size(max = 150, message = "Email must not exceed 150 characters")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/~`]).+$",
                message = "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
        )
        String password,

        @Size(max = 100, message = "First name must not exceed 100 characters")
        String firstName,

        @Size(max = 100, message = "Last name must not exceed 100 characters")
        String lastName
) {
}
