package com.iqms.exception;

import java.io.Serial;

/**
 * Thrown when an operation would violate a uniqueness constraint
 * (e.g. registering a username or email that already exists).
 * Translated by {@link GlobalExceptionHandler} into a 409 response.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public class DuplicateResourceException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String resourceName, String fieldName, Object fieldValue) {
        super("%s already exists with %s: '%s'".formatted(resourceName, fieldName, fieldValue));
    }
}
