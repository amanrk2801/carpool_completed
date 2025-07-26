# Carpool Connect - Production-Ready Carpool Application

A full-stack carpool application built with a Spring Boot backend and React frontend, designed for production deployment.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.2.1, Java 17, MySQL 8.0, Spring Security
- **Frontend**: React 19, Vite, Tailwind CSS, React Router
- **Security**: BCrypt password hashing, JWT authentication, CORS protection
- **Database**: MySQL with connection pooling and optimized queries
- **Caching**: API response caching with configurable TTL
- **Error Handling**: Global exception handling with user-friendly messages
- **Monitoring**: Spring Boot Actuator with health checks

## ✨ Features

### User Management
- User registration and authentication
- Secure password hashing (BCrypt)
- JWT-based session management
- Profile management with ratings

### Ride Management
- Create and offer rides
- Search and filter available rides
- Real-time ride status updates
- Driver and passenger management

### Booking System
- Book rides with instant confirmation
- Cancel bookings with persistence
- View booking history and status
- Configurable email notifications

### Security & Production Features
- Input validation and sanitization
- SQL injection and XSS protection (CSP headers)
- Environment-based configuration
- API retry logic with exponential backoff
- Response caching for performance

## 🚀 Quick Start (Development)

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 18+ and npm
- MySQL 8.0+ (running on localhost:3306)

### Database Setup
Run the following SQL commands to set up the database:
```sql
CREATE DATABASE IF NOT EXISTS carpool_db;
CREATE USER 'carpool_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON carpool_db.* TO 'carpool_user'@'localhost';
FLUSH PRIVILEGES;
```

### Running the Application

#### Backend (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the backend:
   ```bash
   mvn spring-boot:run
   ```
   The backend runs on http://localhost:8080.

#### Frontend (React)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on http://localhost:5173.

### Accessing the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Connection Test**: http://localhost:5173/test-connection

## 🐳 Production Deployment with Docker

### Using Docker Compose (Recommended)

1. Clone the repository and configure:
   ```bash
   git clone <repository-url>
   cd carpool-application
   cp .env.example .env
   ```

2. Edit `.env` with production values (e.g., database credentials, JWT secret).

3. Start all services:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - **Frontend**: http://localhost:80
   - **Backend API**: http://localhost:8080/api
   - **Database**: localhost:3306

### Manual Docker Deployment

#### Backend
```bash
cd backend
docker build -t carpool-backend .
docker run -d \
  --name carpool-backend \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=production \
  -e DATABASE_URL=jdbc:mysql://host.docker.internal:3306/carpool_db \
  -e DATABASE_USERNAME=carpool_user \
  -e DATABASE_PASSWORD=secure_password \
  carpool-backend
```

#### Frontend
```bash
cd frontend
docker build -t carpool-frontend .
docker run -d \
  --name carpool-frontend \
  -p 80:80 \
  carpool-frontend
```

## 📁 Project Structure

```
carpool-application/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/carpoolconnect/
│   │   │   │       ├── CarpoolConnectApplication.java
│   │   │   │       ├── config/
│   │   │   │       │   ├── SecurityConfig.java
│   │   │   │       │   ├── CorsConfig.java
│   │   │   │       │   └── CacheConfig.java
│   │   │   │       ├── controller/
│   │   │   │       │   ├── AuthController.java
│   │   │   │       │   ├── UserController.java
│   │   │   │       │   ├── RideController.java
│   │   │   │       │   └── BookingController.java
│   │   │   │       ├── dto/
│   │   │   │       │   ├── UserDTO.java
│   │   │   │       │   ├── RideDTO.java
│   │   │   │       │   └── BookingDTO.java
│   │   │   │       ├── entity/
│   │   │   │       │   ├── User.java
│   │   │   │       │   ├── Ride.java
│   │   │   │       │   └── Booking.java
│   │   │   │       ├── repository/
│   │   │   │       │   ├── UserRepository.java
│   │   │   │       │   ├── RideRepository.java
│   │   │   │       │   └── BookingRepository.java
│   │   │   │       ├── service/
│   │   │   │       │   ├── AuthService.java
│   │   │   │       │   ├── UserService.java
│   │   │   │       │   ├── RideService.java
│   │   │   │       │   └── BookingService.java
│   │   │   │       ├── exception/
│   │   │   │       │   ├── GlobalExceptionHandler.java
│   │   │   │       │   └── CustomExceptions.java
│   │   │   │       └── util/
│   │   │   │           ├── JwtUtil.java
│   │   │   │           └── ValidationUtil.java
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-production.yml
│   │   │       └── db/migration/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── rides/
│   │   │   │   ├── RideList.jsx
│   │   │   │   ├── CreateRide.jsx
│   │   │   │   └── RideDetails.jsx
│   │   │   ├── bookings/
│   │   │   │   ├── BookingList.jsx
│   │   │   │   └── BookingDetails.jsx
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   └── user/
│   │   │       └── Profile.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── rideService.js
│   │   │   └── bookingService.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔧 Configuration Files

### Backend Configuration (application.yml)
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: carpool-connect
  
  datasource:
    url: jdbc:mysql://localhost:3306/carpool_db
    username: ${DATABASE_USERNAME:carpool_user}
    password: ${DATABASE_PASSWORD:secure_password}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      idle-timeout: 300000
      max-lifetime: 1200000

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true

  security:
    jwt:
      secret: ${JWT_SECRET:your-secret-key-here}
      expiration: 86400000 # 24 hours

  cache:
    type: simple
    cache-names:
      - rides
      - users
    caffeine:
      spec: maximumSize=1000,expireAfterWrite=300s

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: when-authorized

logging:
  level:
    com.carpoolconnect: INFO
    org.springframework.security: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/carpool-connect.log
```

### Frontend Configuration (package.json)
```json
{
  "name": "carpool-connect-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "axios": "^1.3.4",
    "lucide-react": "^0.263.1",
    "@headlessui/react": "^1.7.13",
    "react-hook-form": "^7.43.5",
    "date-fns": "^2.29.3",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0",
    "eslint": "^8.35.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "tailwindcss": "^3.2.7",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21"
  }
}
```

### Docker Compose Configuration
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: carpool-mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: carpool_db
      MYSQL_USER: carpool_user
      MYSQL_PASSWORD: ${DATABASE_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - carpool-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: carpool-backend
    environment:
      SPRING_PROFILES_ACTIVE: production
      DATABASE_URL: jdbc:mysql://mysql:3306/carpool_db
      DATABASE_USERNAME: carpool_user
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    networks:
      - carpool-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/api/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: carpool-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - carpool-network

volumes:
  mysql_data:

networks:
  carpool-network:
    driver: bridge
```

### Environment Variables (.env.example)
```env
# Database Configuration
MYSQL_ROOT_PASSWORD=root_password_here
DATABASE_PASSWORD=secure_password_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-256-bits

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Application Configuration
SPRING_PROFILES_ACTIVE=production
API_BASE_URL=http://localhost:8080/api
```

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication with configurable expiration
- BCrypt password hashing with salt rounds
- Role-based access control (USER, DRIVER, ADMIN)
- Secure session management

### API Security
- CORS configuration for cross-origin requests
- Input sanitization and validation
- SQL injection prevention with JPA/Hibernate
- XSS protection with Content Security Policy headers
- Rate limiting for API endpoints

### Data Protection
- Sensitive data encryption in database
- Environment-based configuration
- Secure password reset functionality
- Data validation on both client and server side

## 📊 API Documentation

### Authentication Endpoints
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/refresh - Token refresh
POST /api/auth/logout - User logout
POST /api/auth/forgot-password - Password reset request
POST /api/auth/reset-password - Password reset confirmation
```

### User Management
```
GET /api/users/profile - Get user profile
PUT /api/users/profile - Update user profile
GET /api/users/{id} - Get user by ID
PUT /api/users/{id}/rating - Update user rating
```

### Ride Management
```
GET /api/rides - Get all rides (with pagination and filters)
POST /api/rides - Create new ride
GET /api/rides/{id} - Get ride details
PUT /api/rides/{id} - Update ride
DELETE /api/rides/{id} - Delete ride
GET /api/rides/search - Search rides by criteria
```

### Booking Management
```
GET /api/bookings - Get user bookings
POST /api/bookings - Create new booking
GET /api/bookings/{id} - Get booking details
PUT /api/bookings/{id}/cancel - Cancel booking
GET /api/bookings/history - Get booking history
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
mvn test -Dtest=UserServiceTest
mvn verify # Integration tests
```

### Frontend Testing
```bash
cd frontend
npm test
npm run test:coverage
npm run test:e2e
```

## 📈 Performance Optimization

### Backend Optimizations
- Database connection pooling with HikariCP
- JPA query optimization with @Query annotations
- Response caching with Spring Cache abstraction
- Lazy loading for entity relationships
- API pagination for large datasets

### Frontend Optimizations
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Bundle optimization with Vite
- API response caching
- Debounced search inputs

## 🔧 Monitoring & Logging

### Health Checks
- Spring Boot Actuator endpoints
- Database connectivity checks
- Custom health indicators
- Container health checks in Docker

### Logging Configuration
- Structured logging with JSON format
- Log rotation and retention policies
- Different log levels for environments
- Centralized logging with ELK stack support

## 🚢 Deployment Options

### Cloud Deployment
1. **AWS**: Deploy using ECS, RDS, and S3
2. **Google Cloud**: Use Cloud Run, Cloud SQL, and Cloud Storage
3. **Azure**: Deploy with Container Instances and Azure Database
4. **Heroku**: Simple deployment with Heroku Postgres

### Self-Hosted Deployment
1. **Docker Swarm**: Multi-node container orchestration
2. **Kubernetes**: Enterprise-grade container management
3. **Traditional VM**: Direct deployment on virtual machines

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Run backend tests
        run: |
          cd backend
          mvn clean test
      - name: Run frontend tests
        run: |
          cd frontend
          npm ci
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          # Add deployment commands here
```

## 📚 Additional Resources

### Documentation
- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Best Practices
- Follow RESTful API design principles
- Implement proper error handling and logging
- Use environment-specific configurations
- Regular security updates and dependency management
- Code review and testing practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation and FAQ
- Contact the development team

---

**Carpool Connect** - Making shared transportation easy, secure, and efficient.