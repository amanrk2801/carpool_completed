package com.carpool.controller;

import com.carpool.dto.RideCreationDTO;
import com.carpool.entity.Ride;
import com.carpool.service.RideService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Ride Controller
 * 
 * Simple REST controller for ride-related operations.
 * Handles ride creation, searching, and management.
 */
@RestController
@RequestMapping("/rides")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to access
public class RideController {
    
    @Autowired
    private RideService rideService;
    
    /**
     * Create a new ride offer
     */
    @PostMapping
    public ResponseEntity<?> createRide(@Valid @RequestBody RideCreationDTO rideDTO, 
                                        @RequestParam Long driverId) {
        try {
            Ride ride = rideService.createRide(rideDTO, driverId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", ride.getId());
            response.put("message", "Ride created successfully");
            response.put("ride", ride);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Search for available rides
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchRides(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<Ride> rides = rideService.searchRides(from, to, date);
            
            Map<String, Object> response = new HashMap<>();
            response.put("rides", rides);
            response.put("count", rides.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get all active rides
     */
    @GetMapping
    public ResponseEntity<?> getAllActiveRides() {
        try {
            List<Ride> rides = rideService.getAllActiveRides();
            
            Map<String, Object> response = new HashMap<>();
            response.put("rides", rides);
            response.put("count", rides.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get rides by driver
     */
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<?> getRidesByDriver(@PathVariable Long driverId) {
        try {
            List<Ride> rides = rideService.getRidesByDriver(driverId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("rides", rides);
            response.put("count", rides.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get ride by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getRideById(@PathVariable Long id) {
        try {
            Ride ride = rideService.getRideById(id);
            return ResponseEntity.ok(ride);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Update ride status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateRideStatus(@PathVariable Long id, 
                                              @RequestParam String status) {
        try {
            Ride.RideStatus rideStatus = Ride.RideStatus.valueOf(status.toUpperCase());
            Ride ride = rideService.updateRideStatus(id, rideStatus);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Ride status updated successfully");
            response.put("ride", ride);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Delete ride
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRide(@PathVariable Long id, 
                                        @RequestParam Long driverId) {
        try {
            rideService.deleteRide(id, driverId);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Ride deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
