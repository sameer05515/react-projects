const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const tagsRoutes = require("./routes/tagsRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (Replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose.connect("your-mongodb-uri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use the routes for tags and data
app.use("/api/tags", tagsRoutes);
app.use("/api/data", dataRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
