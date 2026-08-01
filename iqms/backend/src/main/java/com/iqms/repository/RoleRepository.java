package com.iqms.repository;

import com.iqms.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * Data access for {@link Role}. Roles are static reference data (seeded by
 * {@code V2__seed_roles.sql}), so this repository is intentionally minimal.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public interface RoleRepository extends JpaRepository<Role, UUID> {

    Optional<Role> findByName(String name);
}
