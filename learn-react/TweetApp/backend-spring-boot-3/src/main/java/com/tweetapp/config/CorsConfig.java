package com.tweetapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${spring.web.cors.allowed-origins:http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:4200,http://localhost:5174,http://127.0.0.1:3000,http://127.0.0.1:3001,http://127.0.0.1:3002,http://127.0.0.1:4200,http://127.0.0.1:5174}")
    private String allowedOrigins;

    @Value("${spring.web.cors.allowed-methods:GET,POST,PUT,DELETE,OPTIONS,PATCH}")
    private String allowedMethods;

    @Value("${spring.web.cors.allowed-headers:*}")
    private String allowedHeaders;

    @Value("${spring.web.cors.allow-credentials:true}")
    private boolean allowCredentials;

    @Value("${spring.web.cors.max-age:3600}")
    private long maxAge;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Set allowed origins
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        origins.forEach(origin -> config.addAllowedOrigin(origin.trim()));
        
        // Set allowed methods
        List<String> methods = Arrays.asList(allowedMethods.split(","));
        methods.forEach(method -> config.addAllowedMethod(method.trim()));
        
        // Set allowed headers
        if ("*".equals(allowedHeaders)) {
            config.addAllowedHeader("*");
        } else {
            List<String> headers = Arrays.asList(allowedHeaders.split(","));
            headers.forEach(header -> config.addAllowedHeader(header.trim()));
        }
        
        // Set credentials
        config.setAllowCredentials(allowCredentials);
        
        // Set max age for preflight requests
        config.setMaxAge(maxAge);
        
        // Expose headers that might be needed by the frontend
        config.addExposedHeader("Content-Type");
        config.addExposedHeader("Authorization");
        config.addExposedHeader("X-Total-Count");
        
        // Apply CORS configuration to all paths
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}

