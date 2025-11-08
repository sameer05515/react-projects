# Backend - Spring Boot Application

A Spring Boot backend application for the Munshi project with REST APIs for project management, MongoDB persistence, and Swagger documentation.

## Prerequisites

- Java 17 or higher
- Maven 3.6+ (or use Maven Wrapper)
- MongoDB 4.4+ (running locally or accessible)

## Getting Started

### MongoDB Setup

1. Install MongoDB if not already installed:
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

2. Ensure MongoDB is running on `localhost:27017`

3. The application will automatically create a database named `munshi` on first run

### Running the Application

1. Navigate to the project directory:
   ```bash
   cd backend
   ```

2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   
   Or if you have Maven Wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```

3. The application will start on `http://localhost:8080`

### API Documentation (Swagger)

Once the application is running, access the Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

The OpenAPI JSON documentation is available at:
```
http://localhost:8080/api-docs
```

## API Endpoints

### Project Management APIs

All project APIs are available under `/api/projects`:

- **POST** `/api/projects` - Create a new project
- **GET** `/api/projects` - Get all projects
- **GET** `/api/projects/{id}` - Get project by ID
- **PUT** `/api/projects/{id}` - Update a project
- **DELETE** `/api/projects/{id}` - Delete a project
- **GET** `/api/projects/search?name={name}` - Search projects by name
- **GET** `/api/projects/status/{status}` - Get projects by status
- **GET** `/api/projects/owner/{owner}` - Get projects by owner

### Health Check

- **GET** `/api/health` - Check application health

### Example API Request

**Create a Project:**
```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Project",
    "description": "Project description",
    "status": "ACTIVE",
    "startDate": "2024-01-01T00:00:00",
    "owner": "John Doe",
    "tags": ["web", "react"]
  }'
```

**Get All Projects:**
```bash
curl http://localhost:8080/api/projects
```

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/munshi/backend/
│   │   │       ├── BackendApplication.java
│   │   │       ├── config/
│   │   │       │   └── SwaggerConfig.java
│   │   │       ├── controller/
│   │   │       │   ├── HealthController.java
│   │   │       │   └── ProjectController.java
│   │   │       ├── dto/
│   │   │       │   ├── ProjectRequest.java
│   │   │       │   └── ProjectResponse.java
│   │   │       ├── exception/
│   │   │       │   ├── ErrorResponse.java
│   │   │       │   └── GlobalExceptionHandler.java
│   │   │       ├── model/
│   │   │       │   └── Project.java
│   │   │       ├── repository/
│   │   │       │   └── ProjectRepository.java
│   │   │       └── service/
│   │   │           └── ProjectService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application.yml
│   └── test/
│       └── java/
│           └── com/munshi/backend/
│               └── BackendApplicationTests.java
├── pom.xml
└── README.md
```

## Dependencies

- **Spring Boot Web**: REST API support
- **Spring Data MongoDB**: MongoDB database access layer
- **Spring Boot Validation**: Request validation
- **SpringDoc OpenAPI**: Swagger/OpenAPI documentation
- **Spring Boot DevTools**: Development tools for hot reload
- **Lombok**: Reduces boilerplate code
- **Spring Boot Test**: Testing framework

## Configuration

### MongoDB Configuration

Application configuration can be modified in:
- `src/main/resources/application.properties`
- `src/main/resources/application.yml`

Default MongoDB connection:
- URI: `mongodb://localhost:27017/munshi`
- Database: `munshi`

To change the MongoDB connection, update the `spring.data.mongodb.uri` property.

### Swagger Configuration

Swagger UI is configured and accessible at `/swagger-ui.html`. The configuration can be customized in `SwaggerConfig.java`.

## Building the Application

To build the application:
```bash
mvn clean package
```

This will create a JAR file in the `target/` directory that can be run with:
```bash
java -jar target/backend-1.0.0.jar
```

## Development

The application uses Spring Boot DevTools for automatic restart during development. Simply save your changes and the application will reload automatically.

## Project Model

The Project entity includes the following fields:
- `id` (String) - Unique identifier (auto-generated)
- `name` (String) - Project name (required)
- `description` (String) - Project description
- `status` (String) - Project status: ACTIVE, COMPLETED, ON_HOLD, CANCELLED (required)
- `startDate` (LocalDateTime) - Project start date (required)
- `endDate` (LocalDateTime) - Project end date
- `owner` (String) - Project owner
- `tags` (String[]) - Project tags
- `createdAt` (LocalDateTime) - Creation timestamp (auto-generated)
- `updatedAt` (LocalDateTime) - Last update timestamp (auto-generated)

## Error Handling

The application includes global exception handling:
- **404 Not Found**: When a project is not found
- **400 Bad Request**: When validation fails
- **500 Internal Server Error**: For unexpected errors

All errors return a standardized error response with status code, message, and timestamp.

## License

This project is part of the Munshi project.

