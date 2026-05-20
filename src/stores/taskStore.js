/**
 * Task Store (Pinia)
 */
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { taskAPI } from "../api/tasks.js";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const dueTodayTasks = ref([]);
  const currentTask = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  /**
   * Get all tasks
   */
  const getTasks = async (sortBy = "created_at", sortOrder = "asc") => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await taskAPI.getAll(sortBy, sortOrder);
      tasks.value = response.data.data.tasks;
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch tasks";
      return { success: false };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Get tasks due today
   */
  const getDueToday = async () => {
    try {
      const response = await taskAPI.getDueToday();
      dueTodayTasks.value = response.data.data.tasks;
      return { success: true, count: response.data.data.count };
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch due today tasks";
      return { success: false };
    }
  };

  /**
   * Create task
   */
  const createTask = async (taskData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await taskAPI.create(taskData);
      tasks.value.push(response.data.data.task);
      return { success: true, task: response.data.data.task };
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to create task";
      return { success: false };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Update task
   */
  const updateTask = async (taskId, taskData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await taskAPI.update(taskId, taskData);
      const index = tasks.value.findIndex((t) => t.id === taskId);
      if (index !== -1) {
        tasks.value[index] = response.data.data.task;
      }
      return { success: true, task: response.data.data.task };
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to update task";
      return { success: false };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Delete task
   */
  const deleteTask = async (taskId) => {
    isLoading.value = true;
    error.value = null;
    try {
      await taskAPI.delete(taskId);
      tasks.value = tasks.value.filter((t) => t.id !== taskId);
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to delete task";
      return { success: false };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Toggle task completion
   */
  const toggleTask = async (taskId) => {
    try {
      const response = await taskAPI.toggle(taskId);
      const index = tasks.value.findIndex((t) => t.id === taskId);
      if (index !== -1) {
        tasks.value[index] = response.data.data.task;
      }
      return { success: true, task: response.data.data.task };
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to toggle task";
      return { success: false };
    }
  };

  /**
   * Computed: Completed tasks count
   */
  const completedCount = computed(() =>
    tasks.value.filter((t) => t.completed).length
  );

  /**
   * Computed: Incomplete tasks count
   */
  const incompleteCount = computed(() =>
    tasks.value.filter((t) => !t.completed).length
  );

  return {
    tasks,
    dueTodayTasks,
    currentTask,
    isLoading,
    error,
    completedCount,
    incompleteCount,
    getTasks,
    getDueToday,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
});
