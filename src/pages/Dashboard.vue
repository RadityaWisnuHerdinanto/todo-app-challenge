<template>
  <div class="space-y-4 md:space-y-6">
    <!-- Header with Sorting -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-xl md:text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <p class="hidden md:block text-gray-600 mt-1">Manage your daily tasks</p>
      </div>

      <!-- Sorting Dropdown -->
      <div class="flex gap-2">
        <select
          v-model="sortBy"
          @change="loadTasks"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="created_at">Newest</option>
          <option value="due_date">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>

        <button
          @click="showNewTaskForm = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
        >
          + New Task
        </button>
      </div>
    </div>

    <!-- Due Today Alert -->
    <div v-if="dueTodayCount > 0" class="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5 md:w-6 md:h-6 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <p class="text-orange-800 font-semibold text-sm md:text-base">{{ dueTodayCount }} task(s) due today</p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <p class="text-gray-600 text-xs md:text-sm font-medium">Total Tasks</p>
        <p class="text-2xl md:text-3xl font-bold mt-2">{{ tasks.length }}</p>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <p class="text-gray-600 text-xs md:text-sm font-medium">Completed</p>
        <p class="text-2xl md:text-3xl font-bold text-green-600 mt-2">{{ completedCount }}</p>
      </div>

      <div class="hidden md:block bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <p class="text-gray-600 text-xs md:text-sm font-medium">Pending</p>
        <p class="text-2xl md:text-3xl font-bold text-blue-600 mt-2">{{ incompleteCount }}</p>
      </div>
    </div>

    <!-- Task Form (Modal/Inline) -->
    <div v-if="showNewTaskForm || editingTask" class="bg-white rounded-lg border border-gray-200 p-6">
      <TaskForm
        :task="editingTask"
        @close="handleFormClose"
        @success="handleFormSuccess"
      />
    </div>

    <!-- Task List -->
    <TaskList
      :tasks="tasks"
      :sort-by="sortBy"
      @edit="editingTask = $event; showNewTaskForm = true"
      @delete="handleTaskDelete"
      @toggle="loadTasks"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore.js";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasks);
const completedCount = computed(() => taskStore.completedCount);
const incompleteCount = computed(() => taskStore.incompleteCount);
const dueTodayCount = computed(() => taskStore.dueTodayTasks.length);

const sortBy = ref("created_at");
const showNewTaskForm = ref(false);
const editingTask = ref(null);

const loadTasks = async () => {
  await taskStore.getTasks(sortBy.value);
  await taskStore.getDueToday();
};

const handleFormClose = () => {
  showNewTaskForm.value = false;
  editingTask.value = null;
};

const handleFormSuccess = () => {
  handleFormClose();
  loadTasks();
};

const handleTaskDelete = (taskId) => {
  // Task already deleted via taskStore in TaskItem component
  loadTasks();
};

onMounted(async () => {
  await loadTasks();
});
</script>
