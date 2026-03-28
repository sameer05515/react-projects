/**
 * Main server initialization for the Node.js backend application.
 * Sets up Express, middleware, MongoDB, CORS, API documentation, and routes.
 */

require("dotenv").config(); // Load environment variables ASAP

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const redoc = require("redoc-express");
const swaggerSpec = require("./swagger");
const {
  connectRedis,
  quitRedis,
  isRedisConfigured,
  isRedisReady,
} = require("./redis/redisClient");

// App & port configuration
const app = express();
const PORT = process.env.PORT || 3003;
const REACT_PORT = process.env.REACT_PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mongodb_test";

// Configure EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routers map for maintainability and easy extension
const routers = [
  { path: "/tweets/v1", handler: "./routes/tweet/Tweet.v1.routes" },
  { path: "/tweets/v2", handler: "./routes/tweet/Tweet.v2.routes" },
  { path: "/activities", handler: "./routes/activity/Activity.routes" },
  { path: "/tasks", handler: "./routes/task/Task.routes" },
  { path: "/api/users", handler: "./routes/user/User.routes" },
  { path: "/tags", handler: "./routes/tag/Tag.routes" },
  { path: "/topics", handler: "./routes/topic/Topic.routes" },
  { path: "/c-objects", handler: "./routes/comparable-object/ComparableObject.routes" },
  { path: "/api/words", handler: "./routes/word/Word.routes" },
  { path: "/my-resume", handler: "./routes/my-resume/MyResume.routes" },
  { path: "/links", handler: "./routes/link/Link.routes" },
  { path: "/intvw-mgmt/v1/categories", handler: "./routes/interview-mgmt/InterviewMgmt.v1.routes" },
  { path: "/pinned-items", handler: "./routes/pinned-item/PinnedItem.routes" },
  { path: "/intvw-mgmt/v2", handler: "./routes/interview-mgmt/InterviewMgmt.v2.routes" },
  { path: "/memory-maps", handler: "./routes/memory-map/MemoryMap.routes" },
  { path: "/export", handler: "./routes/export/Export.routes" },
  { path: "/node-story", handler: "./routes/related-node/RelatedNode.routes" },
  { path: "/consolidated-reporting", handler: "./routes/consolidated-reporting/ConsolidatedReporting.routes" },
  { path: "/cgpt", handler: "./routes/chatgpt/ChatGPTConversation.routes" },
  { path: "/think-tank/v1", handler: "./routes/think-tank/ThinkTank.v1.routes" },
  { path: "/think-tank/v1/stats", handler: "./routes/think-tank/ThinkTank.v1.stats.routes" },
];

// General documentation routes at root
const docRoutes = require("./routes/docs/doc.routes");

// Start MongoDB connection early
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

// CORS configuration and usage
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : `http://127.0.0.1:${REACT_PORT}`,
  credentials: true,
  optionsSuccessStatus: 200,
};

if (process.env.NODE_ENV === "development") {
  app.use(cors());
  console.warn("WARNING: CORS is enabled for all origins in development mode.");
} else {
  app.use(cors(corsOptions));
}

// Body parser middleware with configurable limit
const bodyParserLimit = process.env.BODY_PARSER_LIMIT || "10mb";
app.use(bodyParser.json({ limit: bodyParserLimit }));
app.use(bodyParser.urlencoded({ limit: bodyParserLimit, extended: true }));

// Require Bearer JWT for all API routes except public paths (login, register, docs, health)
const { requireAuth } = require("./middleware/requireAuth");
const { isPublicPath } = require("./middleware/publicPaths");
app.use((req, res, next) => {
  if (isPublicPath(req)) return next();
  return requireAuth(req, res, next);
});

// Register all routers dynamically
routers.forEach(({ path, handler }) => {
  app.use(path, require(handler));
});

// Welcome route - render welcome.ejs
app.get("/", (req, res) => {
  res.render("welcome", {
    title: "TweetApp API Server",
    port: PORT,
    baseUrl: `http://localhost:${PORT}`,
  });
});

// Register general documentation routes
app.use("", docRoutes);

// Health check (public): MongoDB + optional Redis
app.get("/health", (req, res) => {
  const mongoOk = mongoose.connection.readyState === 1;
  let redisStatus = "disabled";
  if (isRedisConfigured()) {
    redisStatus = isRedisReady() ? "connected" : "disconnected";
  }
  const ok = mongoOk;
  res.status(ok ? 200 : 503).json({
    ok,
    mongo: mongoOk ? "connected" : "disconnected",
    redis: redisStatus,
  });
});

// Serve Swagger UI API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Redoc API documentation (alternative, more modern UI)
app.get(
  "/redoc",
  redoc({
    title: "SmartNote API Documentation",
    specUrl: "/api-docs-json",
  })
);

// Serve OpenAPI JSON spec for Redoc (with cleaned invalid references)
app.get("/api-docs-json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  
  // Create a deep copy to avoid modifying the original spec
  const cleanedSpec = JSON.parse(JSON.stringify(swaggerSpec));
  
  // Ensure components.schemas exists (even if empty)
  if (!cleanedSpec.components) {
    cleanedSpec.components = {};
  }
  if (!cleanedSpec.components.schemas) {
    cleanedSpec.components.schemas = {};
  }
  
  // Function to recursively remove invalid $ref references
  function cleanInvalidRefs(obj, path = '') {
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => cleanInvalidRefs(item, `${path}[${index}]`));
    } else if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key === '$ref' && typeof obj[key] === 'string') {
          const refPath = obj[key];
          // Check if it's a schema reference
          if (refPath.startsWith('#/components/schemas/')) {
            const schemaName = refPath.replace('#/components/schemas/', '');
            // If schema doesn't exist, replace with a generic object schema
            if (!cleanedSpec.components.schemas[schemaName]) {
              // Replace $ref with inline schema
              delete obj.$ref;
              obj.type = 'object';
              obj.additionalProperties = true;
              obj.description = `Schema definition for ${schemaName} (placeholder)`;
            }
          }
        } else {
          cleanInvalidRefs(obj[key], path ? `${path}.${key}` : key);
        }
      }
    }
  }
  
  // Clean the spec
  cleanInvalidRefs(cleanedSpec);
  
  res.send(cleanedSpec);
});

// Global error handler (add more robust error handling if desired)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

async function start() {
  await connectRedis();

  app.listen(PORT, () => {
    const baseUrl = `http://localhost:${PORT}`;
    console.log(`[${new Date().toISOString()}] 🚀 Server running at ${baseUrl}`);
    console.log(`[${new Date().toISOString()}] 📄 Swagger UI docs: ${baseUrl}/api-docs`);
    console.log(`[${new Date().toISOString()}] 🔁 Redoc docs: ${baseUrl}/redoc`);
  });
}

start().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

async function shutdown(signal) {
  console.log(`[${new Date().toISOString()}] ${signal} received, shutting down...`);
  try {
    await quitRedis();
    await mongoose.connection.close();
  } catch (e) {
    console.error("Shutdown error:", e.message);
  }
  process.exit(0);
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
