package com.carpool.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Ride Entity
 * 
 * Represents a ride offer in the carpool system.
 * Contains all the details about the ride including route, timing, and preferences.
 */
@Entity
@Table(name = "rides")
public class Ride {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User driver;
    
    @NotBlank(message = "Starting location is required")
    @Column(name = "from_location", nullable = false)
    private String fromLocation;
    
    @NotBlank(message = "Destination is required")
    @Column(name = "to_location", nullable = false)
    private String toLocation;
    
    @NotNull(message = "Departure date is required")
    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;
    
    @NotNull(message = "Departure time is required")
    @Column(name = "departure_time", nullable = false)
    private LocalTime departureTime;
    
    @Positive(message = "Available seats must be positive")
    @Column(name = "available_seats", nullable = false)
    private Integer availableSeats;
    
    @Positive(message = "Price per seat must be positive")
    @Column(name = "price_per_seat", nullable = false)
    private Double pricePerSeat;
    
    @NotBlank(message = "Car model is required")
    @Column(name = "car_model", nullable = false)
    private String carModel;
    
    @NotBlank(message = "Car number is required")
    @Column(name = "car_number", nullable = false)
    private String carNumber;
    
    @Column(name = "stops", columnDefinition = "TEXT")
    private String stops; // JSON string of stops
    
    @Column(name = "additional_info", columnDefinition = "TEXT")
    private String additionalInfo;
    
    @Column(name = "instant_booking")
    private Boolean instantBooking = true;
    
    @Column(name = "allow_smoking")
    private Boolean allowSmoking = false;
    
    @Column(name = "allow_pets")
    private Boolean allowPets = false;
    
    @Column(name = "allow_food")
    private Boolean allowFood = true;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RideStatus status = RideStatus.ACTIVE;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Transient fields for calculated values (not stored in database)
    @Transient
    private Integer bookingsCount = 0;
    
    @Transient
    private Double revenue = 0.0;
    
    @Transient
    private Integer totalSeats;
    
    // Enum for ride status
    public enum RideStatus {
        ACTIVE, COMPLETED, CANCELLED
    }
    
    // Constructors
    public Ride() {}
    
    public Ride(User driver, String fromLocation, String toLocation, LocalDate departureDate, 
                LocalTime departureTime, Integer availableSeats, Double pricePerSeat, 
                String carModel, String carNumber) {
        this.driver = driver;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.departureDate = departureDate;
        this.departureTime = departureTime;
        this.availableSeats = availableSeats;
        this.pricePerSeat = pricePerSeat;
        this.carModel = carModel;
        this.carNumber = carNumber;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getDriver() {
        return driver;
    }
    
    public void setDriver(User driver) {
        this.driver = driver;
    }
    
    public String getFromLocation() {
        return fromLocation;
    }
    
    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }
    
    public String getToLocation() {
        return toLocation;
    }
    
    public void setToLocation(String toLocation) {
        this.toLocation = toLocation;
    }
    
    public LocalDate getDepartureDate() {
        return departureDate;
    }
    
    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }
    
    public LocalTime getDepartureTime() {
        return departureTime;
    }
    
    public void setDepartureTime(LocalTime departureTime) {
        this.departureTime = departureTime;
    }
    
    public Integer getAvailableSeats() {
        return availableSeats;
    }
    
    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }
    
    public Double getPricePerSeat() {
        return pricePerSeat;
    }
    
    public void setPricePerSeat(Double pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }
    
    public String getCarModel() {
        return carModel;
    }
    
    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }
    
    public String getCarNumber() {
        return carNumber;
    }
    
    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }
    
    public String getStops() {
        return stops;
    }
    
    public void setStops(String stops) {
        this.stops = stops;
    }
    
    public String getAdditionalInfo() {
        return additionalInfo;
    }
    
    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }
    
    public Boolean getInstantBooking() {
        return instantBooking;
    }
    
    public void setInstantBooking(Boolean instantBooking) {
        this.instantBooking = instantBooking;
    }
    
    public Boolean getAllowSmoking() {
        return allowSmoking;
    }
    
    public void setAllowSmoking(Boolean allowSmoking) {
        this.allowSmoking = allowSmoking;
    }
    
    public Boolean getAllowPets() {
        return allowPets;
    }
    
    public void setAllowPets(Boolean allowPets) {
        this.allowPets = allowPets;
    }
    
    public Boolean getAllowFood() {
        return allowFood;
    }
    
    public void setAllowFood(Boolean allowFood) {
        this.allowFood = allowFood;
    }
    
    public RideStatus getStatus() {
        return status;
    }
    
    public void setStatus(RideStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public Integer getBookingsCount() {
        return bookingsCount;
    }
    
    public void setBookingsCount(Integer bookingsCount) {
        this.bookingsCount = bookingsCount;
    }
    
    public Double getRevenue() {
        return revenue;
    }
    
    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
    
    public Integer getTotalSeats() {
        return totalSeats;
    }
    
    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
    }
    
    // Lifecycle methods
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
