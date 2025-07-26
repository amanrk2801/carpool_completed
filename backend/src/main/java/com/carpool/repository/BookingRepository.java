package com.carpool.repository;

import com.carpool.entity.Booking;
import com.carpool.entity.Ride;
import com.carpool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Booking Repository
 * 
 * Simple repository interface for Booking entity operations.
 * Provides basic CRUD operations and custom queries for bookings.
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    /**
     * Find bookings by passenger
     */
    List<Booking> findByPassenger(User passenger);
    
    /**
     * Find bookings by ride
     */
    List<Booking> findByRide(Ride ride);
    
    /**
     * Find bookings by ride with passenger details eagerly loaded
     */
    @Query("SELECT b FROM Booking b JOIN FETCH b.passenger p WHERE b.ride.id = :rideId")
    List<Booking> findByRideWithPassenger(@Param("rideId") Long rideId);
    
    /**
     * Find bookings by passenger and status
     */
    List<Booking> findByPassengerAndStatus(User passenger, Booking.BookingStatus status);
    
    /**
     * Find bookings by ride and status
     */
    List<Booking> findByRideAndStatus(Ride ride, Booking.BookingStatus status);
    
    /**
     * Find bookings by ride driver (for drivers to see their ride bookings)
     */
    List<Booking> findByRideDriver(User driver);
}
