// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Backend API Documentation',
      version: '1.0.0',
      description: 'Documentation for my backend APIs',
    },
  },
  apis: ['./src/routes/*.js'], // Define the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
