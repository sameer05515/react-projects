// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

/**
 * Swagger Documentation Object.
 * This contains configuration and improved metadata.
 */

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartNote API Documentation',
      version: '1.0.0',
      description: `
        <strong>Welcome to the SmartNote API docs!</strong>
        <br><br>
        This API documentation details all endpoints for the SmartNote backend, including authentication, topics, tags, tasks, memory maps, and ChatGPT integrations.
        <br><br>
        <b>Authentication</b>: Secure endpoints require a Bearer JWT token.<br>
        <b>Contact</b>: support@example.com<br>
        <b>Base URL</b>: <code>http://localhost:3003</code>
        <br><br>
        <b>Note:</b> All endpoints prefer and produce <code>application/json</code>.
      `,
      contact: {
        name: 'SmartNote API Support',
        url: 'https://github.com/yourusername/smartnote',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3003',
        description: 'Local development server'
      },
      // Add production server when deploying
      // {
      //   url: 'https://api.smartnote.com',
      //   description: 'Production server'
      // }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer {token}'
        }
      },
      schemas: {} // Initialize empty schemas object to prevent $ref errors
      // Optionally: You can add reusable schemas here later via $ref
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    // Add global tags for grouping, optional
    tags: [
      { name: 'Auth', description: 'Authentication and user session endpoints' },
      { name: 'User', description: 'User registration, login, profile, and role operations' },
      { name: 'Topic', description: 'Operations on topics and sections' },
      { name: 'Tag', description: 'Tag management' },
      { name: 'MemoryMap', description: 'Memory maps and associated operations' },
      { name: 'Task', description: 'Tasks and activity history' },
      { name: 'ChatGPT', description: 'ChatGPT file, conversation, and message handlers' },
    ]
  },
  apis: ['./src/routes/**/*.js'], // Path to route files for API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
