package com.iqms.service;

import com.iqms.dto.request.ForgotPasswordRequest;
import com.iqms.dto.request.LoginRequest;
import com.iqms.dto.request.RegisterRequest;
import com.iqms.dto.request.ResetPasswordRequest;
import com.iqms.dto.response.AuthResult;
import com.iqms.dto.response.TokenRefreshResult;

/**
 * Authentication and account-lifecycle operations: registration, login,
 * token refresh/rotation, logout, and password reset.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public interface AuthService {

    /**
     * Registers a new user with the {@code USER} role, hashing their
     * password and immediately issuing an access/refresh token pair so they
     * are signed in on completion.
     *
     * @param request the registration payload
     * @return the new user's access token, profile, and raw refresh token
     * @throws com.iqms.exception.DuplicateResourceException if the username or email is already taken
     */
    AuthResult register(RegisterRequest request);

    /**
     * Authenticates a user by username/email and password, resetting their
     * failed-login counter on success and incrementing it (with a lockout
     * threshold) on failure.
     *
     * @param request the login payload
     * @return the authenticated user's access token, profile, and raw refresh token
     */
    AuthResult login(LoginRequest request);

    /**
     * Validates a presented refresh token against the persisted, hashed
     * record, revokes it, and issues a new access/refresh token pair
     * (rotation), reducing the blast radius of a leaked refresh token.
     *
     * @param presentedRefreshToken the raw refresh token read from the request cookie
     * @return a new access token and the newly rotated raw refresh token
     * @throws com.iqms.exception.InvalidTokenException if the token is missing, expired, revoked, or unknown
     */
    TokenRefreshResult refresh(String presentedRefreshToken);

    /**
     * Revokes the presented refresh token so it can no longer be used, even
     * if it has not yet expired. Silently no-ops if no token is presented —
     * logout should never fail from the client's perspective.
     *
     * @param presentedRefreshToken the raw refresh token read from the request cookie, or {@code null}
     */
    void logout(String presentedRefreshToken);

    /**
     * Issues a single-use, time-boxed password-reset token and emails it to
     * the account, if one exists for the given address. Always returns
     * successfully regardless of whether the email is registered, to avoid
     * leaking account existence.
     *
     * @param request the forgot-password payload
     */
    void forgotPassword(ForgotPasswordRequest request);

    /**
     * Consumes a password-reset token, sets the new password, and revokes
     * every existing refresh token for the account (forcing re-login
     * everywhere) as a precaution.
     *
     * @param request the reset-password payload
     * @throws com.iqms.exception.InvalidTokenException if the token is invalid or expired
     */
    void resetPassword(ResetPasswordRequest request);
}
