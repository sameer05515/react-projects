package com.tweetapp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("TweetApp API Documentation")
                        .version("1.0.0")
                        .description("Spring Boot 2 backend implementation for TweetApp APIs")
                        .contact(new Contact()
                                .name("TweetApp Team")
                                .email("support@tweetapp.com")));
    }
}

