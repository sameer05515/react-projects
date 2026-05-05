package com.tweetapp.service;

import com.tweetapp.model.User;
import com.tweetapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public User register(Map<String, Object> userData) {
        String username = (String) userData.get("username");
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode((String) userData.get("password")));
        user.setName((String) userData.get("name"));
        user.setEmail((String) userData.get("email"));
        user.setMobileNumber((String) userData.get("mobileNumber"));
        user.setRole(userData.get("role") != null ? (String) userData.get("role") : "user");
        return userRepository.save(user);
    }
    
    public Map<String, String> login(Map<String, Object> loginData) {
        String username = (String) loginData.get("username");
        String password = (String) loginData.get("password");
        
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                // In a real application, generate a JWT token here
                return Map.of("token", "mock-jwt-token-" + user.getId(), "username", user.getUsername());
            }
        }
        throw new RuntimeException("Invalid username or password");
    }
}

