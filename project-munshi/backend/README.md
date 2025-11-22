# Backend - Spring Boot Application

A Spring Boot backend application for the Munshi project with REST APIs for project management, MongoDB persistence, and Swagger documentation.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Building the Application](#building-the-application)
- [Development](#development)
- [Project Model](#project-model)
- [Error Handling](#error-handling)

## Prerequisites

- **Java 17** or higher
- **Maven 3.6+** (or use Maven Wrapper)
- **MongoDB 4.4+** (running locally or accessible)

## Getting Started

### MongoDB Setup

1. **Install MongoDB** if not already installed:
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Or use Docker: 
     ```bash
     docker run -d -p 27017:27017 --name mongodb mongo:latest
     ```

2. **Ensure MongoDB is running** on `localhost:27017`

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

## API Documentation

Once the application is running, you can access the API documentation in multiple ways:

### Swagger UI
Interactive API documentation with testing capabilities:
```
http://localhost:8080/swagger-ui.html
```

### Redoc
Beautiful, responsive API documentation:
```
http://localhost:8080/redoc.html
```

### OpenAPI JSON
The OpenAPI JSON specification is available at:
```
http://localhost:8080/api-docs
```

## API Endpoints

### Project Management APIs

All project APIs are available under `/api/projects`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create a new project |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/{id}` | Get project by ID |
| PUT | `/api/projects/{id}` | Update a project |
| DELETE | `/api/projects/{id}` | Delete a project |
| GET | `/api/projects/search?name={name}` | Search projects by name |
| GET | `/api/projects/status/{status}` | Get projects by status |
| GET | `/api/projects/owner/{owner}` | Get projects by owner |

### Health Check

- **GET** `/api/health` - Check application health

### Example API Requests

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

**Get Project by ID:**
```bash
curl http://localhost:8080/api/projects/{id}
```

**Update a Project:**
```bash
curl -X PUT http://localhost:8080/api/projects/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Project Name",
    "status": "COMPLETED"
  }'
```

**Delete a Project:**
```bash
curl -X DELETE http://localhost:8080/api/projects/{id}
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

## Configuration

### MongoDB Configuration

Application configuration can be modified in:
- `src/main/resources/application.properties`
- `src/main/resources/application.yml`

**Default MongoDB connection:**
- URI: `mongodb://localhost:27017/munshi`
- Database: `munshi`

To change the MongoDB connection, update the `spring.data.mongodb.uri` property in `application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/munshi
      database: munshi
```

### API Documentation Configuration

Both Swagger UI and Redoc are configured for API documentation:

- **Swagger UI**: Accessible at `/swagger-ui.html` - Interactive API documentation with testing capabilities
- **Redoc**: Accessible at `/redoc.html` - Beautiful, responsive API documentation

The OpenAPI configuration can be customized in `SwaggerConfig.java`, and the paths can be modified in `application.yml`.

### Application Properties

Key configuration options in `application.yml`:

```yaml
server:
  port: 8080

spring:
  application:
    name: backend
  data:
    mongodb:
      uri: mongodb://localhost:27017/munshi

logging:
  level:
    root: INFO
    com.munshi.backend: DEBUG

springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
    operationsSorter: method
    tagsSorter: alpha
  redoc:
    path: /redoc.html
    enabled: true
```

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

### Running Tests

```bash
mvn test
```

## Project Model

The Project entity includes the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | No | Unique identifier (auto-generated) |
| `name` | String | Yes | Project name |
| `description` | String | No | Project description |
| `status` | String | Yes | Project status: `ACTIVE`, `COMPLETED`, `ON_HOLD`, `CANCELLED` |
| `startDate` | LocalDateTime | Yes | Project start date |
| `endDate` | LocalDateTime | No | Project end date |
| `owner` | String | No | Project owner |
| `tags` | String[] | No | Project tags |
| `createdAt` | LocalDateTime | No | Creation timestamp (auto-generated) |
| `updatedAt` | LocalDateTime | No | Last update timestamp (auto-generated) |

## Dependencies

- **Spring Boot Web** - REST API support
- **Spring Data MongoDB** - MongoDB database access layer
- **Spring Boot Validation** - Request validation
- **SpringDoc OpenAPI** - Swagger/OpenAPI documentation
- **Spring Boot DevTools** - Development tools for hot reload
- **Lombok** - Reduces boilerplate code
- **Spring Boot Test** - Testing framework

## Error Handling

The application includes global exception handling:

- **404 Not Found** - When a project is not found
- **400 Bad Request** - When validation fails
- **500 Internal Server Error** - For unexpected errors

All errors return a standardized error response with:
- Status code
- Error message
- Timestamp

Example error response:
```json
{
  "status": 404,
  "message": "Project not found with id: 123",
  "timestamp": "2024-01-01T12:00:00"
}
```

## License

This project is part of the Munshi project.

