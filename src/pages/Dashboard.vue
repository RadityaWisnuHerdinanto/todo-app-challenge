<!-- Dashboard Page -->
<template>
  <MobileLayout v-if="!isTabletOrLarger">
    <div class="space-y-4">
      <h1 class="text-xl font-bold">Dashboard</h1>

      <!-- Due Today Alert -->
      <div v-if="dueTodayCount > 0" class="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p class="text-orange-800 font-semibold">{{ dueTodayCount }} task(s) due today</p>
      </div>

      <!-- Task Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-lg p-4 border">
          <p class="text-gray-600 text-sm">Total Tasks</p>
          <p class="text-2xl font-bold">{{ tasks.length }}</p>
        </div>
        <div class="bg-white rounded-lg p-4 border">
          <p class="text-gray-600 text-sm">Completed</p>
          <p class="text-2xl font-bold text-green-600">{{ completedCount }}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <button @click="showNewTaskForm = true" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
        + New Task
      </button>

      <!-- Tasks Placeholder -->
      <div class="bg-white rounded-lg p-6 text-center text-gray-500">
        <p>Task list will appear here</p>
      </div>
    </div>
  </MobileLayout>

  <TabletLayout v-else-if="!isDesktop">
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <p class="text-gray-600 mt-1">Manage your daily tasks</p>
      </div>

      <!-- Due Today Alert -->
      <div v-if="dueTodayCount > 0" class="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p class="text-orange-800 font-semibold">{{ dueTodayCount }} task(s) due today</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white rounded-lg p-4 border">
          <p class="text-gray-600 text-sm">Total Tasks</p>
          <p class="text-2xl font-bold">{{ tasks.length }}</p>
        </div>
        <div class="bg-white rounded-lg p-4 border">
          <p class="text-gray-600 text-sm">Completed</p>
          <p class="text-2xl font-bold text-green-600">{{ completedCount }}</p>
        </div>
        <div class="bg-white rounded-lg p-4 border">
          <p class="text-gray-600 text-sm">Pending</p>
          <p class="text-2xl font-bold text-blue-600">{{ incompleteCount }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <button @click="showNewTaskForm = true" class="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
          + New Task
        </button>
        <button @click="loadTasks" class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300">
          Refresh
        </button>
      </div>

      <!-- Tasks Placeholder -->
      <div class="bg-white rounded-lg p-8 text-center text-gray-500">
        <p>Task list will appear here</p>
      </div>
    </div>
  </TabletLayout>

  <DesktopLayout v-else>
    <div class="space-y-6">
      <!-- Page Title -->
      <div>
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-gray-600 mt-1">Welcome back! Here's your task overview.</p>
      </div>

      <!-- Due Today Alert -->
      <div v-if="dueTodayCount > 0" class="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-orange-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <p class="text-orange-800 font-semibold">{{ dueTodayCount }} task(s) due today</p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-6">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Tasks</p>
              <p class="text-3xl font-bold mt-2">{{ tasks.length }}</p>
            </div>
            <div class="text-3xl text-blue-100">📋</div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Completed</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ completedCount }}</p>
            </div>
            <div class="text-3xl text-green-100">✅</div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Pending</p>
              <p class="text-3xl font-bold text-blue-600 mt-2">{{ incompleteCount }}</p>
            </div>
            <div class="text-3xl text-blue-100">⏳</div>
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="flex gap-4">
        <button @click="showNewTaskForm = true" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          + Create New Task
        </button>
        <button @click="loadTasks" class="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
          Refresh Tasks
        </button>
      </div>

      <!-- Tasks Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-lg font-medium">No tasks yet</p>
        <p class="text-sm mt-1">Create your first task to get started</p>
      </div>
    </div>
  </DesktopLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore.js";
import MobileLayout from "../layouts/MobileLayout.vue";
import TabletLayout from "../layouts/TabletLayout.vue";
import DesktopLayout from "../layouts/DesktopLayout.vue";

const taskStore = useTaskStore();

const tasks = computed(() => taskStore.tasks);
const completedCount = computed(() => taskStore.completedCount);
const incompleteCount = computed(() => taskStore.incompleteCount);
const dueTodayCount = computed(() => taskStore.dueTodayTasks.length);

const showNewTaskForm = ref(false);

const isTabletOrLarger = ref(false);
const isDesktop = ref(false);

const loadTasks = async () => {
  await taskStore.getTasks();
  await taskStore.getDueToday();
};

const checkScreenSize = () => {
  isTabletOrLarger.value = window.innerWidth >= 768;
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(async () => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  await loadTasks();
});
</script>
