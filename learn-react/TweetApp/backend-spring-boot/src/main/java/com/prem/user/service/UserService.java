package com.prem.user.service;

import com.prem.base.exception.CustomValidationException;
import com.prem.base.util.JwtUtil;
import com.prem.user.dto.UserDto;
import com.prem.user.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.prem.user.repository.UserRepository;
import com.prem.user.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserUtil userUtil;

    @Autowired
    private JwtUtil jwtUtil;

//    private static final String SECRET_KEY = "your-secret-key";

    public String registerUser(UserDto userData) {
        String username = userData.getUsername();
        String password = userData.getPassword();

        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new CustomValidationException("Username is already taken.");
        }

        String hashedPassword = passwordEncoder.encode(password);

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(hashedPassword);
        newUser.setName(userData.getName());
        newUser.setEmail(userData.getEmail());
        newUser.setMobileNumber(userData.getMobileNumber());
        newUser.setRole("user");

        userRepository.save(newUser);

        return jwtUtil.generateToken(newUser);
    }

    public String loginUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty() || !passwordEncoder.matches(password, user.get().getPassword())) {
            throw new CustomValidationException("Invalid username or password");
        }

        return jwtUtil.generateToken(user.get());
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> {
                    user.setPassword(null); // Exclude password
                    return user;
                })
                .map(userUtil::convertToResponse)
                .collect(Collectors.toList());
    }

    public UserDto updateUserRole(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomValidationException("User not found"));

        user.setRole("admin");
        user= userRepository.save(user);
        return userUtil.convertToResponse(user);
    }

    public UserDto getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomValidationException("User not found"));
        user.setPassword(null); // Exclude password
        return userUtil.convertToResponse(user);
    }

    public UserDto updateUserById(String userId, UserDto updatedData){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomValidationException("User not found"));

        user.setUsername(Optional.ofNullable(updatedData.getUsername()).orElse(user.getUsername()));
        user.setName(Optional.ofNullable(updatedData.getName()).orElse(user.getName()));
        user.setEmail(Optional.ofNullable(updatedData.getEmail()).orElse(user.getEmail()));
        user.setMobileNumber(Optional.ofNullable(updatedData.getMobileNumber()).orElse(user.getMobileNumber()));

        user= userRepository.save(user);
        return userUtil.convertToResponse(user);
    }

//    private String generateToken(User user) {
//        return Jwts.builder()
//                .setSubject(user.getUsername())
//                .claim("userId", user.getId())
//                .claim("userName", user.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
////                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours expiration
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 1)) // 10 hours expiration
//                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
//                .compact();
//    }
}
