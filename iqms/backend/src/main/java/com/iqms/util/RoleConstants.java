package com.iqms.util;

/**
 * Role name constants used by {@code @PreAuthorize} expressions and role
 * lookups. Values and ids must stay in sync with
 * {@code db/migration/V2__seed_roles.sql}.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public final class RoleConstants {

    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";

    public static final String ADMIN_ID = "00000000-0000-0000-0000-000000000001";
    public static final String USER_ID = "00000000-0000-0000-0000-000000000002";

    private RoleConstants() {
        // Utility class; no instances.
    }
}
