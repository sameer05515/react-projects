package com.iqms.repository;

import com.iqms.entity.RefreshToken;
import com.iqms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * Data access for {@link RefreshToken}.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    /** Revokes every active refresh token for a user, e.g. on password reset. */
    @Modifying
    @Query("UPDATE RefreshToken rt SET rt.revoked = true WHERE rt.user = :user AND rt.revoked = false")
    void revokeAllForUser(@Param("user") User user);

    /** Deletes expired tokens; invoked by the scheduled cleanup job. */
    @Modifying
    @Query("DELETE FROM RefreshToken rt WHERE rt.expiryDate < :now")
    void deleteAllExpired(@Param("now") LocalDateTime now);
}
