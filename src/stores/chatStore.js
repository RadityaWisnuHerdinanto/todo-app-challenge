import { defineStore } from "pinia";
import { ref, computed } from "vue";
import chatAPI from "../api/chat.js";

export const useChatStore = defineStore("chat", () => {
  const messages = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Add a message to chat history
  const addMessage = (message, sender = "user") => {
    messages.value.push({
      id: Date.now(),
      text: message,
      sender, // "user" or "bot"
      timestamp: new Date(),
    });
  };

  // Send message to AI chatbot
  const sendMessage = async (userMessage, taskContext = null) => {
    try {
      loading.value = true;
      error.value = null;

      // Add user message to history
      addMessage(userMessage, "user");

      // Send to backend via API
      const response = await chatAPI.sendMessage(userMessage, taskContext);

      if (response.success) {
        addMessage(response.message, "bot");
      } else {
        throw new Error(response.error || "Failed to get response");
      }
    } catch (err) {
      error.value = err.message || "Failed to send message";
      addMessage(
        "Sorry, I encountered an error. Please try again.",
        "bot"
      );
    } finally {
      loading.value = false;
    }
  };

  // Get AI suggestions based on tasks
  const getSuggestions = async (tasks) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await chatAPI.getSuggestions(tasks);

      if (response.success) {
        return response.suggestions;
      } else {
        throw new Error(response.error || "Failed to get suggestions");
      }
    } catch (err) {
      error.value = err.message || "Failed to get suggestions";
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Clear chat history
  const clearMessages = () => {
    messages.value = [];
    error.value = null;
  };

  const messageCount = computed(() => messages.value.length);

  return {
    messages,
    loading,
    error,
    messageCount,
    addMessage,
    sendMessage,
    getSuggestions,
    clearMessages,
  };
});
