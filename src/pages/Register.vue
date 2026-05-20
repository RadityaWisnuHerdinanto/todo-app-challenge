<!-- Register Page -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Create Account</h1>

      <!-- Error Message -->
      <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
        {{ error }}
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Name Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        <!-- Email Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="At least 6 characters"
          />
          <p class="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
        >
          <span v-if="!isLoading">Create Account</span>
          <span v-else>Creating account...</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-3 text-sm text-gray-500">Already have an account?</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <!-- Login Link -->
      <router-link to="/login" class="w-full block text-center py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition">
        Sign In
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const error = ref("");
const isLoading = ref(false);

const handleRegister = async () => {
  error.value = "";

  // Validation
  if (!form.value.name || !form.value.email || !form.value.password || !form.value.confirmPassword) {
    error.value = "Please fill in all fields";
    return;
  }

  if (form.value.password.length < 6) {
    error.value = "Password must be at least 6 characters";
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    error.value = "Passwords do not match";
    return;
  }

  isLoading.value = true;

  const result = await authStore.register(
    form.value.name,
    form.value.email,
    form.value.password,
    form.value.confirmPassword
  );

  if (result.success) {
    // Registration successful, redirect to dashboard
    router.push("/dashboard");
  } else {
    error.value = result.error || "Registration failed";
  }

  isLoading.value = false;
};
</script>
