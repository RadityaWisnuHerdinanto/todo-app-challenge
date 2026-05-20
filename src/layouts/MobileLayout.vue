<!-- Mobile Layout -->
<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Mobile Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40 md:hidden">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-bold text-gray-900">Todo App</h1>
          <button @click="toggleMenu" class="text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Main Content -->
    <main class="flex-1 overflow-y-auto pb-20 md:pb-0">
      <slot />
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div class="flex justify-around items-center h-16">
        <router-link to="/dashboard" class="flex flex-col items-center justify-center h-full flex-1 text-xs gap-1" active-class="text-primary">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Home</span>
        </router-link>
        <router-link to="/tasks" class="flex flex-col items-center justify-center h-full flex-1 text-xs gap-1" active-class="text-primary">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          <span>Tasks</span>
        </router-link>
        <button @click="handleLogout" class="flex flex-col items-center justify-center h-full flex-1 text-xs gap-1 text-gray-600">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 00-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
