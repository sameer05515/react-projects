const express = require("express");
const router = express.Router();
const { ThinkTankItemModel, Status } = require("./ThinkTank.v1.model");
const { startOfDay, endOfDay } = require("date-fns");

// Utility function to get statistics
const getThinkTankStatisticsItr1 = async () => {
  const today = new Date();

  const [totalCount, createdToday, closedToday, groomedToday, currentlyWorkingOn, onHold] = await Promise.all([
    ThinkTankItemModel.countDocuments(), // Total count
    ThinkTankItemModel.countDocuments({
      createdDate: { $gte: startOfDay(today), $lte: endOfDay(today) },
    }), // Created today
    ThinkTankItemModel.countDocuments({
      closedOn: { $gte: startOfDay(today), $lte: endOfDay(today) },
    }), // Closed today
    ThinkTankItemModel.countDocuments({
      hasGroomed: true,
      updatedAt: { $gte: startOfDay(today), $lte: endOfDay(today) },
    }), // Groomed today
    ThinkTankItemModel.countDocuments({ status: Status.OPEN }), // Currently working on (OPEN items)
    ThinkTankItemModel.countDocuments({ status: Status.UNKNOWN }), // On Hold
  ]);

  return {
    totalCount,
    createdToday,
    closedToday,
    groomedToday,
    currentlyWorkingOn,
    onHold,
  };
};

// Route to fetch statistics
router.get("/stats/itr1", async (req, res) => {
  try {
    const statistics = await getThinkTankStatisticsItr1();
    res.json(statistics);
  } catch (error) {
    console.error("Error fetching Think-Tank statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
