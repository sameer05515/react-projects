package com.iqms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Payload for {@code POST /api/auth/reset-password}.
 *
 * @param token       the single-use reset token emailed to the user
 * @param newPassword the new password, subject to the same strength policy as registration
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record ResetPasswordRequest(

        @NotBlank(message = "Reset token is required")
        String token,

        @NotBlank(message = "New password is required")
        @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/~`]).+$",
                message = "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
        )
        String newPassword
) {
}
