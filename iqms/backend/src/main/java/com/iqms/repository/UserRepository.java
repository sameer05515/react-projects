package com.iqms.repository;

import com.iqms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

/**
 * Data access for {@link User}.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsernameAndDeletedFalse(String username);

    Optional<User> findByEmailAndDeletedFalse(String email);

    /**
     * Looks up an active user by either username or email, supporting
     * login forms that accept either identifier in a single field.
     *
     * <p>Written as explicit JPQL rather than a derived query name: a
     * derived {@code findByUsernameOrEmailAndDeletedFalse} would parse as
     * {@code username = ?1 OR (email = ?2 AND deleted = false)} under
     * standard AND/OR precedence, which would incorrectly match a
     * soft-deleted user by username alone.</p>
     */
    @Query("SELECT u FROM User u WHERE (u.username = :identifier OR u.email = :identifier) AND u.deleted = false")
    Optional<User> findActiveByUsernameOrEmail(@Param("identifier") String identifier);

    Optional<User> findByPasswordResetTokenAndDeletedFalse(String passwordResetToken);

    boolean existsByUsernameAndDeletedFalse(String username);

    boolean existsByEmailAndDeletedFalse(String email);
}
