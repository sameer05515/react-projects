package com.prem.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.prem.user.dto.UserDto;
import com.prem.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userData) {
//        try {
            String result = userService.registerUser(userData);
            return ResponseEntity.status(201).body(result);
//        } catch (UserAlreadyExistsException e) {
//            return ResponseEntity.status(400).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("An error occurred while registering the user.");
//        }
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto loginRequest) {
//        try {
            String token = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
            return ResponseEntity.ok().body(token);
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("Invalid username or password.");
//        }
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        try {
            List<UserDto> users = userService.getAllUsers();
            return ResponseEntity.ok().body(users);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Update user role to admin
    @PutMapping("/{userId}/admin")
    public ResponseEntity<?> updateUserRole(@PathVariable String userId) {
//        try {
            UserDto user = userService.updateUserRole(userId);
            return ResponseEntity.ok().body(user);
//        } catch (UserNotFoundException e) {
//            return ResponseEntity.status(404).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error updating user role.");
//        }
    }

    // Get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
//        try {
            UserDto user = userService.getUserById(userId);
            return ResponseEntity.ok().body(user);
//        } catch (UserNotFoundException e) {
//            return ResponseEntity.status(404).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error fetching user.");
//        }
    }

    // Update user by ID
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUserById(@PathVariable String userId, @RequestBody UserDto userData) {
//        try {
            UserDto updatedUser = userService.updateUserById(userId, userData);
            return ResponseEntity.ok().body(updatedUser);
//        } catch (UserNotFoundException e) {
//            return ResponseEntity.status(404).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error updating user.");
//        }
    }
}
