package com.carpool.service;

import com.carpool.dto.UserLoginDTO;
import com.carpool.dto.UserRegistrationDTO;
import com.carpool.entity.User;
import com.carpool.exception.BusinessException;
import com.carpool.exception.ResourceNotFoundException;
import com.carpool.repository.UserRepository;
import com.carpool.util.ValidationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * User Service
 * 
 * Simple service class for user-related operations.
 * Handles user registration, login, and profile management.
 */
@Service
@Transactional
public class UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Register a new user
     */
    public User registerUser(UserRegistrationDTO userDTO) {
        logger.info("Attempting to register user with email: {}", userDTO.getEmail());
        
        // Validate input
        validateUserRegistration(userDTO);
        
        // Check if user already exists
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new BusinessException("Email already exists");
        }
        
        if (userRepository.existsByPhone(userDTO.getPhone())) {
            throw new BusinessException("Phone number already exists");
        }
        
        // Create new user with hashed password
        User user = new User(
            ValidationUtil.sanitizeText(userDTO.getFirstName()),
            ValidationUtil.sanitizeText(userDTO.getLastName()),
            userDTO.getEmail().toLowerCase().trim(),
            userDTO.getPhone().replaceAll("\\s", ""),
            passwordEncoder.encode(userDTO.getPassword())
        );
        
        User savedUser = userRepository.save(user);
        logger.info("User registered successfully with ID: {}", savedUser.getId());
        
        return savedUser;
    }
    
    /**
     * Validate user registration data
     */
    private void validateUserRegistration(UserRegistrationDTO userDTO) {
        if (!ValidationUtil.isValidEmail(userDTO.getEmail())) {
            throw new BusinessException("Invalid email format");
        }
        
        if (!ValidationUtil.isValidPhone(userDTO.getPhone())) {
            throw new BusinessException("Invalid phone number format");
        }
        
        if (!ValidationUtil.isValidLength(userDTO.getFirstName(), 2, 50)) {
            throw new BusinessException("First name must be between 2 and 50 characters");
        }
        
        if (!ValidationUtil.isValidLength(userDTO.getLastName(), 2, 50)) {
            throw new BusinessException("Last name must be between 2 and 50 characters");
        }
        
        if (!ValidationUtil.isValidLength(userDTO.getPassword(), 6, 100)) {
            throw new BusinessException("Password must be between 6 and 100 characters");
        }
    }
    
    /**
     * Login user
     */
    public User loginUser(UserLoginDTO loginDTO) {
        logger.info("Attempting to login user with email: {}", loginDTO.getEmail());
        
        // Validate input
        if (!ValidationUtil.isValidEmail(loginDTO.getEmail())) {
            throw new BusinessException("Invalid email format");
        }
        
        if (loginDTO.getPassword() == null || loginDTO.getPassword().trim().isEmpty()) {
            throw new BusinessException("Password is required");
        }
        
        Optional<User> userOptional = userRepository.findByEmail(loginDTO.getEmail().toLowerCase().trim());
        
        if (userOptional.isEmpty()) {
            throw new BusinessException("Invalid email or password");
        }
        
        User user = userOptional.get();
        
        // Check if user is active (handle null values for backward compatibility)
        if (user.getIsActive() != null && !user.getIsActive()) {
            throw new BusinessException("Account is deactivated. Please contact support.");
        }
        
        // Verify password
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new BusinessException("Invalid email or password");
        }
        
        logger.info("User logged in successfully: {}", user.getId());
        return user;
    }
    
    /**
     * Find user by ID
     */
    @Transactional(readOnly = true)
    public User findUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
    }
    
    /**
     * Find user by email
     */
    @Transactional(readOnly = true)
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email.toLowerCase().trim())
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
    
    /**
     * Update user rating after a trip
     */
    public User updateUserRating(Long userId, double newRating) {
        if (!ValidationUtil.isValidRange(newRating, 1.0, 5.0)) {
            throw new BusinessException("Rating must be between 1.0 and 5.0");
        }
        
        User user = findUserById(userId);
        
        // Calculate weighted average rating
        double currentRating = user.getRating() != null ? user.getRating() : 0.0;
        int totalTrips = user.getTotalTrips();
        
        double updatedRating = ((currentRating * totalTrips) + newRating) / (totalTrips + 1);
        user.setRating(Math.round(updatedRating * 10.0) / 10.0); // Round to 1 decimal place
        user.setTotalTrips(totalTrips + 1);
        
        User savedUser = userRepository.save(user);
        logger.info("Updated rating for user {}: {} (total trips: {})", userId, savedUser.getRating(), savedUser.getTotalTrips());
        
        return savedUser;
    }
    
    /**
     * Deactivate user account
     */
    public void deactivateUser(Long userId) {
        User user = findUserById(userId);
        user.setIsActive(false);
        userRepository.save(user);
        logger.info("User account deactivated: {}", userId);
    }
}
