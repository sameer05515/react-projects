package com.iqms.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;

/**
 * Uniform response envelope returned by every REST endpoint in IQMS.
 *
 * <p>Wrapping every response in this shape gives frontend clients a single,
 * predictable contract to parse regardless of endpoint, and keeps success and
 * error payloads structurally consistent.</p>
 *
 * @param <T> the type of the payload carried in {@code data}
 * @author IQMS Engineering
 * @since 1.0.0
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        boolean success,
        String message,
        T data,
        LocalDateTime timestamp,
        Object errors
) {

    /**
     * Builds a successful response carrying a payload.
     *
     * @param data    the payload to return
     * @param message a human-readable success message
     * @param <T>     payload type
     * @return a populated success {@link ApiResponse}
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, message, data, LocalDateTime.now(), null);
    }

    /**
     * Builds a successful response with a default message.
     *
     * @param data payload to return
     * @param <T>  payload type
     * @return a populated success {@link ApiResponse}
     */
    public static <T> ApiResponse<T> success(T data) {
        return success(data, "Request completed successfully");
    }

    /**
     * Builds an error response with no structured error detail.
     *
     * @param message human-readable error description
     * @param <T>     payload type (unused, present for call-site inference)
     * @return a populated error {@link ApiResponse}
     */
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null, LocalDateTime.now(), null);
    }

    /**
     * Builds an error response with structured error detail (e.g. field
     * validation errors).
     *
     * @param message human-readable error description
     * @param errors  structured error detail, typically a map of field to message
     * @param <T>     payload type (unused, present for call-site inference)
     * @return a populated error {@link ApiResponse}
     */
    public static <T> ApiResponse<T> error(String message, Object errors) {
        return new ApiResponse<>(false, message, null, LocalDateTime.now(), errors);
    }
}
