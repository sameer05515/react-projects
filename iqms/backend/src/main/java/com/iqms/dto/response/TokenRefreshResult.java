package com.iqms.dto.response;

/**
 * Internal pairing of the client-facing {@link TokenRefreshResponse} with
 * the newly rotated raw refresh token. See {@link AuthResult} for the
 * rationale.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record TokenRefreshResult(TokenRefreshResponse tokenRefreshResponse, String rawRefreshToken) {
}
