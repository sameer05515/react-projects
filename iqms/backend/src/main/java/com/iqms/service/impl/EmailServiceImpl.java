package com.iqms.service.impl;

import com.iqms.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * {@link EmailService} implementation backed by Spring's {@link JavaMailSender}.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${iqms.frontend.reset-password-url}")
    private String resetPasswordUrl;

    @Override
    @Async
    public void sendPasswordResetEmail(String toEmail, String username, String rawToken) {
        String link = "%s?token=%s".formatted(resetPasswordUrl, rawToken);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("Reset your IQMS password");
            helper.setText("""
                    Hi %s,

                    We received a request to reset your IQMS password. This link is valid for 30 minutes:

                    %s

                    If you didn't request this, you can safely ignore this email — your password will not be changed.

                    — IQMS
                    """.formatted(username, link));

            mailSender.send(message);
            log.info("Password reset email dispatched to {}", maskEmail(toEmail));
        } catch (Exception ex) {
            // Deliberately does not rethrow: a failed email should not surface as a
            // 500 to the caller, and AuthService's forgot-password flow never
            // reveals whether an account exists based on this outcome anyway.
            log.error("Failed to send password reset email to {}: {}", maskEmail(toEmail), ex.getMessage());
        }
    }

    private String maskEmail(String email) {
        int at = email.indexOf('@');
        if (at <= 1) {
            return "***" + email.substring(Math.max(at, 0));
        }
        return email.charAt(0) + "***" + email.substring(at);
    }
}
