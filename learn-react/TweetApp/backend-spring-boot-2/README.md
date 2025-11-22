# TweetApp Spring Boot 2 Backend

Spring Boot 2 implementation of the TweetApp backend APIs.

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- MongoDB running on localhost:27017

## Configuration

Update `src/main/resources/application.properties` to configure:
- Server port (default: 3006)
- MongoDB connection URI
- CORS settings

## Running the Application

```bash
mvn spring-boot:run
```

The application will start on port 3006.

## Welcome Page

- Welcome Page: http://localhost:3006/

## API Documentation

- Swagger UI: http://localhost:3006/api-docs
- Redoc: http://localhost:3006/redoc
- OpenAPI JSON: http://localhost:3006/api-docs-json

## Endpoints

All endpoints from the Node.js backend are implemented:
- `/tweets/v1` - Tweet V1 APIs
- `/tweets/v2` - Tweet V2 APIs
- `/tasks` - Task APIs
- `/tags` - Tag APIs
- `/topics` - Topic APIs
- `/links` - Link APIs
- `/memory-maps` - Memory Map APIs
- `/intvw-mgmt/v1/categories` - Interview Management V1 APIs
- `/intvw-mgmt/v2` - Interview Management V2 APIs
- `/pinned-items` - Pinned Item APIs
- `/api/words` - Word APIs
- `/my-resume` - My Resume APIs
- `/node-story` - Related Node APIs
- `/think-tank/v1` - Think Tank APIs
- `/cgpt` - ChatGPT Conversation APIs
- `/activities` - Activity APIs
- `/c-objects` - Comparable Object APIs
- `/consolidated-reporting` - Consolidated Reporting APIs
- `/api/users` - User APIs

