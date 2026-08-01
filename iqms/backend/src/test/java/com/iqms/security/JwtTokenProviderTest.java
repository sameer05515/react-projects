package com.iqms.security;

import com.iqms.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Base64;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit tests for {@link JwtTokenProvider}. Uses a real (non-mocked)
 * {@link JwtProperties} instance since the provider's entire job is
 * cryptographic — mocking the signing key would defeat the point.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        String secret = Base64.getEncoder().encodeToString(
                Keys.hmacShaKeyFor("test-signing-key-at-least-256-bits-long-for-hs256!!".getBytes()).getEncoded());

        JwtProperties properties = new JwtProperties(
                secret,
                900_000L,      // 15 min access token
                604_800_000L,  // 7 day refresh token
                "iqms-backend-test",
                "iqms_refresh_token",
                false
        );
        jwtTokenProvider = new JwtTokenProvider(properties);
    }

    private UserPrincipal principalWithRoles(UUID id, String username, String... roles) {
        var user = new com.iqms.entity.User();
        user.setId(id);
        user.setUsername(username);
        user.setEmail(username + "@example.com");
        user.setPassword("hashed");
        user.setEnabled(true);
        user.setAccountNonLocked(true);
        var roleEntities = new java.util.HashSet<com.iqms.entity.Role>();
        for (String r : roles) {
            roleEntities.add(new com.iqms.entity.Role(r, r + " role"));
        }
        user.setRoles(roleEntities);
        return new UserPrincipal(user);
    }

    @Test
    void generateAccessToken_producesTokenThatIsValidAndTypedAsAccess() {
        UUID userId = UUID.randomUUID();
        UserPrincipal principal = principalWithRoles(userId, "jdoe", "USER");

        String token = jwtTokenProvider.generateAccessToken(principal);

        assertThat(jwtTokenProvider.isValid(token)).isTrue();
        Claims claims = jwtTokenProvider.parseClaims(token);
        assertThat(jwtTokenProvider.isAccessToken(claims)).isTrue();
        assertThat(jwtTokenProvider.isRefreshToken(claims)).isFalse();
        assertThat(jwtTokenProvider.extractUserId(claims)).isEqualTo(userId);
        assertThat(jwtTokenProvider.extractUsername(claims)).isEqualTo("jdoe");
        assertThat(jwtTokenProvider.extractRoles(claims)).contains("ROLE_USER");
    }

    @Test
    void generateRefreshToken_producesTokenTypedAsRefresh() {
        UUID userId = UUID.randomUUID();

        String token = jwtTokenProvider.generateRefreshToken(userId);

        assertThat(jwtTokenProvider.isValid(token)).isTrue();
        Claims claims = jwtTokenProvider.parseClaims(token);
        assertThat(jwtTokenProvider.isRefreshToken(claims)).isTrue();
        assertThat(jwtTokenProvider.isAccessToken(claims)).isFalse();
        assertThat(jwtTokenProvider.extractUserId(claims)).isEqualTo(userId);
    }

    @Test
    void isValid_returnsFalseForMalformedToken() {
        assertThat(jwtTokenProvider.isValid("not-a-real-jwt")).isFalse();
    }

    @Test
    void isValid_returnsFalseForTokenSignedWithDifferentKey() {
        JwtProperties otherProperties = new JwtProperties(
                Base64.getEncoder().encodeToString(
                        Keys.hmacShaKeyFor("a-completely-different-signing-key-256-bits!!!!".getBytes()).getEncoded()),
                900_000L, 604_800_000L, "iqms-backend-test", "iqms_refresh_token", false);
        JwtTokenProvider otherProvider = new JwtTokenProvider(otherProperties);

        String tokenFromOtherIssuer = otherProvider.generateRefreshToken(UUID.randomUUID());

        assertThat(jwtTokenProvider.isValid(tokenFromOtherIssuer)).isFalse();
    }

    @Test
    void extractRoles_returnsEmptySetForUserWithNoRoles() {
        UUID userId = UUID.randomUUID();
        UserPrincipal principal = principalWithRoles(userId, "noroles");

        String token = jwtTokenProvider.generateAccessToken(principal);
        Claims claims = jwtTokenProvider.parseClaims(token);

        assertThat(jwtTokenProvider.extractRoles(claims)).isEqualTo(Set.of());
    }

    @Test
    void getAccessTokenExpirationSeconds_convertsMillisecondsToSeconds() {
        assertThat(jwtTokenProvider.getAccessTokenExpirationSeconds()).isEqualTo(900);
    }
}
