const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3003;
const REACT_PORT = process.env.REACT_PORT || 3002;

const tweetRoutes = require("./routes/TweetRoutes"); // Import the tweets routes
const activityRoutes = require('./routes/ActivityRoutes');
const tasksRouter = require('./routes/TaskRoutes');
const userRoutes = require('./routes/UserRoutes'); // Import the user registration router
// Import the tag router
const tagRouter = require('./routes/TagRoutes'); // Replace with the correct path
const topicRouter = require('./routes/TopicRoutes');
const comparableObjectRouter= require('./routes/ComparableObjectRouter');
const wordRouter= require('./routes/WordRoutes');
const myResumeRouter= require('./routes/MyResumeRoutes');

mongoose.connect("mongodb://127.0.0.1:27017/mongodb_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: `http://localhost:${REACT_PORT}`,
  })
);

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


// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`[${new Date()}] :- Server is running on port ${PORT}`);
});
