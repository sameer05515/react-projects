package com.prem.base.service;

import com.prem.user.entity.Authority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.prem.user.entity.User; // Import your User entity
import com.prem.user.repository.UserRepository; // Import your User repository

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find user by username from your MongoDB repository
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        List<Authority> authoritiesList= List.of(
                Authority.builder().name("ROLE_USER").build()
//                        ,Authority.builder().name("ROLE_ADMIN").build()
        );

//        List<GrantedAuthority> authorities = user.getAuthorities().stream().map(authority -> new
//                SimpleGrantedAuthority(authority.getName())).collect(Collectors.toList());
        List<GrantedAuthority> authorities = authoritiesList.stream().map(authority -> new
                SimpleGrantedAuthority(authority.getName())).collect(Collectors.toList());

        // Map the user entity to Spring Security UserDetails
        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getUsername())
                .password(user.getPassword()) // Return the encoded password
                .authorities(authorities) // Provide user roles, here a basic ROLE_USER
                .build();
    }
}
