package com.iqms.security;

import com.iqms.config.JwtProperties;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;

/**
 * Creates and clears the HttpOnly refresh-token cookie.
 *
 * <p>Uses {@link ResponseCookie} (rather than the plain {@link Cookie} API)
 * because it is the only way to set {@code SameSite} from server-side code
 * without a servlet-container-specific workaround.</p>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Component
@RequiredArgsConstructor
public class CookieUtil {

    private static final String COOKIE_PATH = "/api/auth";

    private final JwtProperties jwtProperties;

    /**
     * Builds the {@code Set-Cookie} header value carrying a fresh refresh token.
     *
     * @param refreshToken the signed JWT refresh token
     * @return the header value to add via {@code response.addHeader(HttpHeaders.SET_COOKIE, ...)}
     */
    public String buildRefreshCookie(String refreshToken) {
        return ResponseCookie.from(jwtProperties.refreshCookieName(), refreshToken)
                .httpOnly(true)
                .secure(jwtProperties.secureCookie())
                .sameSite("Strict")
                .path(COOKIE_PATH)
                .maxAge(jwtProperties.refreshTokenExpirationMs() / 1000)
                .build()
                .toString();
    }

    /**
     * Builds a {@code Set-Cookie} header value that immediately expires the
     * refresh cookie, used on logout.
     */
    public String buildExpiredRefreshCookie() {
        return ResponseCookie.from(jwtProperties.refreshCookieName(), "")
                .httpOnly(true)
                .secure(jwtProperties.secureCookie())
                .sameSite("Strict")
                .path(COOKIE_PATH)
                .maxAge(0)
                .build()
                .toString();
    }

    /**
     * Reads the refresh token from the incoming request's cookies, if present.
     */
    public Optional<String> readRefreshToken(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return Optional.empty();
        }
        return Arrays.stream(request.getCookies())
                .filter(c -> jwtProperties.refreshCookieName().equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }
}
