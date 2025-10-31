const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3003;
const REACT_PORT = process.env.REACT_PORT || 3002;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mongodb_test";

const docRoutes = require("./routes/doc.routes");

const tweetRoutesV1 = require("./routes/Tweet.v1.routes");
const tweetRoutesV2 = require("./routes/Tweet.v2.routes");
const activityRoutes = require("./routes/Activity.routes");
const tasksRouter = require("./routes/Task.routes");
const userRoutes = require("./routes/User.routes");
const tagRouter = require("./routes/Tag.routes");
const topicRouter = require("./routes/Topic.routes");
const comparableObjectRouter = require("./routes/ComparableObject.routes");
const wordRouter = require("./routes/Word.routes");
const myResumeRouter = require("./routes/MyResume.routes");
const linkRouter = require("./routes/Link.routes");
const interviewMgmtRouter = require("./routes/InterviewMgmt.v1.routes");
const interviewMgmtV2Router = require("./routes/InterviewMgmt.v2.routes");
const pinnedItemRouter = require("./routes/PinnedItem.routes");
const memoryMapRouter = require("./routes/MemoryMap.routes");
const relatedNodeRouter = require("./routes/RelatedNode.routes");

const consolidatedReportingRouter = require("./routes/ConsolidatedReporting.routes");

const cgptRouter = require("./routes/ChatGPTConversation.routes");
const thinkTankRouter = require("./routes/ThinkTank.v1.routes");
const thinkTankStatsRouter= require('./routes/ThinkTank.v1.stats.routes')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : `http://127.0.0.1:${REACT_PORT}`,
  credentials: true,
  optionsSuccessStatus: 200,
};

if (process.env.NODE_ENV === 'development') {
  // In development, allow all origins for easier testing
  app.use(cors());
  console.warn('WARNING: CORS is enabled for all origins in development mode.');
} else {
  // In production, use restricted CORS
  app.use(cors(corsOptions));
}

// Middleware
// Increase the limit for JSON and URL-encoded payloads (adjust based on actual needs)
const bodyParserLimit = process.env.BODY_PARSER_LIMIT || "10mb";
app.use(bodyParser.json({ limit: bodyParserLimit }));
app.use(bodyParser.urlencoded({ limit: bodyParserLimit, extended: true }));

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

// Serve Swagger documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("", docRoutes);

app.listen(PORT, () => {
  console.log(
    `[${new Date()}] :- Server is running on http://localhost:${PORT}`
  );
});
