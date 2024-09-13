package com.prem.base.util;

import com.prem.base.filter.AuthoritiesLoggingAfterFilter;
import com.prem.base.filter.JwtRequestFilter;
import com.prem.base.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

//    @Autowired
//    private CustomUserDetailsService customUserDetailsService; // Inject the UserDetailsService

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF (optional, enable it for non-REST apps)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/users/login", "/users/register").permitAll() // Make /login and /register public
//                        .requestMatchers("/users").hasAuthority("ROLE_ADMIN")
                        .anyRequest().authenticated() // Require authentication for other requests
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless for JWT
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class) // Add JWT filter before UsernamePasswordAuthenticationFilter
                .addFilterAfter(new AuthoritiesLoggingAfterFilter(), BasicAuthenticationFilter.class)
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling
                                .authenticationEntryPoint((request, response, authException) -> {
                                    // Handle unauthorized access here (e.g., send a 401 response)
                                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                                })
                )
                .formLogin(form -> form.disable()) // Disable default form login
                //.httpBasic(httpSecurityHttpBasicConfigurer -> httpSecurityHttpBasicConfigurer.disable())
                .logout(logout ->
                        logout.logoutUrl("/users/logout") // Define logout URL
                                .logoutSuccessUrl("/users/login") // Redirect after successful logout
                                .invalidateHttpSession(true) // Invalidate session on logout
                );

        return http.build();
    }

    //,"/api/my-resume/get"

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
