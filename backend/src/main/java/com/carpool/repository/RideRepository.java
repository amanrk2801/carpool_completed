package com.carpool.repository;

import com.carpool.entity.Ride;
import com.carpool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Ride Repository
 * 
 * Simple repository interface for Ride entity operations.
 * Provides basic CRUD operations and custom queries for finding rides.
 */
@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {
    
    /**
     * Find rides by driver
     */
    List<Ride> findByDriver(User driver);
    
    /**
     * Find rides by status
     */
    List<Ride> findByStatus(Ride.RideStatus status);
    
    /**
     * Find active rides by route and date
     */
    @Query("SELECT r FROM Ride r WHERE r.fromLocation LIKE %:from% " +
           "AND r.toLocation LIKE %:to% " +
           "AND r.departureDate = :date " +
           "AND r.status = 'ACTIVE' " +
           "AND r.availableSeats > 0 " +
           "ORDER BY r.departureTime")
    List<Ride> findAvailableRides(@Param("from") String from, 
                                  @Param("to") String to, 
                                  @Param("date") LocalDate date);
    
    /**
     * Find all active rides
     */
    @Query("SELECT r FROM Ride r WHERE r.status = 'ACTIVE' " +
           "AND r.availableSeats > 0 " +
           "AND r.departureDate >= CURRENT_DATE " +
           "ORDER BY r.departureDate, r.departureTime")
    List<Ride> findAllActiveRides();
    
    /**
     * Find rides by driver and status
     */
    List<Ride> findByDriverAndStatus(User driver, Ride.RideStatus status);
}
