/**
 * Main server initialization for the Node.js backend application.
 * Sets up Express, middleware, MongoDB, CORS, API documentation, and routes.
 */

require("dotenv").config(); // Load environment variables ASAP

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// App & port configuration
const app = express();
const PORT = process.env.PORT || 3003;
const REACT_PORT = process.env.REACT_PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mongodb_test";

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

// Register all routers dynamically
routers.forEach(({ path, handler }) => {
  app.use(path, require(handler));
});

// Register general documentation routes
app.use("", docRoutes);

// Serve Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global error handler (add more robust error handling if desired)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  const baseUrl = `http://localhost:${PORT}`;
  console.log(`[${new Date().toISOString()}] Server running at ${baseUrl}`);
  console.log(`[${new Date().toISOString()}] Swagger API docs: ${baseUrl}/api-docs`);
});
