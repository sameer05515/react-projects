package com.iqms.dto.response;

/**
 * Response for {@code POST /api/auth/refresh} — a new access token only;
 * the rotated refresh token is re-set as an HttpOnly cookie by the controller.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record TokenRefreshResponse(
        String accessToken,
        String tokenType,
        long expiresInSeconds
) {
    public static TokenRefreshResponse of(String accessToken, long expiresInSeconds) {
        return new TokenRefreshResponse(accessToken, "Bearer", expiresInSeconds);
    }
}
