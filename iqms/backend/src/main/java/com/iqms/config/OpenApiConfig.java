package com.iqms.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configures the OpenAPI/Swagger document served at {@code /api-docs} and
 * rendered at {@code /swagger-ui.html}.
 *
 * <p>Registers a reusable {@code bearerAuth} security scheme so every
 * protected endpoint shows the "Authorize" padlock in Swagger UI without
 * each controller needing to redeclare it.</p>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Configuration
public class OpenApiConfig {

    private static final String BEARER_SCHEME_NAME = "bearerAuth";

    /**
     * Builds the root {@link OpenAPI} document metadata and global security scheme.
     *
     * @return the configured {@link OpenAPI} bean consumed by springdoc.
     */
    @Bean
    public OpenAPI iqmsOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Interview Question Management System API")
                        .description("REST API for managing interview questions, answers, code snippets, "
                                + "interview experiences, revisions, and related lookup data.")
                        .version("1.0.0")
                        .contact(new Contact().name("IQMS Engineering").email("engineering@iqms.local"))
                        .license(new License().name("Proprietary")))
                .addSecurityItem(new SecurityRequirement().addList(BEARER_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(BEARER_SCHEME_NAME, new SecurityScheme()
                                .name(BEARER_SCHEME_NAME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Provide the access token obtained from POST /api/auth/login")));
    }
}
