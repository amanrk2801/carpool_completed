# Carpool Backend

A simple Spring Boot backend for the carpool application with MySQL database.

## Tech Stack
- **Spring Boot 3.2.1**
- **MySQL 8.0**
- **Spring Data JPA**
- **Maven**
- **Java 17**

## Features
- User registration and authentication
- Ride creation and management
- Ride searching and filtering
- Booking system
- Simple rating system

## Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Git

## Setup Instructions

### 1. Database Setup
```sql
-- Create database
CREATE DATABASE carpool_db;

-- Create user (optional)
CREATE USER 'carpool_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON carpool_db.* TO 'carpool_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Application Configuration
Update `src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Build and Run
```bash
# Navigate to backend directory
cd backend

# Build the application
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080/api`

## Database Schema

### Users Table
- `id` (Primary Key)
- `first_name`
- `last_name`
- `email` (Unique)
- `phone`
- `password`
- `rating`
- `total_trips`
- `created_at`
- `updated_at`

### Rides Table
- `id` (Primary Key)
- `driver_id` (Foreign Key to Users)
- `from_location`
- `to_location`
- `departure_date`
- `departure_time`
- `available_seats`
- `price_per_seat`
- `car_model`
- `car_number`
- `stops` (JSON string)
- `additional_info`
- `instant_booking`
- `allow_smoking`
- `allow_pets`
- `allow_food`
- `status` (ACTIVE, COMPLETED, CANCELLED)
- `created_at`
- `updated_at`

### Bookings Table
- `id` (Primary Key)
- `passenger_id` (Foreign Key to Users)
- `ride_id` (Foreign Key to Rides)
- `seats_booked`
- `total_amount`
- `status` (PENDING, CONFIRMED, REJECTED, CANCELLED, COMPLETED)
- `booking_message`
- `created_at`
- `updated_at`

## API Endpoints

### User Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}/rating` - Update user rating

### Ride Endpoints
- `POST /api/rides` - Create new ride
- `GET /api/rides` - Get all active rides
- `GET /api/rides/search` - Search rides
- `GET /api/rides/driver/{driverId}` - Get rides by driver
- `GET /api/rides/{id}` - Get ride by ID
- `PUT /api/rides/{id}/status` - Update ride status
- `DELETE /api/rides/{id}` - Delete ride

### Booking Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/passenger/{passengerId}` - Get bookings by passenger
- `GET /api/bookings/driver/{driverId}` - Get bookings for driver
- `GET /api/bookings/{id}` - Get booking by ID
- `PUT /api/bookings/{id}/status` - Update booking status
- `GET /api/bookings/ride/{rideId}` - Get bookings by ride

## Sample API Requests

### Register User
```json
POST /api/users/register
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com",
    "phone": "+91 98765 43210",
    "password": "password123"
}
```

### Login User
```json
POST /api/users/login
{
    "email": "john.doe@email.com",
    "password": "password123"
}
```

### Create Ride
```json
POST /api/rides?driverId=1
{
    "fromLocation": "Mumbai",
    "toLocation": "Pune",
    "departureDate": "2025-07-26",
    "departureTime": "09:00:00",
    "availableSeats": 3,
    "pricePerSeat": 350.0,
    "carModel": "Honda City",
    "carNumber": "MH 12 AB 1234",
    "instantBooking": true,
    "allowSmoking": false,
    "allowPets": true,
    "allowFood": true
}
```

### Search Rides
```
GET /api/rides/search?from=Mumbai&to=Pune&date=2025-07-26
```

### Create Booking
```json
POST /api/bookings?passengerId=2
{
    "rideId": 1,
    "seatsBooked": 2,
    "bookingMessage": "Looking forward to the trip!"
}
```

## Error Handling
The API returns standard HTTP status codes and JSON error messages:
```json
{
    "error": "Error message description"
}
```

## Development Notes
- This is a simple implementation without JWT authentication
- Passwords are stored in plain text (use proper hashing in production)
- No input sanitization (implement in production)
- Basic error handling (enhance for production)
- No rate limiting (add for production)

## Testing
You can test the API using:
- Postman
- cURL
- Browser for GET requests
- Frontend application

## Next Steps for Production
1. Add JWT authentication
2. Implement password hashing (BCrypt)
3. Add input validation and sanitization
4. Implement proper logging
5. Add rate limiting
6. Add API documentation (Swagger)
7. Add unit and integration tests
8. Implement proper error handling
9. Add monitoring and health checks
10. Add database migrations
