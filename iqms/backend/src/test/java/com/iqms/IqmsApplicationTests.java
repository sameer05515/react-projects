package com.iqms;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Smoke test verifying the full Spring application context wires up
 * correctly (all beans, JPA metamodel, security filter chain, cache
 * manager) against the H2-backed {@code test} profile.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@SpringBootTest
@ActiveProfiles("test")
class IqmsApplicationTests {

    @Test
    void contextLoads() {
        // Intentionally empty: a failing context load fails this test.
    }
}
