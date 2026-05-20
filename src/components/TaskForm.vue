<!-- Task Form Component -->
<template>
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <!-- Form Title -->
    <h2 class="text-lg font-semibold mb-4">
      {{ isEditing ? "Edit Task" : "Create New Task" }}
    </h2>

    <!-- Error Message -->
    <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
      {{ error }}
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Title Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Buy groceries"
        />
      </div>

      <!-- Description Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="form.description"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Add details..."
          rows="3"
        ></textarea>
      </div>

      <!-- Due Date Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
        <input
          v-model="form.due_date"
          type="date"
          required
          :min="today"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p class="text-xs text-gray-500 mt-1">Must be today or later</p>
      </div>

      <!-- Priority Select -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
        <select
          v-model="form.priority"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM" selected>Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          :disabled="isLoading"
          :class="[
            'flex-1 py-2 rounded-lg font-semibold transition',
            'bg-blue-600 text-white hover:bg-blue-700',
            isLoading && 'opacity-50 cursor-not-allowed',
          ]"
        >
          <span v-if="!isLoading">{{ isEditing ? "Update Task" : "Create Task" }}</span>
          <span v-else>{{ isEditing ? "Updating..." : "Creating..." }}</span>
        </button>

        <button
          type="button"
          @click="handleCancel"
          class="flex-1 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useToast } from "vue-toastification";
import { useTaskStore } from "../stores/taskStore.js";

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "success"]);

const taskStore = useTaskStore();
const toast = useToast();

const isEditing = ref(!!props.task);

const form = ref({
  title: "",
  description: "",
  due_date: "",
  priority: "MEDIUM",
});

const error = ref("");
const isLoading = ref(false);

// Get today's date in YYYY-MM-DD format for min attribute
const today = computed(() => {
  const date = new Date();
  return date.toISOString().split("T")[0];
});

// Initialize form with task data if editing
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      isEditing.value = true;
      form.value = {
        title: newTask.title,
        description: newTask.description || "",
        due_date: newTask.due_date ? newTask.due_date.split("T")[0] : "",
        priority: newTask.priority,
      };
    } else {
      isEditing.value = false;
      form.value = {
        title: "",
        description: "",
        due_date: "",
        priority: "MEDIUM",
      };
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  error.value = "";

  // Validation
  if (!form.value.title.trim()) {
    error.value = "Title is required";
    return;
  }

  if (!form.value.due_date) {
    error.value = "Due date is required";
    return;
  }

  // Validate due_date is not in the past
  if (form.value.due_date) {
    const selectedDate = new Date(form.value.due_date);
    const todayDate = new Date(today.value);
    
    if (selectedDate < todayDate) {
      error.value = "Due date cannot be in the past";
      return;
    }
  }

  isLoading.value = true;

  try {
    let result;

    if (isEditing.value) {
      // Update existing task
      result = await taskStore.updateTask(props.task.id, form.value);
      if (result.success) {
        toast.success("Task updated successfully! 🎉");
        emit("success");
      } else {
        toast.error(result.error || "Failed to update task");
      }
    } else {
      // Create new task
      result = await taskStore.createTask(form.value);
      if (result.success) {
        toast.success("Task created successfully! ✨");
        emit("success");
        // Reset form
        form.value = {
          title: "",
          description: "",
          due_date: "",
          priority: "MEDIUM",
        };
      } else {
        toast.error(result.error || "Failed to create task");
      }
    }
  } catch (err) {
    toast.error(err.message || "An error occurred");
  } finally {
    isLoading.value = false;
  }
};

const handleCancel = () => {
  emit("close");
};
</script>
