package com.iqms.controller;

import com.iqms.dto.common.ApiResponse;
import com.iqms.dto.request.ForgotPasswordRequest;
import com.iqms.dto.request.LoginRequest;
import com.iqms.dto.request.RegisterRequest;
import com.iqms.dto.request.ResetPasswordRequest;
import com.iqms.dto.response.AuthResponse;
import com.iqms.dto.response.AuthResult;
import com.iqms.dto.response.TokenRefreshResponse;
import com.iqms.dto.response.TokenRefreshResult;
import com.iqms.security.CookieUtil;
import com.iqms.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authentication endpoints: registration, login, token refresh, logout, and
 * password reset. Every endpoint here is publicly accessible (see
 * {@code SecurityConfig}) — that is the point of an auth controller.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Register, login, refresh, logout, and password reset")
@SecurityRequirements // overrides the global bearer-auth requirement: these endpoints need no token
public class AuthController {

    private final AuthService authService;
    private final CookieUtil cookieUtil;

    @PostMapping("/register")
    @Operation(summary = "Register a new user account")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResult result = authService.register(request);
        return withRefreshCookie(result.rawRefreshToken())
                .body(ApiResponse.success(result.authResponse(), "Registration successful"));
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate with username/email and password")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResult result = authService.login(request);
        return withRefreshCookie(result.rawRefreshToken())
                .body(ApiResponse.success(result.authResponse(), "Login successful"));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Exchange a valid refresh token (cookie) for a new access token")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refresh(HttpServletRequest request) {
        String presented = cookieUtil.readRefreshToken(request).orElse(null);
        TokenRefreshResult result = authService.refresh(presented);
        return withRefreshCookie(result.rawRefreshToken())
                .body(ApiResponse.success(result.tokenRefreshResponse(), "Token refreshed"));
    }

    @PostMapping("/logout")
    @Operation(summary = "Revoke the current refresh token and clear the session cookie")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
        String presented = cookieUtil.readRefreshToken(request).orElse(null);
        authService.logout(presented);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, cookieUtil.buildExpiredRefreshCookie())
                .body(ApiResponse.success(null, "Logged out successfully"));
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Request a password-reset email")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok(ApiResponse.success(null,
                "If an account exists for that email, a reset link has been sent"));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Complete a password reset using the emailed token")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success(null, "Password has been reset successfully"));
    }

    private ResponseEntity.BodyBuilder withRefreshCookie(String rawRefreshToken) {
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, cookieUtil.buildRefreshCookie(rawRefreshToken));
    }
}
