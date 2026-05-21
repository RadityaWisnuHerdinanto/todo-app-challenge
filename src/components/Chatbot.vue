<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Widget (visible when open) -->
    <div v-if="isOpen" class="flex flex-col h-96 w-80 bg-white rounded-lg shadow-xl border border-gray-200 md:w-96">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 class="font-semibold">TaskHub AI</h3>
        <button
          @click="toggleChat"
          class="hover:bg-blue-800 p-1 rounded transition"
          title="Close chat"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Messages Container -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        <div v-if="messages.length === 0" class="text-center text-gray-500 text-sm py-8">
          <p class="mb-2">👋 Hi! I'm TaskHub AI</p>
          <p class="text-xs">Ask me anything about your tasks or productivity!</p>
        </div>

        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="[
            'flex',
            msg.sender === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'max-w-xs px-3 py-2 rounded-lg text-sm whitespace-pre-wrap',
              msg.sender === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-800 rounded-bl-none'
            ]"
          >
            {{ msg.text }}
          </div>
        </div>

        <div v-if="loading" class="flex justify-start">
          <div class="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm rounded-bl-none">
            <div class="flex space-x-2">
              <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
              <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>

        <div v-if="error" class="bg-red-100 text-red-700 px-3 py-2 rounded text-xs">
          {{ error }}
        </div>
      </div>

      <!-- Input -->
      <div class="border-t p-3 bg-white rounded-b-lg">
        <form @submit.prevent="handleSendMessage" class="flex gap-2">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Ask me anything..."
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="loading"
          />
          <button
            type="submit"
            :disabled="loading || !inputMessage.trim()"
            class="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>

    <!-- Open Button (visible when closed) -->
    <button
      v-else
      @click="toggleChat"
      class="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
      title="Open chat"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useChatStore } from "../stores/chatStore.js";
import { useTaskStore } from "../stores/taskStore.js";

const chatStore = useChatStore();
const taskStore = useTaskStore();
const inputMessage = ref("");
const isOpen = ref(false);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const handleSendMessage = async () => {
  if (!inputMessage.value.trim()) return;

  const message = inputMessage.value;
  inputMessage.value = "";

  // Prepare task context
  const taskContext = {
    totalTasks: taskStore.tasks.length,
    completedTasks: taskStore.completedCount,
    pendingTasks: taskStore.incompleteCount,
    upcomingTasks: taskStore.tasks
      .filter((t) => new Date(t.due_date) > new Date())
      .slice(0, 3),
  };

  await chatStore.sendMessage(message, taskContext);
};

const { messages, loading, error } = chatStore;
</script>

<style scoped>
.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>
