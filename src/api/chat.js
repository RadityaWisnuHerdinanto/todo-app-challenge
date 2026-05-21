import apiClient from "./axios.js";

export const chatAPI = {
  // Send message to chatbot
  sendMessage: async (message, taskContext = null) => {
    const response = await apiClient.post("/api/chat/message", {
      message,
      taskContext,
    });
    return response.data;
  },

  // Get AI suggestions based on tasks
  getSuggestions: async (tasks) => {
    const response = await apiClient.post("/api/chat/suggestions", {
      tasks,
    });
    return response.data;
  },
};

export default chatAPI;
