package com.iqms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Server-side record of an issued refresh token, keyed by a SHA-256 hash of
 * the token value (never the raw token) so that a database compromise alone
 * cannot be used to forge sessions.
 *
 * <p>Deliberately does <b>not</b> extend {@link BaseEntity}: refresh tokens
 * are hard-revoked (not soft-deleted) and are never concurrently edited by
 * two clients, so the auditing/versioning columns that entity provides
 * don't apply here — see {@code refresh_tokens} in
 * {@code V1__init_schema.sql} for the matching lean schema.</p>
 *
 * <p>Persisting refresh tokens (rather than trusting JWT expiry alone) is
 * what makes {@code POST /api/auth/logout} and future "sign out other
 * devices" functionality possible — the token can be individually revoked
 * server-side.</p>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class RefreshToken {

    @Id
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false, length = 36)
    private UUID id;

    @Column(name = "token", nullable = false, unique = true, length = 500)
    private String tokenHash;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "expiry_date", nullable = false)
    private LocalDateTime expiryDate;

    @Column(name = "revoked", nullable = false)
    private boolean revoked = false;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    public RefreshToken(String tokenHash, User user, LocalDateTime expiryDate) {
        this.tokenHash = tokenHash;
        this.user = user;
        this.expiryDate = expiryDate;
    }

    /**
     * @return {@code true} if this token is neither revoked nor past its expiry.
     */
    public boolean isValid() {
        return !revoked && expiryDate.isAfter(LocalDateTime.now());
    }
}
