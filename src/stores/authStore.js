/**
 * Authentication Store (Pinia)
 */
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authAPI } from "../api/auth.js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const token = ref(localStorage.getItem("token") || null);
  const isAuthenticated = computed(() => !!token.value);
  const isLoading = ref(false);
  const error = ref(null);

  /**
   * Register new user
   */
  const register = async (name, email, password, confirmPassword) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await authAPI.register({
        name,
        email,
        password,
        confirmPassword,
      });
      const { user: userData, token: newToken } = response.data.data;
      setAuth(userData, newToken);
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.message || "Registration failed";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Login user
   */
  const login = async (email, password) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await authAPI.login({ email, password });
      const { user: userData, token: newToken } = response.data.data;
      setAuth(userData, newToken);
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.message || "Login failed";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearAuth();
    }
  };

  /**
   * Set authentication data
   */
  const setAuth = (userData, newToken) => {
    user.value = userData;
    token.value = newToken;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", newToken);
  };

  /**
   * Clear authentication data
   */
  const clearAuth = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    setAuth,
    clearAuth,
  };
});
