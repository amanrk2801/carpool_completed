package com.carpool.util;

import java.util.regex.Pattern;

/**
 * Validation Utility
 * 
 * Provides common validation and sanitization methods.
 */
public class ValidationUtil {

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );

    private static final Pattern PHONE_PATTERN = Pattern.compile(
        "^[+]?[0-9]{10,15}$"
    );

    private static final Pattern CAR_NUMBER_PATTERN = Pattern.compile(
        "^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$"
    );

    /**
     * Validates email format
     */
    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * Validates phone number format
     */
    public static boolean isValidPhone(String phone) {
        return phone != null && PHONE_PATTERN.matcher(phone.replaceAll("\\s", "")).matches();
    }

    /**
     * Validates Indian car number format
     */
    public static boolean isValidCarNumber(String carNumber) {
        return carNumber != null && CAR_NUMBER_PATTERN.matcher(carNumber.replaceAll("\\s", "")).matches();
    }

    /**
     * Sanitizes text input by removing potentially harmful characters
     */
    public static String sanitizeText(String input) {
        if (input == null) {
            return null;
        }
        
        // Remove HTML tags and script content
        String sanitized = input.replaceAll("<[^>]*>", "");
        
        // Remove potential XSS characters
        sanitized = sanitized.replaceAll("[<>\"'%;()&+]", "");
        
        // Trim whitespace
        sanitized = sanitized.trim();
        
        return sanitized.isEmpty() ? null : sanitized;
    }

    /**
     * Validates that a string is within specified length limits
     */
    public static boolean isValidLength(String input, int minLength, int maxLength) {
        if (input == null) {
            return minLength == 0;
        }
        
        int length = input.trim().length();
        return length >= minLength && length <= maxLength;
    }

    /**
     * Validates that a number is within specified range
     */
    public static boolean isValidRange(double value, double min, double max) {
        return value >= min && value <= max;
    }

    /**
     * Validates location format (city, state or full address)
     */
    public static boolean isValidLocation(String location) {
        if (location == null || location.trim().isEmpty()) {
            return false;
        }
        
        String sanitized = sanitizeText(location);
        return sanitized != null && sanitized.length() >= 2 && sanitized.length() <= 100;
    }
}
