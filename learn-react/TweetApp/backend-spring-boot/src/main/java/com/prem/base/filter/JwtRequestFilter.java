package com.prem.base.filter;

import com.prem.base.exception.CustomValidationException;
import com.prem.base.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//
//        final String authorizationHeader = request.getHeader("Authorization");
//
//        String username = null;
//        String jwt = null;
//
//        // Check if the Authorization header is present and starts with "Bearer"
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            jwt = authorizationHeader.substring(7);
//            try {
//                username = jwtUtil.extractUserName(jwt); // Extract username from JWT token
//            } catch (ExpiredJwtException e) {
//                System.out.println("JWT Token has expired");
//                throw new CustomValidationException("JWT Token has expired");
//            }
//        }
//
//        // If the token is valid and no authentication is present
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            // Load the user details from your UserDetailsService
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//
//            // Validate the token and set authentication
//            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
//                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities());
//                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//            }
//        }
//        chain.doFilter(request, response); // Proceed with the request
//    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//
//        final String authorizationHeader = request.getHeader("Authorization");
//
//        String username = null;
//        String jwt = null;
//
//        // Check if the Authorization header is present and starts with "Bearer"
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            jwt = authorizationHeader.substring(7);
//            try {
//                username = jwtUtil.extractUserName(jwt); // Extract username from JWT token
//            } catch (ExpiredJwtException e) {
//                // Handle expired JWT exception
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                response.getWriter().write("JWT Token has expired");
//                return; // End the filter chain
//            } catch (CustomValidationException e) {
//                // Handle custom validation exception
//                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//                response.getWriter().write(e.getMessage());
//                return; // End the filter chain
//            }
//        }
//
//        // If the token is valid and no authentication is present
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            // Load the user details from your UserDetailsService
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//
//            // Validate the token and set authentication
//            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
//                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities());
//                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//            }
//        }
//
//        chain.doFilter(request, response); // Proceed with the request
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // Check if the Authorization header is present and starts with "Bearer"
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUserName(jwt); // Extract username from JWT token
            } catch (ExpiredJwtException e) {
                // Handle expired JWT exception
                handleException(response, HttpStatus.UNAUTHORIZED, "JWT Token has expired");
                return; // End the filter chain
            } catch (CustomValidationException e) {
                // Handle custom validation exception
                handleException(response, HttpStatus.BAD_REQUEST, e.getMessage());
                return; // End the filter chain
            }
        }

        // If the token is valid and no authentication is present
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load the user details from your UserDetailsService
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // Validate the token and set authentication
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        chain.doFilter(request, response); // Proceed with the request
    }

    // Method to handle exceptions and send ResponseEntity
    private void handleException(HttpServletResponse response, HttpStatus status, String message) throws IOException {
        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }


}
