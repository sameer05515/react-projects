package com.iqms.dto.response;

/**
 * Response for {@code POST /api/auth/login} and {@code POST /api/auth/register}.
 * The refresh token itself is never included in the body — it is set as an
 * HttpOnly cookie by the controller.
 *
 * @param accessToken       short-lived JWT to send as {@code Authorization: Bearer <token>}
 * @param tokenType         always {@code "Bearer"}
 * @param expiresInSeconds  access token lifetime, in seconds, for client-side proactive refresh scheduling
 * @param user              the authenticated user's public profile
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresInSeconds,
        UserSummaryResponse user
) {
    public static AuthResponse of(String accessToken, long expiresInSeconds, UserSummaryResponse user) {
        return new AuthResponse(accessToken, "Bearer", expiresInSeconds, user);
    }
}
