/**
 * Task Routes
 * All routes are protected with JWT authentication
 */
import express from "express";
import { protect } from "../middleware/protect.js";
import {
  getAllTasks,
  getTask,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
  getDueTodayTasks,
  toggleTask,
} from "../controllers/taskController.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

/**
 * GET /api/tasks
 * Get all tasks for current user
 * Query params: ?sort=due_date|priority|created_at|title
 */
router.get("/", getAllTasks);

/**
 * GET /api/tasks/due/today
 * Get tasks due today
 */
router.get("/due/today", getDueTodayTasks);

/**
 * GET /api/tasks/:id
 * Get single task by ID
 */
router.get("/:id", getTask);

/**
 * POST /api/tasks
 * Create new task
 * Body: { title, description?, due_date?, priority? }
 */
router.post("/", createNewTask);

/**
 * PATCH /api/tasks/:id
 * Update task
 * Body: { title?, description?, due_date?, priority?, completed? }
 */
router.patch("/:id", updateExistingTask);

/**
 * DELETE /api/tasks/:id
 * Delete task
 */
router.delete("/:id", deleteExistingTask);

/**
 * PATCH /api/tasks/:id/toggle
 * Toggle task completion status
 */
router.patch("/:id/toggle", toggleTask);

export default router;
