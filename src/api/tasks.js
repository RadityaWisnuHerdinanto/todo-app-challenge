/**
 * Task API endpoints
 */
import apiClient from "./axios.js";

export const taskAPI = {
  getAll: (sort) => apiClient.get("/api/tasks", { params: { sort } }),
  getDueToday: () => apiClient.get("/api/tasks/due/today"),
  getOne: (id) => apiClient.get(`/api/tasks/${id}`),
  create: (data) => apiClient.post("/api/tasks", data),
  update: (id, data) => apiClient.patch(`/api/tasks/${id}`, data),
  delete: (id) => apiClient.delete(`/api/tasks/${id}`),
  toggle: (id) => apiClient.patch(`/api/tasks/${id}/toggle`),
};
