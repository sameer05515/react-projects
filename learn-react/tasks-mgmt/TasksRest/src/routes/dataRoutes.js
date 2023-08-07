// dataRoutes.js
const express = require("express");
const router = express.Router();
const Data = require("./models/dataModel"); // Assuming you have a data model defined in a separate file

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { date, title, htmlText, tags } = req.body;
    const newData = new Data({ date, title, htmlText, tags });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating data", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, title, htmlText, tags } = req.body;
    const data = await Data.findByIdAndUpdate(
      id,
      { date, title, htmlText, tags },
      { new: true }
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating data", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Data.findByIdAndRemove(id);
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting data", error: error.message });
  }
});

module.exports = router;
