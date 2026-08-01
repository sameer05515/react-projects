package com.iqms.service.impl;

import com.iqms.config.JwtProperties;
import com.iqms.dto.request.ForgotPasswordRequest;
import com.iqms.dto.request.LoginRequest;
import com.iqms.dto.request.RegisterRequest;
import com.iqms.dto.request.ResetPasswordRequest;
import com.iqms.dto.response.AuthResponse;
import com.iqms.dto.response.AuthResult;
import com.iqms.dto.response.TokenRefreshResponse;
import com.iqms.dto.response.TokenRefreshResult;
import com.iqms.entity.RefreshToken;
import com.iqms.entity.Role;
import com.iqms.entity.User;
import com.iqms.exception.DuplicateResourceException;
import com.iqms.exception.InvalidTokenException;
import com.iqms.mapper.UserMapper;
import com.iqms.repository.RefreshTokenRepository;
import com.iqms.repository.RoleRepository;
import com.iqms.repository.UserRepository;
import com.iqms.security.JwtTokenProvider;
import com.iqms.security.UserPrincipal;
import com.iqms.service.AuthService;
import com.iqms.service.EmailService;
import com.iqms.util.RoleConstants;
import com.iqms.util.TokenHashUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * {@link AuthService} implementation.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private static final int MAX_FAILED_LOGIN_ATTEMPTS = 5;
    private static final int PASSWORD_RESET_TOKEN_VALIDITY_MINUTES = 30;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtProperties jwtProperties;
    private final UserMapper userMapper;
    private final EmailService emailService;

    @Override
    @Transactional
    public AuthResult register(RegisterRequest request) {
        if (userRepository.existsByUsernameAndDeletedFalse(request.username())) {
            throw new DuplicateResourceException("User", "username", request.username());
        }
        if (userRepository.existsByEmailAndDeletedFalse(request.email())) {
            throw new DuplicateResourceException("User", "email", request.email());
        }

        Role userRole = roleRepository.findByName(RoleConstants.USER)
                .orElseThrow(() -> new IllegalStateException(
                        "Required role '%s' is missing — check V2__seed_roles.sql was applied".formatted(RoleConstants.USER)));

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setRoles(Set.of(userRole));

        User saved = userRepository.save(user);
        log.info("Registered new user [{}]", saved.getUsername());

        return issueTokenPair(saved);
    }

    @Override
    @Transactional
    public AuthResult login(LoginRequest request) {
        User user = userRepository.findActiveByUsernameOrEmail(request.usernameOrEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!user.isAccountNonLocked()) {
            throw new LockedException("This account is locked due to too many failed login attempts. "
                    + "Please reset your password to unlock it.");
        }
        if (!user.isEnabled()) {
            throw new DisabledException("This account has been disabled");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.usernameOrEmail(), request.password()));
        } catch (BadCredentialsException ex) {
            registerFailedLoginAttempt(user);
            throw ex;
        }

        if (user.getFailedLoginAttempts() > 0) {
            user.setFailedLoginAttempts(0);
            userRepository.save(user);
        }

        log.info("User [{}] logged in", user.getUsername());
        return issueTokenPair(user);
    }

    private void registerFailedLoginAttempt(User user) {
        int attempts = user.getFailedLoginAttempts() + 1;
        user.setFailedLoginAttempts(attempts);
        if (attempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
            user.setAccountNonLocked(false);
            log.warn("User [{}] locked after {} failed login attempts", user.getUsername(), attempts);
        }
        userRepository.save(user);
    }

    @Override
    @Transactional
    public TokenRefreshResult refresh(String presentedRefreshToken) {
        if (presentedRefreshToken == null || presentedRefreshToken.isBlank()) {
            throw new InvalidTokenException("No refresh token was presented");
        }

        Claims claims;
        try {
            claims = jwtTokenProvider.parseClaims(presentedRefreshToken);
        } catch (JwtException | IllegalArgumentException ex) {
            throw new InvalidTokenException("Refresh token is invalid or expired");
        }

        if (!jwtTokenProvider.isRefreshToken(claims)) {
            throw new InvalidTokenException("Presented token is not a refresh token");
        }

        String tokenHash = TokenHashUtil.sha256(presentedRefreshToken);
        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new InvalidTokenException("Refresh token is not recognized"));

        if (!storedToken.isValid()) {
            throw new InvalidTokenException("Refresh token has been revoked or has expired");
        }

        // Rotation: the presented token is single-use.
        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        User user = storedToken.getUser();
        if (!user.isEnabled() || !user.isAccountNonLocked() || user.isDeleted()) {
            throw new InvalidTokenException("Account is no longer active");
        }

        UserPrincipal principal = new UserPrincipal(user);
        String newAccessToken = jwtTokenProvider.generateAccessToken(principal);
        String newRawRefreshToken = jwtTokenProvider.generateRefreshToken(user.getId());
        persistRefreshToken(newRawRefreshToken, user);

        TokenRefreshResponse response = TokenRefreshResponse.of(newAccessToken, jwtTokenProvider.getAccessTokenExpirationSeconds());
        return new TokenRefreshResult(response, newRawRefreshToken);
    }

    @Override
    @Transactional
    public void logout(String presentedRefreshToken) {
        if (presentedRefreshToken == null || presentedRefreshToken.isBlank()) {
            return;
        }
        String tokenHash = TokenHashUtil.sha256(presentedRefreshToken);
        refreshTokenRepository.findByTokenHash(tokenHash).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    @Override
    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        userRepository.findByEmailAndDeletedFalse(request.email()).ifPresentOrElse(user -> {
            String rawToken = TokenHashUtil.generateSecureToken();
            user.setPasswordResetToken(TokenHashUtil.sha256(rawToken));
            user.setPasswordResetExpiry(LocalDateTime.now().plusMinutes(PASSWORD_RESET_TOKEN_VALIDITY_MINUTES));
            userRepository.save(user);

            emailService.sendPasswordResetEmail(user.getEmail(), user.getUsername(), rawToken);
            log.info("Password reset token issued for user [{}]", user.getUsername());
        }, () -> log.info("Password reset requested for unknown email; no action taken"));

        // Always returns successfully — the API response is identical whether
        // or not the email exists, so this endpoint cannot be used to
        // enumerate registered accounts.
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        String hashedToken = TokenHashUtil.sha256(request.token());

        User user = userRepository.findByPasswordResetTokenAndDeletedFalse(hashedToken)
                .orElseThrow(() -> new InvalidTokenException("Reset token is invalid or has already been used"));

        if (user.getPasswordResetExpiry() == null || user.getPasswordResetExpiry().isBefore(LocalDateTime.now())) {
            throw new InvalidTokenException("Reset token has expired. Please request a new one.");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetExpiry(null);
        user.setFailedLoginAttempts(0);
        user.setAccountNonLocked(true);
        userRepository.save(user);

        // Force re-authentication everywhere: a password reset is exactly
        // the moment an account may have been compromised.
        refreshTokenRepository.revokeAllForUser(user);

        log.info("Password reset completed for user [{}]", user.getUsername());
    }

    /**
     * Issues an access/refresh token pair for a freshly registered or
     * logged-in user and persists the hashed refresh token.
     */
    private AuthResult issueTokenPair(User user) {
        UserPrincipal principal = new UserPrincipal(user);
        String accessToken = jwtTokenProvider.generateAccessToken(principal);
        String rawRefreshToken = jwtTokenProvider.generateRefreshToken(user.getId());
        persistRefreshToken(rawRefreshToken, user);

        AuthResponse response = AuthResponse.of(
                accessToken,
                jwtTokenProvider.getAccessTokenExpirationSeconds(),
                userMapper.toSummary(user));

        return new AuthResult(response, rawRefreshToken);
    }

    private void persistRefreshToken(String rawRefreshToken, User user) {
        RefreshToken entity = new RefreshToken(
                TokenHashUtil.sha256(rawRefreshToken),
                user,
                LocalDateTime.now().plusSeconds(jwtProperties.refreshTokenExpirationMs() / 1000));
        refreshTokenRepository.save(entity);
    }
}
