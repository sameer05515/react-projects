const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const REACT_PORT=process.env.REACT_PORT || 3002;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongodb_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your MongoDB data schema and model
const dataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  htmlText: { type: String, required: true },
});

const DataModel = mongoose.model('Data', dataSchema);

app.use(cors({
    origin: `http://localhost:${REACT_PORT}`,
  }));

// Middleware
app.use(bodyParser.json());

// REST Endpoints

// Get all data
app.get('/api/get-data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Add new data
app.post('/api/save-data', async (req, res) => {
  const { date, title, htmlText } = req.body;

  try {
    const newData = new DataModel({ date, title, htmlText });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: 'Error saving data' });
  }
});

// Update data by id
app.put('/api/update-data/:id', async (req, res) => {
  const { id } = req.params;
  const { date, title, htmlText } = req.body;

  try {
    const updatedData = await DataModel.findByIdAndUpdate(
      id,
      { date, title, htmlText },
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating data' });
  }
});

// Delete data by id
app.delete('/api/delete-data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await DataModel.findByIdAndDelete(id);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data' });
  }
});

// Delete data by id
app.get('/api/get-data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await DataModel.findById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error getting data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

