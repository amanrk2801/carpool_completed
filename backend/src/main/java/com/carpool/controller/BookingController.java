package com.carpool.controller;

import com.carpool.dto.BookingCreationDTO;
import com.carpool.entity.Booking;
import com.carpool.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Booking Controller
 * 
 * Simple REST controller for booking-related operations.
 * Handles booking creation, status updates, and management.
 */
@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to access
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    /**
     * Create a new booking
     */
    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingCreationDTO bookingDTO,
                                           @RequestParam Long passengerId) {
        try {
            System.out.println("Creating booking for passenger: " + passengerId + ", ride: " + bookingDTO.getRideId());
            Booking booking = bookingService.createBooking(bookingDTO, passengerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", booking.getId());
            response.put("message", "Booking created successfully");
            response.put("booking", booking);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error creating booking: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get bookings by passenger
     */
    @GetMapping("/user/{passengerId}")
    public ResponseEntity<?> getBookingsByPassenger(@PathVariable Long passengerId) {
        try {
            System.out.println("Fetching bookings for passenger: " + passengerId);
            List<Booking> bookings = bookingService.getBookingsByPassenger(passengerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("bookings", bookings);
            response.put("count", bookings.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error fetching passenger bookings: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get bookings by passenger (alternative endpoint)
     */
    @GetMapping("/passenger/{passengerId}")
    public ResponseEntity<?> getBookingsByPassengerAlt(@PathVariable Long passengerId) {
        try {
            List<Booking> bookings = bookingService.getBookingsByPassenger(passengerId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("bookings", bookings);
            response.put("count", bookings.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get bookings for driver (bookings on their rides)
     */
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<?> getBookingsForDriver(@PathVariable Long driverId) {
        try {
            List<Booking> bookings = bookingService.getBookingsForDriver(driverId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("bookings", bookings);
            response.put("count", bookings.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get booking by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        try {
            Booking booking = bookingService.getBookingById(id);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Update booking status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id,
                                                 @RequestParam String status,
                                                 @RequestParam Long userId) {
        try {
            Booking.BookingStatus bookingStatus = Booking.BookingStatus.valueOf(status.toUpperCase());
            Booking booking = bookingService.updateBookingStatus(id, bookingStatus, userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Booking status updated successfully");
            response.put("booking", booking);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get bookings by ride
     */
    @GetMapping("/ride/{rideId}")
    public ResponseEntity<?> getBookingsByRide(@PathVariable Long rideId) {
        try {
            System.out.println("Fetching bookings for ride: " + rideId);
            List<Booking> bookings = bookingService.getBookingsByRide(rideId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("bookings", bookings);
            response.put("count", bookings.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error fetching ride bookings: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
