// tagsRoutes.js
const express = require("express");
const router = express.Router();
const Tag = require("./models/tagModel"); // Assuming you have a tag model defined in a separate file

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tags", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newTag = new Tag({ name });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating tag", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const tag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    res.json(tag);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating tag", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Tag.findByIdAndRemove(id);
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting tag", error: error.message });
  }
});

module.exports = router;
