package com.carpool.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * Booking Creation DTO
 * 
 * Data Transfer Object for creating ride bookings.
 */
public class BookingCreationDTO {
    
    @NotNull(message = "Ride ID is required")
    private Long rideId;
    
    @Positive(message = "Seats booked must be positive")
    private Integer seatsBooked;
    
    private String bookingMessage;
    
    // Constructors
    public BookingCreationDTO() {}
    
    public BookingCreationDTO(Long rideId, Integer seatsBooked, String bookingMessage) {
        this.rideId = rideId;
        this.seatsBooked = seatsBooked;
        this.bookingMessage = bookingMessage;
    }
    
    // Getters and Setters
    public Long getRideId() {
        return rideId;
    }
    
    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }
    
    public Integer getSeatsBooked() {
        return seatsBooked;
    }
    
    public void setSeatsBooked(Integer seatsBooked) {
        this.seatsBooked = seatsBooked;
    }
    
    public String getBookingMessage() {
        return bookingMessage;
    }
    
    public void setBookingMessage(String bookingMessage) {
        this.bookingMessage = bookingMessage;
    }
}
