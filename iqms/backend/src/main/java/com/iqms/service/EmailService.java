package com.iqms.service;

/**
 * Sends transactional emails. Sending is fire-and-forget from the caller's
 * perspective (see {@code @Async} on the implementation) so a slow SMTP
 * connection never adds latency to the HTTP response.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public interface EmailService {

    /**
     * Sends a password-reset email containing a link back to the frontend's
     * reset-password page with the raw (unhashed) token embedded.
     *
     * @param toEmail    the recipient's email address
     * @param username   the recipient's username, for personalization
     * @param rawToken   the unhashed reset token to embed in the link
     */
    void sendPasswordResetEmail(String toEmail, String username, String rawToken);
}
