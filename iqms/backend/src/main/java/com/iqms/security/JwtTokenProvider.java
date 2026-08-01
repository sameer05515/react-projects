package com.iqms.security;

import com.iqms.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Issues and validates the HMAC-signed JWTs used for both access and
 * refresh tokens.
 *
 * <p>Access tokens carry the user's id (as {@code sub}), username, and role
 * authorities so downstream authorization can happen without a database
 * round-trip per request. Refresh tokens carry only the user id — their
 * validity is additionally checked against the persisted, hashed
 * {@code refresh_tokens} row by {@code AuthService}, which is what allows
 * server-side revocation.</p>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    private static final String CLAIM_USERNAME = "username";
    private static final String CLAIM_ROLES = "roles";
    private static final String CLAIM_TYPE = "type";
    private static final String TYPE_ACCESS = "access";
    private static final String TYPE_REFRESH = "refresh";

    private final JwtProperties jwtProperties;

    private SecretKey signingKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtProperties.secret());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Issues a short-lived access token for the given authenticated principal.
     *
     * @param principal the authenticated user
     * @return a signed JWT access token
     */
    public String generateAccessToken(UserPrincipal principal) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtProperties.accessTokenExpirationMs());

        List<String> roles = principal.getAuthorities().stream()
                .map(Object::toString)
                .toList();

        return Jwts.builder()
                .subject(principal.getId().toString())
                .claim(CLAIM_USERNAME, principal.getUsername())
                .claim(CLAIM_ROLES, roles)
                .claim(CLAIM_TYPE, TYPE_ACCESS)
                .issuer(jwtProperties.issuer())
                .issuedAt(now)
                .expiration(expiry)
                .signWith(signingKey())
                .compact();
    }

    /**
     * Issues a long-lived refresh token for the given user id. Intentionally
     * minimal claims — the refresh token's only job is to prove "this JWT
     * was signed by us for this user id"; everything else (revocation,
     * expiry tracking) lives in the {@code refresh_tokens} table.
     *
     * @param userId the user id to embed as the token subject
     * @return a signed JWT refresh token
     */
    public String generateRefreshToken(UUID userId) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtProperties.refreshTokenExpirationMs());

        return Jwts.builder()
                .subject(userId.toString())
                .claim(CLAIM_TYPE, TYPE_REFRESH)
                .issuer(jwtProperties.issuer())
                .issuedAt(now)
                .expiration(expiry)
                .signWith(signingKey())
                .compact();
    }

    /**
     * Parses and validates a token's signature and expiry.
     *
     * @param token the raw JWT string
     * @return the parsed claims
     * @throws JwtException if the token is malformed, expired, or has an invalid signature
     */
    public Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * @param token the raw JWT string
     * @return {@code true} if the token parses, is signed correctly, and is not expired
     */
    public boolean isValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException ex) {
            log.debug("JWT expired: {}", ex.getMessage());
        } catch (JwtException | IllegalArgumentException ex) {
            log.debug("JWT invalid: {}", ex.getMessage());
        }
        return false;
    }

    public boolean isRefreshToken(Claims claims) {
        return TYPE_REFRESH.equals(claims.get(CLAIM_TYPE, String.class));
    }

    public boolean isAccessToken(Claims claims) {
        return TYPE_ACCESS.equals(claims.get(CLAIM_TYPE, String.class));
    }

    public UUID extractUserId(Claims claims) {
        return UUID.fromString(claims.getSubject());
    }

    public String extractUsername(Claims claims) {
        return claims.get(CLAIM_USERNAME, String.class);
    }

    @SuppressWarnings("unchecked")
    public Set<String> extractRoles(Claims claims) {
        List<String> roles = claims.get(CLAIM_ROLES, List.class);
        return roles == null ? Set.of() : Set.copyOf(roles);
    }

    public long getAccessTokenExpirationSeconds() {
        return jwtProperties.accessTokenExpirationMs() / 1000;
    }

    public long getRefreshTokenExpirationMs() {
        return jwtProperties.refreshTokenExpirationMs();
    }
}
