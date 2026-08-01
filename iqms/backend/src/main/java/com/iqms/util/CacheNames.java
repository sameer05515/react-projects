package com.iqms.util;

/**
 * Names of the Redis cache regions used across service classes via
 * {@code @Cacheable}/{@code @CacheEvict}. Centralized to avoid typos causing
 * silent cache misses.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
public final class CacheNames {

    public static final String TECHNOLOGIES = "technologies";
    public static final String CATEGORIES = "categories";
    public static final String COMPANIES = "companies";
    public static final String TAGS = "tags";
    public static final String DASHBOARD_STATS = "dashboardStats";

    private CacheNames() {
        // Utility class; no instances.
    }
}
