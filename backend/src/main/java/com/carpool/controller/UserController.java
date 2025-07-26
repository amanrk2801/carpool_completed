package com.carpool.controller;

import com.carpool.dto.UserLoginDTO;
import com.carpool.dto.UserRegistrationDTO;
import com.carpool.entity.User;
import com.carpool.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * User Controller
 * 
 * Simple REST controller for user-related operations.
 * Handles user registration, login, and profile management.
 */
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to access
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDTO userDTO) {
        try {
            User user = userService.registerUser(userDTO);
            
            // Return user data without password
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("email", user.getEmail());
            response.put("phone", user.getPhone());
            response.put("rating", user.getRating());
            response.put("totalTrips", user.getTotalTrips());
            response.put("message", "User registered successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Login user
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginDTO loginDTO) {
        try {
            User user = userService.loginUser(loginDTO);
            
            // Return user data without password
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("email", user.getEmail());
            response.put("phone", user.getPhone());
            response.put("rating", user.getRating());
            response.put("totalTrips", user.getTotalTrips());
            response.put("message", "Login successful");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get user profile by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        try {
            User user = userService.findUserById(id);
            
            // Return user data without password
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("email", user.getEmail());
            response.put("phone", user.getPhone());
            response.put("rating", user.getRating());
            response.put("totalTrips", user.getTotalTrips());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Update user rating
     */
    @PutMapping("/{id}/rating")
    public ResponseEntity<?> updateUserRating(@PathVariable Long id, @RequestParam double rating) {
        try {
            User user = userService.updateUserRating(id, rating);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("rating", user.getRating());
            response.put("totalTrips", user.getTotalTrips());
            response.put("message", "Rating updated successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
