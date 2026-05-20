<!-- Individual Task Item -->
<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
    <!-- Task Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <!-- Title -->
        <h3 :class="['font-semibold text-gray-900', task.completed && 'line-through text-gray-500']">
          {{ task.title }}
        </h3>

        <!-- Description -->
        <p v-if="task.description" class="text-sm text-gray-600 mt-1">
          {{ task.description }}
        </p>
      </div>

      <!-- Priority Badge -->
      <div :class="getPriorityColor()" class="px-2 py-1 rounded text-xs font-semibold ml-2">
        {{ task.priority }}
      </div>
    </div>

    <!-- Task Meta -->
    <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
      <div class="flex items-center gap-3">
        <!-- Due Date -->
        <span v-if="task.due_date" class="flex items-center gap-1">
          📅 {{ formatDate(task.due_date) }}
        </span>

        <!-- Status -->
        <span v-if="task.completed" class="flex items-center gap-1 text-green-600">
          ✓ Completed
        </span>
        <span v-else class="flex items-center gap-1 text-orange-600">
          ⏳ Pending
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <!-- Toggle Button -->
      <button
        @click="handleToggle"
        :disabled="isLoading"
        :class="[
          'flex-1 py-2 rounded-md font-medium text-sm transition',
          task.completed
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-green-50 text-green-700 hover:bg-green-100',
          isLoading && 'opacity-50 cursor-not-allowed',
        ]"
      >
        {{ task.completed ? 'Undo' : 'Complete' }}
      </button>

      <!-- Edit Button -->
      <button
        @click="$emit('edit', task)"
        class="flex-1 py-2 rounded-md font-medium text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
      >
        Edit
      </button>

      <!-- Delete Button -->
      <button
        @click="handleDelete"
        :disabled="isLoading"
        :class="[
          'flex-1 py-2 rounded-md font-medium text-sm transition',
          'bg-red-50 text-red-700 hover:bg-red-100',
          isLoading && 'opacity-50 cursor-not-allowed',
        ]"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import { useToast } from "vue-toastification";
import { useTaskStore } from "../stores/taskStore.js";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete", "toggle"]);

const taskStore = useTaskStore();
const toast = useToast();
const isLoading = ref(false);

const getPriorityColor = () => {
  switch (props.task.priority) {
    case "HIGH":
      return "bg-red-100 text-red-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    case "LOW":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const handleToggle = async () => {
  isLoading.value = true;
  const result = await taskStore.toggleTask(props.task.id);
  if (result.success) {
    const status = props.task.completed ? "Marked as pending" : "Marked as completed";
    toast.success(status + " ✓");
    emit("toggle", props.task.id);
  } else {
    toast.error("Failed to update task");
  }
  isLoading.value = false;
};

const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Delete Task?",
    text: `Are you sure you want to delete "${props.task.title}"? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    isLoading.value = true;
    const deleteResult = await taskStore.deleteTask(props.task.id);
    if (deleteResult.success) {
      toast.success("Task deleted successfully 🗑️");
      emit("delete", props.task.id);
    } else {
      toast.error(deleteResult.error || "Failed to delete task");
    }
    isLoading.value = false;
  }
};
</script>
