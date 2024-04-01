/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks.
 *     responses:
 *       '200':
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a specific task by ID
 *     description: Retrieve a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to retrieve.
 *     responses:
 *       '200':
 *         description: The requested task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found.
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with the provided details.
 *     requestBody:
 *       description: The task to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: The newly created task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Bad request. Invalid task details.
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update an existing task with new details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update.
 *     requestBody:
 *       description: The updated task details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: The updated task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found.
 *       '400':
 *         description: Bad request. Invalid task details.
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Delete a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete.
 *     responses:
 *       '204':
 *         description: Task deleted successfully.
 *       '404':
 *         description: Task not found.
 */



const express = require("express");
const router = express.Router();
const TaskService = require("./Task.service");

// Route to get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a specific task by ID
router.get("/:id", async (req, res) => {
  const uniqueId = req.params.id;
  try {
    const task = await TaskService.getTaskById(uniqueId);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new task
router.post("/", async (req, res) => {
  const newTask = req.body;
  try {
    const task = await TaskService.createTask(newTask);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a task by ID
router.put("/:id", async (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  try {
    const task = await TaskService.updateTask(taskId, updatedTask);
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a task by ID
router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    await TaskService.deleteTask(taskId);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

