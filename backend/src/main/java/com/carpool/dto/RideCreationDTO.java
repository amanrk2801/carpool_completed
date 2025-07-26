package com.carpool.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Ride Creation DTO
 * 
 * Data Transfer Object for creating ride offers.
 */
public class RideCreationDTO {
    
    @NotBlank(message = "Starting location is required")
    private String fromLocation;
    
    @NotBlank(message = "Destination is required")
    private String toLocation;
    
    @NotNull(message = "Departure date is required")
    private LocalDate departureDate;
    
    @NotNull(message = "Departure time is required")
    private LocalTime departureTime;
    
    @Positive(message = "Available seats must be positive")
    private Integer availableSeats;
    
    @Positive(message = "Price per seat must be positive")
    private Double pricePerSeat;
    
    @NotBlank(message = "Car model is required")
    private String carModel;
    
    @NotBlank(message = "Car number is required")
    private String carNumber;
    
    private String stops;
    private String additionalInfo;
    private Boolean instantBooking = true;
    private Boolean allowSmoking = false;
    private Boolean allowPets = false;
    private Boolean allowFood = true;
    
    // Constructors
    public RideCreationDTO() {}
    
    // Getters and Setters
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
}
