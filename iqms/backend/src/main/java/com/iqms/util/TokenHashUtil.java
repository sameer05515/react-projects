package com.iqms.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;

/**
 * SHA-256 hashing for tokens (refresh tokens, password-reset tokens) before
 * they are persisted, and secure random token generation for password reset.
 *
 * <p>Hashing is one-way and deterministic, which is exactly what's needed
 * here: on presentation, the incoming token is hashed the same way and
 * compared to the stored hash, without ever storing a token an attacker
 * could directly reuse from a database dump.</p>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public final class TokenHashUtil {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private TokenHashUtil() {
        // Utility class; no instances.
    }

    /**
     * @param rawToken the raw token value
     * @return the lowercase hex-encoded SHA-256 digest of {@code rawToken}
     */
    public static String sha256(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException ex) {
            // SHA-256 is guaranteed available on every standard JVM; this branch is unreachable in practice.
            throw new IllegalStateException("SHA-256 algorithm unavailable", ex);
        }
    }

    /**
     * Generates a cryptographically secure, URL-safe random token suitable
     * for password-reset links.
     *
     * @return a 43-character Base64URL-encoded, unpadded random token (256 bits of entropy)
     */
    public static String generateSecureToken() {
        byte[] bytes = new byte[32];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
