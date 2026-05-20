/**
 * Authentication API endpoints
 */
import apiClient from "./axios.js";

export const authAPI = {
  register: (data) => apiClient.post("/api/auth/register", data),
  login: (data) => apiClient.post("/api/auth/login", data),
  logout: () => apiClient.post("/api/auth/logout"),
};
