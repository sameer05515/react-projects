package com.iqms.exception;

import java.io.Serial;

/**
 * Thrown when a request is well-formed and authorized but violates a
 * domain business rule (e.g. deleting a company still referenced by
 * questions). Translated by {@link GlobalExceptionHandler} into a 422 response.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public class BusinessRuleException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public BusinessRuleException(String message) {
        super(message);
    }
}
