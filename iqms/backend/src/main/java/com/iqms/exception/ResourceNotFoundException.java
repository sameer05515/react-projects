package com.iqms.exception;

import java.io.Serial;

/**
 * Thrown when a requested entity cannot be located, e.g. by id.
 * Translated by {@link GlobalExceptionHandler} into a 404 response.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public class ResourceNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException(String message) {
        super(message);
    }

    /**
     * Convenience constructor producing a consistent "X not found with Y: Z" message.
     *
     * @param resourceName the entity type, e.g. "Question"
     * @param fieldName    the lookup field, e.g. "id"
     * @param fieldValue   the value that was searched for
     */
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super("%s not found with %s: '%s'".formatted(resourceName, fieldName, fieldValue));
    }
}
