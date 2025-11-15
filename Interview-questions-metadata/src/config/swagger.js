const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Interview Questions Metadata API",
      version: "2.0.0",
      description:
        "API documentation for Interview Questions Metadata - A Node.js web application for organizing, managing, and serving interview questions and technical documentation stored as Markdown files.",
      contact: {
        name: "API Support",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://your-production-url.com",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "Content Details (v1)",
        description: "Version 1 endpoints for content details and file navigation",
      },
      {
        name: "Smart Content API (v2)",
        description: "Version 2 endpoints for slug-based content retrieval",
      },
      {
        name: "Content Mappings",
        description: "Endpoints for retrieving content mappings",
      },
    ],
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
        ContentResponse: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "File content (Markdown or other format)",
            },
            outputType: {
              type: "string",
              description: "File extension/type (e.g., 'md', 'txt')",
              example: "md",
            },
          },
        },
        ContentMapping: {
          type: "object",
          properties: {
            slug: {
              type: "string",
              description: "Human-readable slug identifier",
              example: "actionables--my-bugs-and-new-requirements-md",
            },
            name: {
              type: "string",
              description: "Display name for the content",
            },
            fileLocation: {
              type: "string",
              description: "Full path to the file",
            },
          },
        },
        FileList: {
          type: "object",
          description: "Hierarchical file structure",
          properties: {
            name: {
              type: "string",
            },
            path: {
              type: "string",
            },
            fileType: {
              type: "string",
              enum: ["file", "directory"],
            },
            children: {
              type: "array",
              items: {
                $ref: "#/components/schemas/FileList",
              },
            },
            selected: {
              type: "boolean",
              description: "Whether this file is currently selected",
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "../routes/**/*.js"),
    path.join(__dirname, "../server.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

