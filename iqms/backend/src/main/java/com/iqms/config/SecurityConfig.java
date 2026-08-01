package com.iqms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iqms.security.CustomAccessDeniedHandler;
import com.iqms.security.JwtAuthenticationEntryPoint;
import com.iqms.security.JwtAuthenticationFilter;
import com.iqms.security.RateLimitingFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security configuration for IQMS.
 *
 * <ul>
 *     <li>Stateless sessions — IQMS is a pure JWT-bearer API; no {@code JSESSIONID}
 *     is ever issued. The refresh token is the one exception, carried in an
 *     HttpOnly cookie scoped to {@code /api/auth} (see {@link com.iqms.security.CookieUtil}).</li>
 *     <li>CSRF disabled — safe here because the refresh cookie is
 *     {@code SameSite=Strict} and every state-changing endpoint additionally
 *     requires a bearer token that CSRF (a cookie-riding attack) cannot forge.</li>
 *     <li>{@link BCryptPasswordEncoder} strength 12 for password hashing.</li>
 *     <li>{@link RateLimitingFilter} ahead of everything else on {@code /api/auth/**}
 *     to blunt credential-stuffing/brute-force attempts.</li>
 *     <li>{@link JwtAuthenticationFilter} populates the security context from
 *     the {@code Authorization} header; unauthenticated/forbidden requests
 *     are handled by {@link JwtAuthenticationEntryPoint}/{@link CustomAccessDeniedHandler}
 *     so every error response — auth or otherwise — uses the same
 *     {@code ApiResponse} envelope.</li>
 *     <li>{@link EnableMethodSecurity} turns on {@code @PreAuthorize} for the
 *     role-restricted admin endpoints added in later phases.</li>
 * </ul>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final int BCRYPT_STRENGTH = 12;
    private static final String AUTH_BASE_PATH = "/api/auth/**";

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    private final ObjectMapper objectMapper;

    @Value("${iqms.rate-limit.capacity:100}")
    private int rateLimitCapacity;

    @Value("${iqms.rate-limit.refill-tokens:100}")
    private int rateLimitRefillTokens;

    @Value("${iqms.rate-limit.refill-duration-seconds:60}")
    private int rateLimitRefillDurationSeconds;

    /**
     * Password hashing strategy used for storing and verifying user credentials.
     * Strength 12 balances brute-force resistance against login latency.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(BCRYPT_STRENGTH);
    }

    /**
     * Exposes Spring Security's {@link AuthenticationManager} so
     * {@code AuthServiceImpl} can authenticate username/password credentials
     * during login without hand-rolling credential comparison.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * The per-IP rate limiter applied only to {@code /api/auth/**} — see
     * {@link RateLimitingFilter}'s Javadoc for the in-memory-bucket caveat
     * at horizontal scale.
     */
    @Bean
    public RateLimitingFilter rateLimitingFilter() {
        return new RateLimitingFilter(objectMapper, rateLimitCapacity, rateLimitRefillTokens, rateLimitRefillDurationSeconds);
    }

    /**
     * Assembles the HTTP security filter chain: stateless sessions, CSRF
     * disabled, custom JSON error handlers, the auth-endpoint rate limiter,
     * the JWT authentication filter, and the public/authenticated endpoint
     * split.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(handling -> handling
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/**",
                                "/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/actuator/health",
                                "/actuator/info"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(rateLimitingFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
