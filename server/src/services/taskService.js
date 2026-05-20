/**
 * Task Service
 * Handles all task-related database operations
 */
import prisma from "../config/database.js";

/**
 * Get all tasks for a user
 */
export const getTasksForUser = async (userId, sortBy = "created_at", sortOrder = "asc") => {
  const validSortFields = ["due_date", "priority", "created_at", "title"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "created_at";
  const order = ["asc", "desc"].includes(sortOrder) ? sortOrder : "asc";

  return prisma.task.findMany({
    where: { user_id: userId },
    orderBy: { [sortField]: order },
  });
};

/**
 * Get single task by ID
 */
export const getTaskById = async (taskId, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  // Verify ownership
  if (task.user_id !== userId) {
    const error = new Error("Unauthorized to access this task");
    error.statusCode = 403;
    throw error;
  }

  return task;
};

/**
 * Create new task
 */
export const createTask = async (userId, data) => {
  const { title, description, due_date, priority } = data;

  // Validate priority
  const validPriorities = ["LOW", "MEDIUM", "HIGH"];
  if (priority && !validPriorities.includes(priority)) {
    const error = new Error("Invalid priority. Must be LOW, MEDIUM, or HIGH");
    error.statusCode = 400;
    throw error;
  }

  // Validate due_date format
  if (due_date) {
    const dateObj = new Date(due_date);
    if (isNaN(dateObj.getTime())) {
      const error = new Error("Invalid due_date format");
      error.statusCode = 400;
      throw error;
    }
  }

  return prisma.task.create({
    data: {
      user_id: userId,
      title,
      description: description || null,
      due_date: due_date ? new Date(due_date) : null,
      priority: priority || "MEDIUM",
      completed: false,
    },
  });
};

/**
 * Update task
 */
export const updateTask = async (taskId, userId, data) => {
  // Verify ownership
  const task = await getTaskById(taskId, userId);

  const { title, description, due_date, priority, completed } = data;

  // Validate priority if provided
  if (priority) {
    const validPriorities = ["LOW", "MEDIUM", "HIGH"];
    if (!validPriorities.includes(priority)) {
      const error = new Error("Invalid priority. Must be LOW, MEDIUM, or HIGH");
      error.statusCode = 400;
      throw error;
    }
  }

  // Validate due_date if provided
  if (due_date) {
    const dateObj = new Date(due_date);
    if (isNaN(dateObj.getTime())) {
      const error = new Error("Invalid due_date format");
      error.statusCode = 400;
      throw error;
    }
  }

  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (due_date !== undefined) updateData.due_date = due_date ? new Date(due_date) : null;
  if (priority !== undefined) updateData.priority = priority;
  if (completed !== undefined) updateData.completed = completed;

  return prisma.task.update({
    where: { id: taskId },
    data: updateData,
  });
};

/**
 * Delete task
 */
export const deleteTask = async (taskId, userId) => {
  // Verify ownership
  await getTaskById(taskId, userId);

  return prisma.task.delete({
    where: { id: taskId },
  });
};

/**
 * Get tasks due today
 */
export const getTasksDueToday = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return prisma.task.findMany({
    where: {
      user_id: userId,
      due_date: {
        gte: today,
        lt: tomorrow,
      },
      completed: false,
    },
  });
};

/**
 * Mark task as completed/incomplete
 */
export const toggleTaskCompletion = async (taskId, userId) => {
  const task = await getTaskById(taskId, userId);

  return prisma.task.update({
    where: { id: taskId },
    data: { completed: !task.completed },
  });
};
