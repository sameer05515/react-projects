package com.iqms.exception;

import java.io.Serial;

/**
 * Thrown when a JWT access/refresh token or a password-reset token is
 * missing, malformed, expired, or has been revoked.
 * Translated by {@link GlobalExceptionHandler} into a 401 response.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public class InvalidTokenException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public InvalidTokenException(String message) {
        super(message);
    }
}
