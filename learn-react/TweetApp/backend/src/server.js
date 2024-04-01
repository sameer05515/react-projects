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
const MONGODB_URI= process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mongodb_test';

const docRoutes = require('./routes/doc.routes')

const tweetRoutes = require("./routes/Tweet.routes"); // Import the tweets routes
const activityRoutes = require('./routes/Activity.routes');
const tasksRouter = require('./routes/Task.routes');
const userRoutes = require('./routes/User.routes'); // Import the user registration router
// Import the tag router
const tagRouter = require('./routes/Tag.routes'); // Replace with the correct path
const topicRouter = require('./routes/Topic.routes');
const comparableObjectRouter= require('./routes/ComparableObject.routes');
const wordRouter= require('./routes/Word.routes');
const myResumeRouter= require('./routes/MyResume.routes');
const linkRouter = require('./routes/Link.routes');
const interviewMgmtRouter= require('./routes/InterviewMgmt.routes');
const pinnedItemRouter= require('./routes/PinnedItem.routes');

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
app.use(bodyParser.json());

app.use("/tweets", tweetRoutes);
app.use('/activities', activityRoutes);
app.use('/tasks', tasksRouter);
app.use('/api/users', userRoutes);
// Use the tag router
app.use('/tags', tagRouter);
app.use("/topics",topicRouter);
app.use("/c-objects",comparableObjectRouter);
app.use("/api/words",wordRouter);
app.use("/my-resume", myResumeRouter);
app.use("/links",linkRouter);
app.use('/categories', interviewMgmtRouter);
app.use("/pinned-items", pinnedItemRouter);


// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('',docRoutes);

app.listen(PORT, () => {
  console.log(`[${new Date()}] :- Server is running on port ${PORT}`);
});
