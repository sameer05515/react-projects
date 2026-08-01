package com.iqms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A named permission grouping ({@code ADMIN}, {@code USER}) assigned to
 * users via the {@code user_roles} join table. See
 * {@link com.iqms.util.RoleConstants} for the canonical role names and the
 * fixed ids seeded by {@code V2__seed_roles.sql}.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Role extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true, length = 50)
    private String name;

    @Column(name = "description", length = 255)
    private String description;

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
