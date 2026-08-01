package com.iqms.service.impl;

import com.iqms.config.JwtProperties;
import com.iqms.dto.request.ForgotPasswordRequest;
import com.iqms.dto.request.LoginRequest;
import com.iqms.dto.request.RegisterRequest;
import com.iqms.dto.request.ResetPasswordRequest;
import com.iqms.dto.response.AuthResult;
import com.iqms.dto.response.TokenRefreshResult;
import com.iqms.dto.response.UserSummaryResponse;
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
import com.iqms.service.EmailService;
import com.iqms.util.RoleConstants;
import com.iqms.util.TokenHashUtil;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Unit tests for {@link AuthServiceImpl}, with every collaborator mocked so
 * the business rules (duplicate checks, lockout thresholds, token rotation,
 * password-reset expiry) are verified in isolation from Spring/DB/JWT
 * concerns.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock private UserRepository userRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private RefreshTokenRepository refreshTokenRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtTokenProvider jwtTokenProvider;
    @Mock private UserMapper userMapper;
    @Mock private EmailService emailService;

    private AuthServiceImpl authService;

    private static final JwtProperties JWT_PROPERTIES = new JwtProperties(
            "dGVzdC1zZWNyZXQ=", 900_000L, 604_800_000L, "iqms-test", "iqms_refresh_token", false);

    @BeforeEach
    void setUp() {
        authService = new AuthServiceImpl(
                userRepository, roleRepository, refreshTokenRepository, passwordEncoder,
                authenticationManager, jwtTokenProvider, JWT_PROPERTIES, userMapper, emailService);
    }

    private User buildUser() {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setUsername("jdoe");
        user.setEmail("jdoe@example.com");
        user.setPassword("$2a$hashed");
        user.setEnabled(true);
        user.setAccountNonLocked(true);
        user.setRoles(Set.of(new Role(RoleConstants.USER, "Standard user")));
        return user;
    }

    // ---------------------------------------------------------------- register

    @Test
    void register_throwsWhenUsernameAlreadyTaken() {
        RegisterRequest request = new RegisterRequest("jdoe", "jdoe@example.com", "Password1!", "John", "Doe");
        when(userRepository.existsByUsernameAndDeletedFalse("jdoe")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("username");

        verify(userRepository, never()).save(any());
    }

    @Test
    void register_throwsWhenEmailAlreadyTaken() {
        RegisterRequest request = new RegisterRequest("jdoe", "jdoe@example.com", "Password1!", "John", "Doe");
        when(userRepository.existsByUsernameAndDeletedFalse("jdoe")).thenReturn(false);
        when(userRepository.existsByEmailAndDeletedFalse("jdoe@example.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("email");
    }

    @Test
    void register_hashesPasswordAndIssuesTokenPairOnSuccess() {
        RegisterRequest request = new RegisterRequest("jdoe", "jdoe@example.com", "Password1!", "John", "Doe");
        Role userRole = new Role(RoleConstants.USER, "Standard user");
        User savedUser = buildUser();

        when(userRepository.existsByUsernameAndDeletedFalse("jdoe")).thenReturn(false);
        when(userRepository.existsByEmailAndDeletedFalse("jdoe@example.com")).thenReturn(false);
        when(roleRepository.findByName(RoleConstants.USER)).thenReturn(Optional.of(userRole));
        when(passwordEncoder.encode("Password1!")).thenReturn("$2a$hashed");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtTokenProvider.generateAccessToken(any())).thenReturn("access-token");
        when(jwtTokenProvider.generateRefreshToken(any())).thenReturn("refresh-token");
        when(jwtTokenProvider.getAccessTokenExpirationSeconds()).thenReturn(900L);
        when(userMapper.toSummary(savedUser)).thenReturn(
                new UserSummaryResponse(savedUser.getId(), "jdoe", "jdoe@example.com", "John", "Doe", null, "LIGHT", Set.of("USER")));

        AuthResult result = authService.register(request);

        assertThat(result.authResponse().accessToken()).isEqualTo("access-token");
        assertThat(result.rawRefreshToken()).isEqualTo("refresh-token");
        assertThat(result.authResponse().user().username()).isEqualTo("jdoe");

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        assertThat(userCaptor.getValue().getPassword()).isEqualTo("$2a$hashed");

        verify(refreshTokenRepository).save(any(RefreshToken.class));
    }

    // ------------------------------------------------------------------- login

    @Test
    void login_throwsWhenUserNotFound() {
        LoginRequest request = new LoginRequest("unknown", "password");
        when(userRepository.findActiveByUsernameOrEmail("unknown")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void login_throwsWhenAccountLocked() {
        User user = buildUser();
        user.setAccountNonLocked(false);
        LoginRequest request = new LoginRequest("jdoe", "password");
        when(userRepository.findActiveByUsernameOrEmail("jdoe")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(LockedException.class);
    }

    @Test
    void login_incrementsFailedAttemptsAndLocksAfterThreshold() {
        User user = buildUser();
        user.setFailedLoginAttempts(4); // one more failure should lock the account
        LoginRequest request = new LoginRequest("jdoe", "wrong-password");

        when(userRepository.findActiveByUsernameOrEmail("jdoe")).thenReturn(Optional.of(user));
        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("bad creds"));

        assertThatThrownBy(() -> authService.login(request)).isInstanceOf(BadCredentialsException.class);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getFailedLoginAttempts()).isEqualTo(5);
        assertThat(captor.getValue().isAccountNonLocked()).isFalse();
    }

    @Test
    void login_resetsFailedAttemptsAndIssuesTokensOnSuccess() {
        User user = buildUser();
        user.setFailedLoginAttempts(2);
        LoginRequest request = new LoginRequest("jdoe", "Password1!");

        when(userRepository.findActiveByUsernameOrEmail("jdoe")).thenReturn(Optional.of(user));
        when(authenticationManager.authenticate(any())).thenReturn(mock(org.springframework.security.core.Authentication.class));
        when(jwtTokenProvider.generateAccessToken(any())).thenReturn("access-token");
        when(jwtTokenProvider.generateRefreshToken(any())).thenReturn("refresh-token");
        when(jwtTokenProvider.getAccessTokenExpirationSeconds()).thenReturn(900L);
        when(userMapper.toSummary(user)).thenReturn(
                new UserSummaryResponse(user.getId(), "jdoe", "jdoe@example.com", null, null, null, "LIGHT", Set.of("USER")));

        AuthResult result = authService.login(request);

        assertThat(result.authResponse().accessToken()).isEqualTo("access-token");
        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getFailedLoginAttempts()).isZero();
    }

    // ----------------------------------------------------------------- refresh

    @Test
    void refresh_throwsWhenNoTokenPresented() {
        assertThatThrownBy(() -> authService.refresh(null)).isInstanceOf(InvalidTokenException.class);
        assertThatThrownBy(() -> authService.refresh("  ")).isInstanceOf(InvalidTokenException.class);
    }

    @Test
    void refresh_throwsWhenTokenNotRecognizedInDatabase() {
        String rawToken = "raw-refresh-token";
        Claims claims = mock(Claims.class);
        when(jwtTokenProvider.parseClaims(rawToken)).thenReturn(claims);
        when(jwtTokenProvider.isRefreshToken(claims)).thenReturn(true);
        when(refreshTokenRepository.findByTokenHash(TokenHashUtil.sha256(rawToken))).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.refresh(rawToken)).isInstanceOf(InvalidTokenException.class);
    }

    @Test
    void refresh_throwsWhenStoredTokenIsRevoked() {
        String rawToken = "raw-refresh-token";
        User user = buildUser();
        RefreshToken stored = new RefreshToken(TokenHashUtil.sha256(rawToken), user, LocalDateTime.now().plusDays(1));
        stored.setRevoked(true);

        Claims claims = mock(Claims.class);
        when(jwtTokenProvider.parseClaims(rawToken)).thenReturn(claims);
        when(jwtTokenProvider.isRefreshToken(claims)).thenReturn(true);
        when(refreshTokenRepository.findByTokenHash(TokenHashUtil.sha256(rawToken))).thenReturn(Optional.of(stored));

        assertThatThrownBy(() -> authService.refresh(rawToken)).isInstanceOf(InvalidTokenException.class);
    }

    @Test
    void refresh_rotatesTokenAndIssuesNewPairOnSuccess() {
        String rawToken = "raw-refresh-token";
        User user = buildUser();
        RefreshToken stored = new RefreshToken(TokenHashUtil.sha256(rawToken), user, LocalDateTime.now().plusDays(1));

        Claims claims = mock(Claims.class);
        when(jwtTokenProvider.parseClaims(rawToken)).thenReturn(claims);
        when(jwtTokenProvider.isRefreshToken(claims)).thenReturn(true);
        when(refreshTokenRepository.findByTokenHash(TokenHashUtil.sha256(rawToken))).thenReturn(Optional.of(stored));
        when(jwtTokenProvider.generateAccessToken(any())).thenReturn("new-access-token");
        when(jwtTokenProvider.generateRefreshToken(user.getId())).thenReturn("new-refresh-token");
        when(jwtTokenProvider.getAccessTokenExpirationSeconds()).thenReturn(900L);

        TokenRefreshResult result = authService.refresh(rawToken);

        assertThat(result.tokenRefreshResponse().accessToken()).isEqualTo("new-access-token");
        assertThat(result.rawRefreshToken()).isEqualTo("new-refresh-token");
        assertThat(stored.isRevoked()).isTrue(); // old token consumed (rotation)
        verify(refreshTokenRepository, times(2)).save(any(RefreshToken.class)); // revoke old + persist new
    }

    // ------------------------------------------------------------------ logout

    @Test
    void logout_noOpsWhenNoTokenPresented() {
        authService.logout(null);
        verify(refreshTokenRepository, never()).findByTokenHash(anyString());
    }

    @Test
    void logout_revokesMatchingStoredToken() {
        String rawToken = "raw-refresh-token";
        User user = buildUser();
        RefreshToken stored = new RefreshToken(TokenHashUtil.sha256(rawToken), user, LocalDateTime.now().plusDays(1));
        when(refreshTokenRepository.findByTokenHash(TokenHashUtil.sha256(rawToken))).thenReturn(Optional.of(stored));

        authService.logout(rawToken);

        assertThat(stored.isRevoked()).isTrue();
        verify(refreshTokenRepository).save(stored);
    }

    // ------------------------------------------------------------ forgot/reset

    @Test
    void forgotPassword_sendsEmailWhenAccountExists() {
        User user = buildUser();
        ForgotPasswordRequest request = new ForgotPasswordRequest("jdoe@example.com");
        when(userRepository.findByEmailAndDeletedFalse("jdoe@example.com")).thenReturn(Optional.of(user));

        authService.forgotPassword(request);

        verify(userRepository).save(user);
        assertThat(user.getPasswordResetToken()).isNotBlank();
        assertThat(user.getPasswordResetExpiry()).isAfter(LocalDateTime.now());
        verify(emailService).sendPasswordResetEmail(eq("jdoe@example.com"), eq("jdoe"), anyString());
    }

    @Test
    void forgotPassword_silentlyNoOpsWhenAccountDoesNotExist() {
        ForgotPasswordRequest request = new ForgotPasswordRequest("unknown@example.com");
        when(userRepository.findByEmailAndDeletedFalse("unknown@example.com")).thenReturn(Optional.empty());

        authService.forgotPassword(request);

        verify(emailService, never()).sendPasswordResetEmail(anyString(), anyString(), anyString());
    }

    @Test
    void resetPassword_throwsWhenTokenUnknown() {
        ResetPasswordRequest request = new ResetPasswordRequest("bad-token", "NewPassword1!");
        when(userRepository.findByPasswordResetTokenAndDeletedFalse(anyString())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.resetPassword(request)).isInstanceOf(InvalidTokenException.class);
    }

    @Test
    void resetPassword_throwsWhenTokenExpired() {
        User user = buildUser();
        user.setPasswordResetToken(TokenHashUtil.sha256("token"));
        user.setPasswordResetExpiry(LocalDateTime.now().minusMinutes(1));
        ResetPasswordRequest request = new ResetPasswordRequest("token", "NewPassword1!");
        when(userRepository.findByPasswordResetTokenAndDeletedFalse(TokenHashUtil.sha256("token")))
                .thenReturn(Optional.of(user));

        assertThatThrownBy(() -> authService.resetPassword(request)).isInstanceOf(InvalidTokenException.class);
    }

    @Test
    void resetPassword_updatesPasswordAndRevokesAllRefreshTokensOnSuccess() {
        User user = buildUser();
        user.setPasswordResetToken(TokenHashUtil.sha256("token"));
        user.setPasswordResetExpiry(LocalDateTime.now().plusMinutes(10));
        ResetPasswordRequest request = new ResetPasswordRequest("token", "NewPassword1!");

        when(userRepository.findByPasswordResetTokenAndDeletedFalse(TokenHashUtil.sha256("token")))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.encode("NewPassword1!")).thenReturn("$2a$newhash");

        authService.resetPassword(request);

        assertThat(user.getPassword()).isEqualTo("$2a$newhash");
        assertThat(user.getPasswordResetToken()).isNull();
        assertThat(user.getPasswordResetExpiry()).isNull();
        verify(refreshTokenRepository).revokeAllForUser(user);
        verify(userRepository).save(user);
    }
}
