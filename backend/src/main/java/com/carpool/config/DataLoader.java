package com.carpool.config;

import com.carpool.entity.User;
import com.carpool.entity.Ride;
import com.carpool.entity.Booking;
import com.carpool.repository.UserRepository;
import com.carpool.repository.RideRepository;
import com.carpool.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Data Loader
 * 
 * Loads sample data into the database on application startup.
 * This is useful for development and testing purposes.
 */
@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RideRepository rideRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        fixExistingUserData();
        loadSampleData();
    }
    
    private void fixExistingUserData() {
        // Fix existing users with null isActive values
        userRepository.findAll().forEach(user -> {
            if (user.getIsActive() == null) {
                user.setIsActive(true);
                userRepository.save(user);
                System.out.println("Fixed isActive for user: " + user.getEmail());
            }
        });
    }

    private void loadSampleData() {
        // Check if data already exists
        if (userRepository.count() > 3) {
            return; // Data already loaded (more than the 3 sample users)
        }
        
        // Clear existing data to reload fresh samples
        bookingRepository.deleteAll();
        rideRepository.deleteAll();
        userRepository.deleteAll();

        // Create sample users
        User user1 = new User();
        user1.setFirstName("John");
        user1.setLastName("Doe");
        user1.setEmail("john@example.com");
        user1.setPhone("9876543210");
        user1.setPassword(passwordEncoder.encode("password123"));
        user1.setRating(4.5);
        user1.setTotalTrips(25);
        user1.setIsActive(true);
        user1 = userRepository.save(user1);

        User user2 = new User();
        user2.setFirstName("Jane");
        user2.setLastName("Smith");
        user2.setEmail("jane@example.com");
        user2.setPhone("9876543211");
        user2.setPassword(passwordEncoder.encode("password123"));
        user2.setRating(4.8);
        user2.setTotalTrips(15);
        user2.setIsActive(true);
        user2 = userRepository.save(user2);

        User user3 = new User();
        user3.setFirstName("Bob");
        user3.setLastName("Wilson");
        user3.setEmail("bob@example.com");
        user3.setPhone("9876543212");
        user3.setPassword(passwordEncoder.encode("password123"));
        user3.setRating(4.2);
        user3.setTotalTrips(30);
        user3.setIsActive(true);
        user3 = userRepository.save(user3);

        // Create sample rides
        Ride ride1 = new Ride();
        ride1.setDriver(user1);
        ride1.setFromLocation("Mumbai");
        ride1.setToLocation("Pune");
        ride1.setDepartureDate(LocalDate.now().plusDays(1));
        ride1.setDepartureTime(LocalTime.of(9, 0));
        ride1.setAvailableSeats(3);
        ride1.setPricePerSeat(500.0);
        ride1.setCarModel("Honda City");
        ride1.setCarNumber("MH12AB1234");
        ride1.setAllowSmoking(false);
        ride1.setAllowPets(true);
        ride1.setAllowFood(true);
        rideRepository.save(ride1);

        Ride ride2 = new Ride();
        ride2.setDriver(user2);
        ride2.setFromLocation("Delhi");
        ride2.setToLocation("Gurgaon");
        ride2.setDepartureDate(LocalDate.now().plusDays(1));
        ride2.setDepartureTime(LocalTime.of(18, 30));
        ride2.setAvailableSeats(2);
        ride2.setPricePerSeat(200.0);
        ride2.setCarModel("Maruti Swift");
        ride2.setCarNumber("DL01CD5678");
        ride2.setAllowSmoking(false);
        ride2.setAllowPets(false);
        ride2.setAllowFood(true);
        rideRepository.save(ride2);

        Ride ride3 = new Ride();
        ride3.setDriver(user3);
        ride3.setFromLocation("Bangalore");
        ride3.setToLocation("Mysore");
        ride3.setDepartureDate(LocalDate.now().plusDays(2));
        ride3.setDepartureTime(LocalTime.of(7, 0));
        ride3.setAvailableSeats(4);
        ride3.setPricePerSeat(800.0);
        ride3.setCarModel("Toyota Innova");
        ride3.setCarNumber("KA05EF9012");
        ride3.setAllowSmoking(false);
        ride3.setAllowPets(true);
        ride3.setAllowFood(true);
        rideRepository.save(ride3);

        System.out.println("Sample data loaded successfully!");
        System.out.println("Sample users created - you can now test booking functionality!");
        System.out.println("Login credentials: john@example.com / password123, jane@example.com / password123, bob@example.com / password123");
    }
}
