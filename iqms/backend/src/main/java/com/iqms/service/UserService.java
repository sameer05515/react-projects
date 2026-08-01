package com.iqms.service;

import com.iqms.dto.response.UserSummaryResponse;

import java.util.UUID;

/**
 * Operations on the currently authenticated user's own profile.
 * Administrative user management (listing/editing other users) is out of
 * scope for Phase 2 and will be added alongside RBAC-restricted admin
 * endpoints in a later phase.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public interface UserService {

    /**
     * @param userId the authenticated user's id, from {@link com.iqms.security.JwtPrincipal}
     * @return the user's public profile
     * @throws com.iqms.exception.ResourceNotFoundException if the user no longer exists (e.g. deleted after token issuance)
     */
    UserSummaryResponse getCurrentUser(UUID userId);

    /**
     * Updates the authenticated user's theme preference.
     *
     * @param userId the authenticated user's id
     * @param theme  {@code "LIGHT"} or {@code "DARK"}
     * @return the updated public profile
     */
    UserSummaryResponse updateThemePreference(UUID userId, String theme);
}
