package com.iqms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * Payload for {@code PATCH /api/users/me/theme}.
 *
 * @param theme {@code "LIGHT"} or {@code "DARK"}
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record ThemePreferenceRequest(

        @NotBlank(message = "Theme is required")
        @Pattern(regexp = "^(LIGHT|DARK)$", message = "Theme must be either LIGHT or DARK")
        String theme
) {
}
