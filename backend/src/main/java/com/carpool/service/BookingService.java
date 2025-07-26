package com.carpool.service;

import com.carpool.dto.BookingCreationDTO;
import com.carpool.entity.Booking;
import com.carpool.entity.Ride;
import com.carpool.entity.User;
import com.carpool.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Booking Service
 * 
 * Simple service class for booking-related operations.
 * Handles booking creation, status updates, and management.
 */
@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private RideService rideService;
    
    /**
     * Create a new booking
     */
    public Booking createBooking(BookingCreationDTO bookingDTO, Long passengerId) {
        User passenger = userService.findUserById(passengerId);
        Ride ride = rideService.getRideById(bookingDTO.getRideId());
        
        // Check if enough seats are available
        if (ride.getAvailableSeats() < bookingDTO.getSeatsBooked()) {
            throw new RuntimeException("Not enough seats available");
        }
        
        // Check if passenger is not the driver
        if (ride.getDriver().getId().equals(passengerId)) {
            throw new RuntimeException("You cannot book your own ride");
        }
        
        Booking booking = new Booking(
            passenger,
            ride,
            bookingDTO.getSeatsBooked(),
            bookingDTO.getBookingMessage()
        );
        
        // If instant booking is enabled, confirm immediately
        if (ride.getInstantBooking()) {
            booking.setStatus(Booking.BookingStatus.CONFIRMED);
            // Update available seats
            rideService.updateAvailableSeats(ride.getId(), bookingDTO.getSeatsBooked());
        }
        
        return bookingRepository.save(booking);
    }
    
    /**
     * Get bookings by passenger
     */
    public List<Booking> getBookingsByPassenger(Long passengerId) {
        User passenger = userService.findUserById(passengerId);
        return bookingRepository.findByPassenger(passenger);
    }
    
    /**
     * Get bookings for driver (bookings on their rides)
     */
    public List<Booking> getBookingsForDriver(Long driverId) {
        User driver = userService.findUserById(driverId);
        return bookingRepository.findByRideDriver(driver);
    }
    
    /**
     * Get booking by ID
     */
    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    /**
     * Update booking status
     */
    public Booking updateBookingStatus(Long bookingId, Booking.BookingStatus status, Long userId) {
        Booking booking = getBookingById(bookingId);
        
        // Check if user has permission to update this booking
        boolean isDriver = booking.getRide().getDriver().getId().equals(userId);
        boolean isPassenger = booking.getPassenger().getId().equals(userId);
        
        if (!isDriver && !isPassenger) {
            throw new RuntimeException("You don't have permission to update this booking");
        }
        
        // Handle seat availability when confirming/rejecting
        if (status == Booking.BookingStatus.CONFIRMED && booking.getStatus() == Booking.BookingStatus.PENDING) {
            rideService.updateAvailableSeats(booking.getRide().getId(), booking.getSeatsBooked());
        } else if (status == Booking.BookingStatus.CANCELLED && booking.getStatus() == Booking.BookingStatus.CONFIRMED) {
            // Return seats to available pool
            Ride ride = booking.getRide();
            ride.setAvailableSeats(ride.getAvailableSeats() + booking.getSeatsBooked());
        }
        
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
    
    /**
     * Get bookings by ride
     */
    public List<Booking> getBookingsByRide(Long rideId) {
        try {
            System.out.println("Fetching bookings for ride ID: " + rideId);
            
            // Check if ride exists first
            Ride ride = rideService.getRideById(rideId);
            System.out.println("Found ride: " + ride.getId() + " from " + ride.getFromLocation() + " to " + ride.getToLocation());
            
            // Get bookings using the standard method first
            List<Booking> bookings = bookingRepository.findByRide(ride);
            System.out.println("Found " + bookings.size() + " bookings for ride " + rideId);
            
            // Eagerly load passenger details to avoid lazy loading issues
            for (Booking booking : bookings) {
                try {
                    // This will trigger loading of passenger data
                    if (booking.getPassenger() != null) {
                        String firstName = booking.getPassenger().getFirstName();
                        String lastName = booking.getPassenger().getLastName();
                        System.out.println("Booking " + booking.getId() + " passenger: " + firstName + " " + lastName);
                    } else {
                        System.out.println("Booking " + booking.getId() + " has null passenger!");
                    }
                } catch (Exception e) {
                    System.err.println("Error loading passenger for booking " + booking.getId() + ": " + e.getMessage());
                }
            }
            
            return bookings;
        } catch (Exception e) {
            System.err.println("Error in getBookingsByRide: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}
