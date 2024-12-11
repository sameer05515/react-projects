const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3003;
const REACT_PORT = process.env.REACT_PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mongodb_test';

const docRoutes = require('./routes/doc.routes')

const tweetRoutesV1 = require("./routes/Tweet.v1.routes"); // Import the tweets routes
const tweetRoutesV2 = require("./routes/Tweet.v2.routes");
const activityRoutes = require('./routes/Activity.routes');
const tasksRouter = require('./routes/Task.routes');
const userRoutes = require('./routes/User.routes'); // Import the user registration router
// Import the tag router
const tagRouter = require('./routes/Tag.routes'); // Replace with the correct path
const topicRouter = require('./routes/Topic.routes');
const comparableObjectRouter = require('./routes/ComparableObject.routes');
const wordRouter = require('./routes/Word.routes');
const myResumeRouter = require('./routes/MyResume.routes');
const linkRouter = require('./routes/Link.routes');
const interviewMgmtRouter = require('./routes/InterviewMgmt.v1.routes');
const interviewMgmtV2Router = require('./routes/InterviewMgmt.v2.routes');
const pinnedItemRouter = require('./routes/PinnedItem.routes');
const memoryMapRouter = require('./routes/MemoryMap.routes');
const relatedNodeRouter = require('./routes/RelatedNode.routes');

const consolidatedReportingRouter = require('./routes/ConsolidatedReporting.routes');

const cgptRouter = require('./routes/ChatGPTConversation.routes');

// mongoose.connect("mongodb://127.0.0.1:27017/mongodb_test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(MONGODB_URI, { // Use process.env.MONGODB_URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use(
//   cors({
//     origin: `http://127.0.0.1:${REACT_PORT}`,
//   })
// );
// Enable CORS globally
app.use(cors());

// Middleware
// app.use(bodyParser.json());
// Increase the limit for JSON and URL-encoded payloads
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use("/tweets/v1", tweetRoutesV1);
app.use("/tweets/v2", tweetRoutesV2);
app.use('/activities', activityRoutes);
app.use('/tasks', tasksRouter);
app.use('/api/users', userRoutes);
// Use the tag router
app.use('/tags', tagRouter);
app.use("/topics", topicRouter);
app.use("/c-objects", comparableObjectRouter);
app.use("/api/words", wordRouter);
app.use("/my-resume", myResumeRouter);
app.use("/links", linkRouter);
app.use('/intvw-mgmt/v1/categories', interviewMgmtRouter);
app.use("/pinned-items", pinnedItemRouter);
app.use("/intvw-mgmt/v2", interviewMgmtV2Router);
app.use('/memory-maps', memoryMapRouter);
app.use("/node-story", relatedNodeRouter);

app.use('/consolidated-reporting', consolidatedReportingRouter);
app.use("/cgpt",cgptRouter)


// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('', docRoutes);

app.listen(PORT, () => {
  console.log(`[${new Date()}] :- Server is running on http://localhost:${PORT}`);
});
