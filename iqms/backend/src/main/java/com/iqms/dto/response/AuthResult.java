package com.iqms.dto.response;

/**
 * Internal pairing of the client-facing {@link AuthResponse} with the raw
 * (unhashed) refresh token. Never serialized directly — {@code AuthController}
 * unpacks this to put {@link #authResponse()} in the JSON body and
 * {@link #rawRefreshToken()} in an HttpOnly cookie.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record AuthResult(AuthResponse authResponse, String rawRefreshToken) {
}
