// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

/**
 * Swagger Documentation Object.
 * This contains detailed configuration and basic metadata.
 */

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Backend API Documentation',
      version: '1.0.0',
      description: 'Documentation for my backend APIs. Below you will find all available endpoints, their methods, parameters, request/response schemas, and possible responses.',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: ['./src/routes/*.js'], // Path to route files for API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
