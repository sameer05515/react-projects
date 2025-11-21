// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivityById,
  deleteActivityById,
} = require('./Activity.service');

// Create an activity
router.post('/', async (req, res) => {
  try {
    const activity = await createActivity(req.body);
    res.json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all activities
router.get('/', async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read an activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await getActivityById(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an activity by ID
router.put('/:id', async (req, res) => {
  try {
    const activity = await updateActivityById(req.params.id, req.body);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an activity by ID
router.delete('/:id', async (req, res) => {
  try {
    const activity = await deleteActivityById(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
