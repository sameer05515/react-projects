const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const REACT_PORT = process.env.REACT_PORT || 3002;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mongodb_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your MongoDB data schema and model
const dataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  htmlText: { type: String, required: true },
  tags: { type: [String], required: false, default: [] },
  private: { type: Boolean, required: false, default: false },
});

const DataModel = mongoose.model("Data", dataSchema);

app.use(
  cors({
    origin: `http://localhost:${REACT_PORT}`,
  })
);

// Middleware
app.use(bodyParser.json());

// REST Endpoints

// Get all data
app.get("/api/get-data", (req, res) => {
  DataModel.find({"private":false})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching data" });
    });
});


// Add new data
app.post("/api/save-data", async (req, res) => {
  const { date, title, htmlText, tags, private:privateData } = req.body;

  try {
    const newData = new DataModel({ date, title, htmlText, tags, private:privateData });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: "Error saving data" });
  }
});

// Update data by id
app.put("/api/update-data/:id", (req, res) => {
  const { id } = req.params;
  const { date, title, htmlText, tags, private:privateData } = req.body;

  DataModel.findByIdAndUpdate(
    id,
    { date, title, htmlText, tags, private:privateData },
    { new: true }
  )
    .then((updatedData) => {
      res.json(updatedData);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating data" });
    });
});


// Delete data by id
app.delete("/api/delete-data/:id", (req, res) => {
  const { id } = req.params;

  DataModel.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Data deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting data" });
    });
});


// Delete data by id
app.get("/api/get-data/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await DataModel.findById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error getting data" });
  }
});

// Search data by tags using query builder
app.get("/api/data/search-by-query", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Invalid query" });
  }

  try {
    const parsedQuery = JSON.parse(query);
    const data = await DataModel.find(parsedQuery);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching data", error: error.message });
  }
});

// Search data entries by tags
app.get("/api/data/search", async (req, res) => {
  try {
    const { tags } = req.query;
    console.log(tags);
    if (!tags) {
      return res.status(400).json({ message: "Invalid tags parameter" });
    }

    const searchTags = tags.map((tag) => tag.trim());

    DataModel.find({ tags: { $in: searchTags } })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error searching data:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.error("Error searching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
