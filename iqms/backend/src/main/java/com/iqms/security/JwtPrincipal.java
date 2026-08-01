package com.iqms.security;

import java.util.UUID;

/**
 * The principal Spring Security holds in the {@code SecurityContext} for a
 * request authenticated via {@link JwtAuthenticationFilter}.
 *
 * <p>Deliberately does not re-fetch the {@link com.iqms.entity.User} entity
 * from the database on every request — the access token's short 15-minute
 * lifetime makes the small staleness window (e.g. a role change not taking
 * effect until the next token refresh) an acceptable trade-off for avoiding
 * a DB hit on every authenticated call. Controllers/services that need the
 * full user record still load it explicitly by id via {@code UserService}.</p>
 *
 * @param id       the authenticated user's id, extracted from the JWT {@code sub} claim
 * @param username the authenticated user's username, extracted from the JWT
 * @author IQMS Engineering
 * @since 1.0.0
 */
public record JwtPrincipal(UUID id, String username) {
}
