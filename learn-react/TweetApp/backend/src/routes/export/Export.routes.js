/**
 * Export all data as a single ZIP (topics, tasks, tags, tweets, memory maps, interview questions, pinned items, links).
 */

const express = require("express");
const archiver = require("archiver");
const router = express.Router();

const { getAllTopicsFlatForExport } = require("../topic/Topic.service");
const TaskService = require("../task/Task.service");
const { getAllTagsFlat } = require("../tag/Tag.service");
const { getAllTweets } = require("../tweet/Tweet.v2.service");
const { getAllMemoryMapsFlat } = require("../memory-map/MemoryMap.service");
const { getAllQuestionsFlat } = require("../interview-mgmt/InterviewMgmt.v2.service");
const { getAllPinnedItemsFlat } = require("../pinned-item/PinnedItem.service");
const { getAllLinksFlat } = require("../link/Link.service");

/**
 * @swagger
 * tags:
 *   - name: Export
 *     description: Export all data as ZIP
 */

/**
 * @swagger
 * /export/all-zip:
 *   get:
 *     summary: Export all data (topics, tasks, tags, tweets, memory maps, interview questions with answers, pinned items, links) as a single ZIP
 *     tags: [Export]
 *     responses:
 *       200:
 *         description: ZIP file attachment
 *         content:
 *           application/zip:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Failed to export
 */
router.get("/all-zip", async (req, res) => {
  try {
    const [topics, tasks, tags, tweets, memoryMaps, interviewQuestions, pinnedItems, links] = await Promise.all([
      getAllTopicsFlatForExport(),
      TaskService.getAllTasksFlat(),
      getAllTagsFlat(),
      getAllTweets(),
      getAllMemoryMapsFlat(),
      getAllQuestionsFlat(),
      getAllPinnedItemsFlat(),
      getAllLinksFlat(),
    ]);

    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `export-all-${dateStr}.zip`;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.on("error", (err) => {
      console.error("Archiver error:", err);
      if (!res.headersSent) res.status(500).json({ error: err.message });
    });
    archive.pipe(res);

    const files = [
      { name: "topics-export-flat.json", data: topics },
      { name: "tasks-export-flat.json", data: tasks },
      { name: "tags-export-flat.json", data: tags },
      { name: "tweets-export-flat.json", data: tweets },
      { name: "memory-maps-export-flat.json", data: memoryMaps },
      { name: "interview-questions-export-flat.json", data: interviewQuestions },
      { name: "pinned-items-export-flat.json", data: pinnedItems },
      { name: "links-export-flat.json", data: links },
    ];
    for (const { name, data } of files) {
      archive.append(JSON.stringify(data, null, 2), { name });
    }

    await archive.finalize();
  } catch (error) {
    console.error("Export all-zip error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
