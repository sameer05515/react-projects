package com.iqms.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

/**
 * Type-safe binding for the {@code iqms.jwt.*} configuration namespace.
 *
 * <p>Centralizing these values avoids scattering {@code @Value("${...}")}
 * lookups across the security layer and lets Spring Boot validate them at
 * startup rather than failing lazily at first token issuance.</p>
 *
 * @param secret                    Base64-encoded HMAC signing key. Must be
 *                                  overridden via the {@code JWT_SECRET} env
 *                                  var in every non-local environment.
 * @param accessTokenExpirationMs   Access token lifetime, in milliseconds.
 * @param refreshTokenExpirationMs  Refresh token lifetime, in milliseconds.
 * @param issuer                    Value stamped into the JWT {@code iss} claim.
 * @param refreshCookieName         Name of the HttpOnly cookie carrying the refresh token.
 * @param secureCookie              Whether the refresh cookie requires HTTPS (set {@code true} in production).
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Validated
@ConfigurationProperties(prefix = "iqms.jwt")
public record JwtProperties(
        @NotBlank String secret,
        @Positive long accessTokenExpirationMs,
        @Positive long refreshTokenExpirationMs,
        @NotBlank String issuer,
        @NotBlank String refreshCookieName,
        boolean secureCookie
) {
}
