package com.carpool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application Class for Carpool Backend
 * 
 * This is a simple Spring Boot application that provides
 * REST APIs for the carpool frontend.
 */
@SpringBootApplication
public class CarpoolApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarpoolApplication.class, args);
    }
}
