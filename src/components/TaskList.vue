<!-- Task List Component -->
<template>
  <div class="space-y-4">
    <!-- Empty State -->
    <div v-if="tasks.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
      <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p class="text-gray-600 font-medium">No tasks yet</p>
      <p class="text-gray-500 text-sm mt-1">Create your first task to get started</p>
    </div>

    <!-- Task Items -->
    <div v-else class="grid gap-4">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', task)"
        @delete="handleDelete"
        @toggle="handleToggle"
      />
    </div>

    <!-- Sorting Info -->
    <div v-if="tasks.length > 0" class="text-xs text-gray-500 text-center pt-4">
      Showing {{ filteredTasks.length }} of {{ tasks.length }} tasks
      <span v-if="sortBy" class="text-blue-600"> · Sorted by {{ sortByLabel }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TaskItem from "./TaskItem.vue";

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
  sortBy: {
    type: String,
    default: "created_at",
  },
  filter: {
    type: String,
    default: "all", // all, completed, pending
  },
});

const emit = defineEmits(["edit", "delete", "toggle"]);

const sortByLabel = computed(() => {
  const labels = {
    created_at: "newest",
    due_date: "due date",
    priority: "priority",
    title: "title",
  };
  return labels[props.sortBy] || "created_at";
});

const filteredTasks = computed(() => {
  let filtered = [...props.tasks];

  // Apply filter
  if (props.filter === "completed") {
    filtered = filtered.filter((task) => task.completed);
  } else if (props.filter === "pending") {
    filtered = filtered.filter((task) => !task.completed);
  }

  return filtered;
});

const handleDelete = (taskId) => {
  emit("delete", taskId);
};

const handleToggle = (taskId) => {
  emit("toggle", taskId);
};
</script>
