/**
 * Task Controller
 * Handles task-related requests
 */
import {
  getTasksForUser,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksDueToday,
  toggleTaskCompletion,
} from "../services/taskService.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { validateRequiredFields } from "../utils/validators.js";

/**
 * Get all tasks for current user
 * GET /api/tasks?sort=priority&order=asc
 */
export const getAllTasks = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const sortBy = req.query.sort || "created_at";
  const sortOrder = req.query.order || "asc";

  const tasks = await getTasksForUser(userId, sortBy, sortOrder);

  res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully",
    data: {
      count: tasks.length,
      tasks,
    },
  });
});

/**
 * Get single task
 * GET /api/tasks/:id
 */
export const getTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const taskId = parseInt(req.params.id);

  const task = await getTaskById(taskId, userId);

  res.status(200).json({
    success: true,
    message: "Task retrieved successfully",
    data: { task },
  });
});

/**
 * Create new task
 * POST /api/tasks
 */
export const createNewTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { title, description, due_date, priority } = req.body;

  // Validate required fields
  const validation = validateRequiredFields({ title }, ["title"]);
  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      message: validation.message,
    });
  }

  // Validate title is not empty
  if (title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Title cannot be empty",
    });
  }

  const task = await createTask(userId, {
    title: title.trim(),
    description: description ? description.trim() : null,
    due_date,
    priority,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: { task },
  });
});

/**
 * Update task
 * PATCH /api/tasks/:id
 */
export const updateExistingTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const taskId = parseInt(req.params.id);
  const { title, description, due_date, priority, completed } = req.body;

  // Validate at least one field is provided
  if (
    title === undefined &&
    description === undefined &&
    due_date === undefined &&
    priority === undefined &&
    completed === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "At least one field must be provided for update",
    });
  }

  // Validate title is not empty if provided
  if (title !== undefined && title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Title cannot be empty",
    });
  }

  const task = await updateTask(taskId, userId, {
    title: title ? title.trim() : undefined,
    description: description !== undefined ? (description ? description.trim() : null) : undefined,
    due_date,
    priority,
    completed,
  });

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: { task },
  });
});

/**
 * Delete task
 * DELETE /api/tasks/:id
 */
export const deleteExistingTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const taskId = parseInt(req.params.id);

  const task = await deleteTask(taskId, userId);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: { task },
  });
});

/**
 * Get tasks due today
 * GET /api/tasks/due/today
 */
export const getDueTodayTasks = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const tasks = await getTasksDueToday(userId);

  res.status(200).json({
    success: true,
    message: "Tasks due today retrieved successfully",
    data: {
      count: tasks.length,
      tasks,
    },
  });
});

/**
 * Toggle task completion status
 * PATCH /api/tasks/:id/toggle
 */
export const toggleTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const taskId = parseInt(req.params.id);

  const task = await toggleTaskCompletion(taskId, userId);

  res.status(200).json({
    success: true,
    message: `Task marked as ${task.completed ? "completed" : "incomplete"}`,
    data: { task },
  });
});
