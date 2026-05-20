<!-- Root App Component -->
<template>
  <div id="app">
    <!-- Layouts only for protected routes -->
    <div v-if="showLayout" class="h-screen overflow-hidden">
      <!-- Mobile Layout (xs, sm) -->
      <MobileLayout v-if="!isTabletOrLarger" class="h-full">
        <router-view />
      </MobileLayout>

      <!-- Tablet Layout (md) -->
      <TabletLayout v-else-if="!isDesktop" class="h-full">
        <router-view />
      </TabletLayout>

      <!-- Desktop Layout (lg, xl, 2xl) -->
      <DesktopLayout v-else class="h-full">
        <router-view />
      </DesktopLayout>
    </div>

    <!-- Auth pages (no layout) -->
    <router-view v-else />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./stores/authStore.js";
import MobileLayout from "./layouts/MobileLayout.vue";
import TabletLayout from "./layouts/TabletLayout.vue";
import DesktopLayout from "./layouts/DesktopLayout.vue";

const route = useRoute();
const authStore = useAuthStore();

const isTabletOrLarger = ref(false);
const isDesktop = ref(false);

// Only show layout for protected routes
const showLayout = computed(() => {
  const publicRoutes = ["/login", "/register"];
  return !publicRoutes.includes(route.path);
});

const checkScreenSize = () => {
  isTabletOrLarger.value = window.innerWidth >= 768;
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
