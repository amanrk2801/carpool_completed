package com.carpool.exception;

/**
 * Business Exception
 * 
 * Thrown when business logic validation fails.
 */
public class BusinessException extends RuntimeException {
    
    public BusinessException(String message) {
        super(message);
    }
    
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
