package com.iqms.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iqms.dto.common.ApiResponse;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Applies a per-client-IP token-bucket rate limit to the authentication
 * endpoints ({@code /api/auth/**}), mitigating credential-stuffing and
 * brute-force attacks against login/register/forgot-password.
 *
 * <p>Buckets are held in-memory. That is a deliberate, documented
 * limitation: it resets on restart and does not share state across
 * horizontally scaled backend instances. If IQMS is deployed with more than
 * one backend replica, migrate this to a Redis-backed Bucket4j proxy
 * manager (the {@code spring-boot-starter-data-redis} dependency is already
 * on the classpath) — swap {@link #buckets} for
 * {@code Bucket4jRedis...ProxyManager} without changing the filter's
 * public behavior.</p>
 *
 * <p>Constructed explicitly as a {@code @Bean} in {@code SecurityConfig}
 * (rather than {@code @Component}-scanned) so its rate-limit parameters can
 * be supplied via {@code @Value}-annotated factory-method parameters —
 * field-level {@code @Value} would not apply to a filter registered
 * directly with Spring Security's filter chain builder.</p>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Slf4j
public class RateLimitingFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;
    private final int capacity;
    private final int refillTokens;
    private final int refillDurationSeconds;
    private final ConcurrentMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    public RateLimitingFilter(ObjectMapper objectMapper, int capacity, int refillTokens, int refillDurationSeconds) {
        this.objectMapper = objectMapper;
        this.capacity = capacity;
        this.refillTokens = refillTokens;
        this.refillDurationSeconds = refillDurationSeconds;
    }

    /**
     * Registered on the single global filter chain, so this filter must
     * self-scope to the endpoints it protects rather than relying on a
     * separate {@code securityMatcher}.
     */
    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        return !request.getRequestURI().startsWith("/api/auth/");
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String clientKey = resolveClientKey(request);
        Bucket bucket = buckets.computeIfAbsent(clientKey, key -> newBucket());

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
            return;
        }

        log.warn("Rate limit exceeded for client [{}] on [{} {}]", clientKey, request.getMethod(), request.getRequestURI());
        response.setStatus(HttpServletResponse.SC_TOO_MANY_REQUESTS);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(
                objectMapper.writeValueAsString(
                        ApiResponse.error("Too many requests. Please try again later."))
        );
    }

    private Bucket newBucket() {
        Bandwidth limit = Bandwidth.classic(
                capacity,
                Refill.greedy(refillTokens, Duration.ofSeconds(refillDurationSeconds))
        );
        return Bucket.builder().addLimit(limit).build();
    }

    private String resolveClientKey(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
