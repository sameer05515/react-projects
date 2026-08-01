package com.iqms.config;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;

/**
 * Enables component-scanning for {@code @ConfigurationProperties} record
 * classes under {@code com.iqms.config} (currently {@link JwtProperties}).
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Configuration
@ConfigurationPropertiesScan("com.iqms.config")
public class PropertiesConfig {
}
