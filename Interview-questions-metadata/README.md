# Interview Questions Metadata

A Node.js web application for organizing, managing, and serving interview questions and technical documentation stored as Markdown files. This project provides both a web interface and RESTful APIs to browse and retrieve content dynamically.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Testing](#testing)
- [Content Organization](#content-organization)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

This project serves as a centralized repository for interview questions and technical notes across various topics including:
- **Programming Languages**: Java, Node.js, Python, ReactJS, AngularJS
- **Frameworks & Libraries**: Spring Boot, Hibernate, MyBatis
- **Cloud & DevOps**: AWS, Docker, Kubernetes
- **Databases**: MySQL, PostgreSQL, MongoDB
- **Architecture**: Microservices, Design Patterns
- **And many more topics...**

The application dynamically reads Markdown files from the `public` directory and renders them as HTML, providing an easy-to-navigate interface for browsing technical content.

## ✨ Features

### Version 1 (Current)
- **File Tree Navigation**: Browse all Markdown files in a hierarchical tree view
- **Dynamic Content Rendering**: Convert Markdown files to HTML on-the-fly
- **Next/Previous Navigation**: Seamlessly navigate between files
- **File Selection**: Click on any file in the tree to view its content
- **Responsive UI**: Clean, user-friendly interface built with EJS templates

### Version 2 (In Progress)
- **Slug-based Content Access**: Access content using human-readable slugs
- **RESTful API**: JSON API endpoints for programmatic content retrieval
- **Content Mapping**: Automated content indexing and mapping system
- **Enhanced Navigation**: Next/previous slug navigation with metadata

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Template Engine**: EJS
- **Markdown Processing**: Marked
- **API Documentation**: Swagger UI, Redocly
- **Testing**: Jest, Supertest
- **Development**: Nodemon
- **CORS**: Enabled for cross-origin requests

## 📁 Project Structure

```
Interview-questions-metadata/
├── public/                          # Markdown content files
│   ├── java/                        # Java-related content
│   ├── ReactJS/                     # React-related content
│   ├── AWS/                         # AWS-related content
│   ├── docker-k8s/                  # Docker & Kubernetes content
│   ├── microservices/               # Microservices architecture content
│   └── ...                          # Other topic directories
├── src/
│   ├── server.js                    # Main Express server
│   ├── global-constants.js          # Global configuration
│   ├── config/
│   │   └── swagger.js               # Swagger/OpenAPI configuration
│   ├── routes/
│   │   ├── v1/                      # Version 1 routes
│   │   │   └── pages--content-details/
│   │   └── v2/                      # Version 2 routes
│   │       └── api--smart-content/
│   ├── views/                       # EJS templates
│   │   ├── home.ejs
│   │   ├── v1.ejs
│   │   └── content-details/
│   └── common/
│       └── services/
│           └── FileOperations/      # File handling utilities
├── tests/                           # Test files
├── assets/                          # Static assets (icons, images)
├── package.json
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Interview-questions-metadata
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000` (or the port specified in `PORT` environment variable)

## 📖 Usage

### Web Interface

1. **Home Page**: Navigate to `http://localhost:3000/` to see the home page

2. **Browse Content (v1)**: 
   - Visit `http://localhost:3000/v1/pages/admin/content-details/itr1`
   - Use the file tree on the left to browse available Markdown files
   - Click on any file to view its rendered content
   - Use `?filename=<filename>&direction=next` or `?filename=<filename>&direction=prev` to navigate

### API Usage

**Version 1 - Page Rendering**
```
GET /v1/pages/admin/content-details/itr1?filename=<filename>&direction=<next|prev>
```

**Version 2 - JSON API**
```
GET /v2/api/smart-content/itr1/:slug
GET /v2/api/smart-content/itr1/contentMappings
```

## 🔌 API Endpoints

### Version 1 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/pages/admin/content-details/itr1` | Render content page with file tree and selected file content |
| GET | `/v1/pages/admin/content-details/itr1?filename=<file>&direction=<next\|prev>` | Navigate to next/previous file |

### Version 2 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2/api/smart-content/itr1/:slug` | Get content by slug (JSON response) |
| GET | `/v2/api/smart-content/itr1/contentMappings` | Get all content mappings (JSON response) |

### Query Parameters

- **filename** (optional): Name of the Markdown file to display
- **direction** (optional): Navigation direction - `next` or `prev`
- **slug** (required for v2): Human-readable identifier for content

## 📚 API Documentation

The project includes comprehensive API documentation powered by **Swagger UI** and **Redocly**. Both tools provide interactive documentation interfaces for exploring and testing the API endpoints.

### Accessing the Documentation

Once the server is running, you can access the API documentation at:

- **Swagger UI**: `http://localhost:3000/api-docs`
  - Interactive API explorer with "Try it out" functionality
  - Test endpoints directly from the browser
  - View request/response schemas and examples

- **Redocly**: `http://localhost:3000/docs`
  - Beautiful, responsive API documentation
  - Clean, readable format optimized for documentation
  - Three-panel layout with navigation

- **OpenAPI JSON Spec**: `http://localhost:3000/api-docs/swagger.json`
  - Raw OpenAPI 3.0 specification in JSON format
  - Can be imported into API testing tools (Postman, Insomnia, etc.)
  - Can be used with other OpenAPI-compatible tools

### Features

- **Interactive Testing**: Test API endpoints directly from Swagger UI
- **Schema Documentation**: Complete request/response schemas with examples
- **Error Responses**: Documented error responses with status codes
- **Parameter Documentation**: Detailed parameter descriptions and validation rules
- **Tagged Endpoints**: Endpoints organized by tags (v1, v2, Content Mappings)

### Adding Documentation to New Endpoints

To add Swagger documentation to a new endpoint, use JSDoc-style annotations:

```javascript
/**
 * @swagger
 * /v2/api/your-endpoint:
 *   get:
 *     summary: Brief description
 *     description: Detailed description
 *     tags: [Your Tag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YourSchema'
 */
router.get("/your-endpoint", (req, res) => {
  // Your route handler
});
```

The Swagger configuration automatically scans route files for these annotations and generates the OpenAPI specification.

## 💻 Development

### Running in Development Mode

The project uses `nodemon` for automatic server restarts during development:

```bash
npm start
```

Nodemon watches for changes in:
- `.js` files
- `.json` files
- `.md` files
- `.ejs` files

### Adding New Content

1. **Add Markdown files** to the `public` directory, organized by topic
2. **For v1**: Files are automatically discovered and added to the file tree
3. **For v2**: Add entries to the `contentMappings` array in the route file, or use the automated mapping utility (in development)

### Code Structure

- **Routes**: Organized by version (`v1`, `v2`) and functionality
- **Services**: Reusable file operations and utilities in `src/common/services`
- **Views**: EJS templates for rendering HTML pages
- **Constants**: Global configuration in `src/global-constants.js`

## 🧪 Testing

Run tests using Jest:

```bash
npm test
```

Test files are located in the `tests/` directory and cover:
- API endpoint testing
- Server functionality testing
- File operations testing

## 📚 Content Organization

Content is organized in the `public` directory by topic:

```
public/
├── java/                    # Java programming topics
├── ReactJS/                 # React.js topics
├── AWS/                     # Amazon Web Services
├── docker-k8s/              # Containerization & orchestration
├── microservices/           # Microservices architecture
├── Databases/               # Database-related content
├── spring-boot/             # Spring Boot framework
├── kafka/                   # Apache Kafka
├── miscellaneous/           # Other topics
└── ...
```

Each directory can contain:
- `index.md` - Overview or main content file
- Topic-specific Markdown files
- Subdirectories for further organization

## 🔮 Future Enhancements

Based on the project roadmap (see `public/AboutThisProjectV2.md`):

- [ ] **Automated Content Mapping**: Generate content mappings dynamically from base path configurations
- [ ] **Enhanced Navigation**: Next/previous slug navigation with metadata (selected index, total count)
- [ ] **Role-Based Access Control (RBAC)**: Secure admin endpoints
- [ ] **UI Improvements**: Enhanced user interface with better versioning support
- [ ] **Search Functionality**: Full-text search across all content
- [ ] **Content Categories**: Tag-based organization and filtering
- [ ] **Export Options**: Export content in various formats (PDF, JSON, etc.)

## 📝 Notes

- This project is a learning initiative focused on Markdown file handling and dynamic content rendering
- The project evolved from basic file serving (v1) to a more structured API-based approach (v2)
- Technologies like EJS, Node.js, and Express.js were new to the developer during v1 development, making this a valuable learning experience

## 📄 License

ISC

## 👤 Author

See `package.json` for author information.

---

**Note**: This project is actively being developed. Some features mentioned in v2 are still in progress. Check the `public/AboutThisProjectV2.md` file for the latest roadmap and updates.

