package com.iqms.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Payload for {@code POST /api/auth/forgot-password}.
 *
 * @param email the account email to send a reset link to
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record ForgotPasswordRequest(

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be a valid address")
        String email
) {
}
