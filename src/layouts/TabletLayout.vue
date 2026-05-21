<!-- Tablet Layout -->
<template>
  <div class="hidden md:grid md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="bg-white border-r border-gray-200 flex flex-col">
      <!-- Logo -->
      <div class="px-4 py-4 border-b border-gray-200">
        <h1 class="text-lg font-bold text-gray-900">TaskHub</h1>
        <p class="text-xs text-gray-500 mt-1">Task Management</p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-6 space-y-2">
        <p class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Menu</p>
        <router-link to="/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition" active-class="bg-blue-50 text-blue-600 font-semibold">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/tasks" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition" active-class="bg-blue-50 text-blue-600 font-semibold">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          <span>Tasks</span>
        </router-link>
      </nav>

      <!-- User Profile & Logout -->
      <div class="px-3 py-6 border-t border-gray-200 space-y-3">
        <div class="px-3 py-3 bg-gray-50 rounded-lg">
          <p class="font-semibold text-sm text-gray-900">{{ authStore.user?.name }}</p>
          <p class="text-xs text-gray-600 mt-1">{{ authStore.user?.email }}</p>
        </div>
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600 transition">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 00-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="overflow-y-auto bg-gray-50">
      <div class="px-6 py-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
