package com.carpool.service;

import com.carpool.dto.RideCreationDTO;
import com.carpool.entity.Booking;
import com.carpool.entity.Ride;
import com.carpool.entity.User;
import com.carpool.repository.BookingRepository;
import com.carpool.repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Ride Service
 * 
 * Simple service class for ride-related operations.
 * Handles ride creation, searching, and management.
 */
@Service
public class RideService {
    
    @Autowired
    private RideRepository rideRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    /**
     * Create a new ride offer
     */
    public Ride createRide(RideCreationDTO rideDTO, Long driverId) {
        User driver = userService.findUserById(driverId);
        
        Ride ride = new Ride(
            driver,
            rideDTO.getFromLocation(),
            rideDTO.getToLocation(),
            rideDTO.getDepartureDate(),
            rideDTO.getDepartureTime(),
            rideDTO.getAvailableSeats(),
            rideDTO.getPricePerSeat(),
            rideDTO.getCarModel(),
            rideDTO.getCarNumber()
        );
        
        // Set optional fields
        ride.setStops(rideDTO.getStops());
        ride.setAdditionalInfo(rideDTO.getAdditionalInfo());
        ride.setInstantBooking(rideDTO.getInstantBooking());
        ride.setAllowSmoking(rideDTO.getAllowSmoking());
        ride.setAllowPets(rideDTO.getAllowPets());
        ride.setAllowFood(rideDTO.getAllowFood());
        
        return rideRepository.save(ride);
    }
    
    /**
     * Search for available rides
     */
    public List<Ride> searchRides(String from, String to, LocalDate date) {
        if (from != null && to != null && date != null) {
            return rideRepository.findAvailableRides(from, to, date);
        } else {
            return rideRepository.findAllActiveRides();
        }
    }
    
    /**
     * Get all active rides
     */
    public List<Ride> getAllActiveRides() {
        return rideRepository.findAllActiveRides();
    }
    
    /**
     * Get rides by driver
     */
    public List<Ride> getRidesByDriver(Long driverId) {
        User driver = userService.findUserById(driverId);
        List<Ride> rides = rideRepository.findByDriver(driver);
        
        // Calculate booking statistics for each ride
        for (Ride ride : rides) {
            List<Booking> bookings = bookingRepository.findByRide(ride);
            
            // Calculate bookings count
            int bookingsCount = bookings.size();
            ride.setBookingsCount(bookingsCount);
            
            // Calculate revenue from confirmed bookings
            double revenue = bookings.stream()
                .filter(booking -> booking.getStatus() == Booking.BookingStatus.CONFIRMED || 
                                 booking.getStatus() == Booking.BookingStatus.COMPLETED)
                .mapToDouble(Booking::getTotalAmount)
                .sum();
            ride.setRevenue(revenue);
            
            // Set total seats (available + booked)
            int bookedSeats = bookings.stream()
                .filter(booking -> booking.getStatus() == Booking.BookingStatus.CONFIRMED || 
                                 booking.getStatus() == Booking.BookingStatus.COMPLETED)
                .mapToInt(Booking::getSeatsBooked)
                .sum();
            ride.setTotalSeats(ride.getAvailableSeats() + bookedSeats);
        }
        
        return rides;
    }
    
    /**
     * Get ride by ID
     */
    public Ride getRideById(Long rideId) {
        return rideRepository.findById(rideId)
            .orElseThrow(() -> new RuntimeException("Ride not found"));
    }
    
    /**
     * Update ride status
     */
    public Ride updateRideStatus(Long rideId, Ride.RideStatus status) {
        Ride ride = getRideById(rideId);
        ride.setStatus(status);
        return rideRepository.save(ride);
    }
    
    /**
     * Update available seats after booking
     */
    public Ride updateAvailableSeats(Long rideId, int seatsBooked) {
        Ride ride = getRideById(rideId);
        
        if (ride.getAvailableSeats() < seatsBooked) {
            throw new RuntimeException("Not enough seats available");
        }
        
        ride.setAvailableSeats(ride.getAvailableSeats() - seatsBooked);
        return rideRepository.save(ride);
    }
    
    /**
     * Delete ride
     */
    public void deleteRide(Long rideId, Long driverId) {
        Ride ride = getRideById(rideId);
        
        // Check if the user is the driver of this ride
        if (!ride.getDriver().getId().equals(driverId)) {
            throw new RuntimeException("You can only delete your own rides");
        }
        
        rideRepository.delete(ride);
    }
}
