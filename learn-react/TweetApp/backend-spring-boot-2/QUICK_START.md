# Quick Start Guide

## Project Structure
```
backend-spring-boot-2/
├── src/
│   ├── main/
│   │   ├── java/com/tweetapp/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── model/           # Entity models
│   │   │   ├── repository/      # MongoDB repositories
│   │   │   ├── service/         # Business logic services
│   │   │   └── util/            # Utility classes
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Running the Application

1. **Prerequisites:**
   - Java 21+
   - Maven 3.6+
   - MongoDB running on localhost:27017

2. **Build and Run:**
   ```bash
   cd backend-spring-boot-2
   mvn clean install
   mvn spring-boot:run
   ```

3. **Access:**
   - Welcome Page: http://localhost:3006/
   - API Base URL: http://localhost:3006
   - Swagger UI: http://localhost:3006/api-docs
   - Redoc: http://localhost:3006/redoc
   - OpenAPI JSON: http://localhost:3006/api-docs-json

## Implemented Endpoints

### ✅ Completed
- `/topics` - Topic CRUD operations
- `/tasks` - Task CRUD operations  
- `/tags` - Tag CRUD operations

### 🔄 To Be Implemented
All other endpoints follow the same pattern. See `IMPLEMENTATION_STATUS.md` for details.

## Adding New Endpoints

1. **Create Service** (if not exists):
   ```java
   @Service
   public class XxxService {
       @Autowired
       private XxxRepository repository;
       // Implement CRUD methods
   }
   ```

2. **Create Controller**:
   ```java
   @RestController
   @RequestMapping("/xxx")
   public class XxxController {
       @Autowired
       private XxxService service;
       // Implement REST endpoints
   }
   ```

3. **Test**:
   - Use Swagger UI at http://localhost:3006/api-docs
   - Or use Postman/curl

## Notes

- All entities use `uniqueId` as the business identifier (not MongoDB `_id`)
- UUIDs are auto-generated using `UuidUtil.generateUuid()`
- Dates are handled with `LocalDateTime`
- Error responses follow the pattern: `{"error": "message"}` or `{"message": "message"}`

