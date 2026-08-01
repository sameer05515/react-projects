package com.iqms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Entry point for the Interview Question Management System (IQMS) backend.
 *
 * <p>Bootstraps the Spring application context and enables the cross-cutting
 * infrastructure the rest of the system depends on:</p>
 * <ul>
 *     <li>{@link EnableJpaAuditing} — populates {@code createdDate}, {@code updatedDate},
 *     {@code createdBy} and {@code lastModifiedBy} on all auditable entities.</li>
 *     <li>{@link EnableCaching} — backs the Redis-based caching layer used by
 *     lookup-heavy services (technologies, categories, companies, tags).</li>
 *     <li>{@link EnableAsync} — allows fire-and-forget operations such as audit
 *     log persistence and email dispatch to run off the request thread.</li>
 *     <li>{@link EnableScheduling} — powers the spaced-repetition revision
 *     scheduler and any future housekeeping jobs.</li>
 * </ul>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableCaching
@EnableAsync
@EnableScheduling
public class IqmsApplication {

    /**
     * Application bootstrap method.
     *
     * @param args standard JVM command-line arguments, forwarded to Spring Boot.
     */
    public static void main(String[] args) {
        SpringApplication.run(IqmsApplication.class, args);
    }
}
