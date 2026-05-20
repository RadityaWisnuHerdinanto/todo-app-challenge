<!-- Login Page -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Welcome Back</h1>

      <!-- Error Message -->
      <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
        {{ error }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
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
            placeholder="••••••••"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          <span v-if="!isLoading">Sign In</span>
          <span v-else>Signing in...</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center">
        <div class="flex-1 border-t border-gray-300"></div>
        <span class="px-3 text-sm text-gray-500">Don't have an account?</span>
        <div class="flex-1 border-t border-gray-300"></div>
      </div>

      <!-- Register Link -->
      <router-link to="/register" class="w-full block text-center py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition">
        Create Account
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
  email: "",
  password: "",
});

const error = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = "";

  if (!form.value.email || !form.value.password) {
    error.value = "Please fill in all fields";
    return;
  }

  isLoading.value = true;

  const result = await authStore.login(form.value.email, form.value.password);

  if (result.success) {
    router.push("/dashboard");
  } else {
    error.value = result.error || "Login failed";
  }

  isLoading.value = false;
};
</script>
