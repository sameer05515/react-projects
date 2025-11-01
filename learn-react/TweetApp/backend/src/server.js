/**
 * This is the main server file for the Node.js backend application.
 * It sets up the Express app, configures middleware, connects to the MongoDB database,
 * handles CORS (Cross-Origin Resource Sharing), and registers API route handlers.
 * Additionally, it serves the API documentation using Swagger UI.
 */

// Import required modules
const express = require("express"); // Web framework for Node.js
const mongoose = require("mongoose"); // MongoDB ODM (Object Data Modeling)
const bodyParser = require("body-parser"); // Middleware for parsing JSON and urlencoded data
const cors = require("cors"); // Middleware to enable CORS
require("dotenv").config(); // Loads environment variables from a .env file

// Swagger for API documentation
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Initialize Express application
const app = express();

// Define ports and MongoDB URI using environment variables with fallbacks
const PORT = process.env.PORT || 3003; // Port the server listens on
const REACT_PORT = process.env.REACT_PORT || 3002; // Port for React frontend (dev)
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mongodb_test"; // MongoDB connection string

// Import routers for different features/resources
const docRoutes = require("./routes/docs/doc.routes");
const tweetRoutesV1 = require("./routes/tweet/Tweet.v1.routes");
const tweetRoutesV2 = require("./routes/tweet/Tweet.v2.routes");
const activityRoutes = require("./routes/activity/Activity.routes");
const tasksRouter = require("./routes/task/Task.routes");
const userRoutes = require("./routes/user/User.routes");
const tagRouter = require("./routes/tag/Tag.routes");
const topicRouter = require("./routes/topic/Topic.routes");
const comparableObjectRouter = require("./routes/comparable-object/ComparableObject.routes");
const wordRouter = require("./routes/word/Word.routes");
const myResumeRouter = require("./routes/my-resume/MyResume.routes");
const linkRouter = require("./routes/link/Link.routes");
const interviewMgmtRouter = require("./routes/interview-mgmt/InterviewMgmt.v1.routes");
const interviewMgmtV2Router = require("./routes/interview-mgmt/InterviewMgmt.v2.routes");
const pinnedItemRouter = require("./routes/pinned-item/PinnedItem.routes");
const memoryMapRouter = require("./routes/memory-map/MemoryMap.routes");
const relatedNodeRouter = require("./routes/related-node/RelatedNode.routes");
const consolidatedReportingRouter = require("./routes/consolidated-reporting/ConsolidatedReporting.routes");
const cgptRouter = require("./routes/chatgpt/ChatGPTConversation.routes");
const thinkTankRouter = require("./routes/think-tank/ThinkTank.v1.routes");
const thinkTankStatsRouter = require('./routes/think-tank/ThinkTank.v1.stats.routes');

// Connect to MongoDB database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure CORS options based on environment (dev or prod)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL // Restrict to frontend URL in production
    : `http://127.0.0.1:${REACT_PORT}`, // Allow localhost frontend in development
  credentials: true,
  optionsSuccessStatus: 200,
};

if (process.env.NODE_ENV === 'development') {
  // In development, allow all origins (for testing and local dev)
  app.use(cors());
  console.warn('WARNING: CORS is enabled for all origins in development mode.');
} else {
  // In production, restrict CORS to specified allowed origins
  app.use(cors(corsOptions));
}

// Configure middleware for parsing JSON and URL-encoded bodies with increased limits
const bodyParserLimit = process.env.BODY_PARSER_LIMIT || "10mb";
app.use(bodyParser.json({ limit: bodyParserLimit }));
app.use(bodyParser.urlencoded({ limit: bodyParserLimit, extended: true }));

// Register route handlers under their respective base paths
app.use("/tweets/v1", tweetRoutesV1);
app.use("/tweets/v2", tweetRoutesV2);
app.use("/activities", activityRoutes);
app.use("/tasks", tasksRouter);
app.use("/api/users", userRoutes);
app.use("/tags", tagRouter);
app.use("/topics", topicRouter);
app.use("/c-objects", comparableObjectRouter);
app.use("/api/words", wordRouter);
app.use("/my-resume", myResumeRouter);
app.use("/links", linkRouter);
app.use("/intvw-mgmt/v1/categories", interviewMgmtRouter);
app.use("/pinned-items", pinnedItemRouter);
app.use("/intvw-mgmt/v2", interviewMgmtV2Router);
app.use("/memory-maps", memoryMapRouter);
app.use("/node-story", relatedNodeRouter);
app.use("/consolidated-reporting", consolidatedReportingRouter);
app.use("/cgpt", cgptRouter);
app.use("/think-tank/v1", thinkTankRouter);
app.use("/think-tank/v1/stats", thinkTankStatsRouter);

// Serve Swagger API documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve general documentation routes at root
app.use("", docRoutes);

// Start the Express server and log startup message
app.listen(PORT, () => {
  console.log(
    `[${new Date()}] :- Server is running on http://localhost:${PORT}`
  );
  console.log(
    `[${new Date()}] :- Swagger API documentation is available at http://localhost:${PORT}/api-docs`
  );  
});
