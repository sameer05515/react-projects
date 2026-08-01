package com.iqms.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Resolves the "current auditor" (i.e. the username to stamp on
 * {@code createdBy}/{@code updatedBy}) from the Spring Security context.
 *
 * <p>Falls back to {@code "system"} for requests executed outside an
 * authenticated context, such as scheduled jobs or Flyway-driven bootstrapping.</p>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Component("auditorAware")
public class AuditorAwareImpl implements AuditorAware<String> {

    private static final String SYSTEM_AUDITOR = "system";

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            return Optional.of(SYSTEM_AUDITOR);
        }
        return Optional.of(authentication.getName());
    }
}
